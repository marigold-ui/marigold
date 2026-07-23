import { type AnyNode, parseTsx } from '../tsx-ast.js';
import { asPropertyKey, findThemeComponents } from './anchor.js';
import { classTokens, detectIndentUnit, reindent } from './engine.js';
import { v18 } from './manifests/v18.js';
import { reportDeadKeys, reportStructure } from './primitives/report.js';
import { restructureToSlots } from './primitives/restructure-to-slots.js';
import {
  addIndexExport,
  generateScaffold,
} from './primitives/scaffold-component.js';
import { stubMissingSlots } from './primitives/stub-missing-slots.js';
import { swapExactClasses } from './primitives/swap-exact-classes.js';
import { assertEdited } from './test-helpers.js';
import type { CodemodOutcome } from './types.js';

// Fixtures mirror the b2c portal theme's style: 4-space indent, single
// quotes, one ThemeComponent<'X'> per file — the acceptance target of
// DST-1543. The byte-preserving invariant ("existing class strings survive
// byte-for-byte") is asserted on the portal's own class strings.

const parse = (source: string): AnyNode =>
  parseTsx(source) as unknown as AnyNode;

const PORTAL_CARD = `import { cva, ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva({
    base: ['bg-white shadow-[0_1px_6px_rgba(0,_0,_0,_0.117647)] rounded-xs'],
    variants: {
        variant: {
            default: 'p-2',
            dynamicPadding: 'p-4 sm:px-6'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
`;

const PORTAL_SWITCH = `import { cva, ThemeComponent } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
    container: cva({
        base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground'
    }),
    track: cva({
        base: [
            'flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full',
            'group-selected/switch:bg-brand bg-input'
        ]
    }),
    thumb: cva({
        base: 'pointer-events-none block size-5 rounded-full'
    })
};
`;

describe('anchor', () => {
  test('finds ThemeComponent declarations with verified import origin', () => {
    const decls = findThemeComponents(parse(PORTAL_SWITCH));
    expect(decls.map(d => d.component)).toEqual(['Switch']);
  });

  test('ignores ThemeComponent from other packages', () => {
    const source = `import { cva, ThemeComponent } from 'other-system';
export const Switch: ThemeComponent<'Switch'> = { container: cva({}) };
`;
    expect(findThemeComponents(parse(source))).toEqual([]);
  });

  test('resolves aliased imports', () => {
    const source = `import { ThemeComponent as TC, cva } from '@marigold/system';
export const Badge: TC<'Badge'> = cva({});
`;
    expect(findThemeComponents(parse(source)).map(d => d.component)).toEqual([
      'Badge',
    ]);
  });

  test('quotes non-identifier slot names', () => {
    expect(asPropertyKey('container')).toBe('container');
    expect(asPropertyKey('bottom-left')).toBe(`'bottom-left'`);
  });
});

describe('engine', () => {
  test('detects the indentation unit of a file', () => {
    expect(detectIndentUnit(PORTAL_SWITCH)).toBe('    ');
    expect(detectIndentUnit('const a = 1;\n')).toBe('  ');
  });

  test('reindents 2-space manifest source to the target unit and base', () => {
    const out = reindent(`{\n  base: [\n    'grid',\n  ],\n}`, '    ', '  ');
    expect(out).toBe(`{\n      base: [\n          'grid',\n      ],\n  }`);
  });

  test('splits class strings into utility tokens', () => {
    expect([...classTokens(['grid gap-x-2', 'grid'])]).toEqual([
      'grid',
      'gap-x-2',
    ]);
  });
});

describe('restructure-to-slots', () => {
  test('wraps a single cva into the primary slot and stubs the rest', () => {
    const result = restructureToSlots(v18).apply(PORTAL_CARD);

    assertEdited(result);
    // the consumer's cva moved verbatim — byte-for-byte, incl. their classes
    expect(result.output).toContain(
      `'bg-white shadow-[0_1px_6px_rgba(0,_0,_0,_0.117647)] rounded-xs'`
    );
    expect(result.output).toContain('    container: cva({');
    for (const slot of [
      'header',
      'title',
      'description',
      'content',
      'footer',
      'media',
    ]) {
      expect(result.output).toContain(`    ${slot}: cva({}),`);
    }
    expect(result.changes).toHaveLength(1);
  });

  test('produces parseable output that is a slot object', () => {
    const result = restructureToSlots(v18).apply(PORTAL_CARD);

    assertEdited(result);
    const [decl] = findThemeComponents(parse(result.output));
    expect(decl.init.type).toBe('ObjectExpression');
  });

  test('leaves already-slotted components unchanged', () => {
    const result = restructureToSlots(v18).apply(PORTAL_SWITCH);
    expect(result.kind).toBe('unchanged');
  });
});

describe('stub-missing-slots', () => {
  test('adds missing slot keys as cva({}) stubs, preserving existing ones', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';

export const Input: ThemeComponent<'Input'> = {
    input: cva({ base: 'border-input' })
};
`;
    const result = stubMissingSlots(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(`input: cva({ base: 'border-input' })`);
    expect(result.output).toContain('    icon: cva({}),');
    expect(result.output).toContain('    action: cva({}),');
  });

  test('warns about slot keys the target version dropped', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
    container: cva({}),
    tag: cva({}),
    listItems: cva({}),
    closeButton: cva({}),
    showMore: cva({}),
    removeAll: cva({ base: 'text-brand' })
};
`;
    const result = stubMissingSlots(v18).apply(source);

    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings[0]
    ).toContain('slot `removeAll` no longer exists');
  });

  test('bails to a warning naming the unverifiable slots when a spread is present', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';
const shared = { icon: cva({}) };
export const Input: ThemeComponent<'Input'> = {
    ...shared,
    input: cva({})
};
`;
    const result = stubMissingSlots(v18).apply(source);

    expect(result.kind).toBe('unchanged');
    const [warning] = (result as Extract<CodemodOutcome, { kind: 'unchanged' }>)
      .warnings;
    expect(warning).toContain('not visible in this file: `icon`, `action`');
    expect(warning).toContain(
      'themes/theme-rui/src/components/Input.styles.ts'
    );
  });

  test('stays silent when a spread is present but all slots are visible', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';
const shared = { extra: cva({}) };
export const Select: ThemeComponent<'Select'> = {
    ...shared,
    select: cva({}),
    icon: cva({})
};
`;
    const result = stubMissingSlots(v18).apply(source);

    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings
    ).toEqual([]);
  });

  test('handles single-line object literals', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';
export const Select: ThemeComponent<'Select'> = { select: cva({}) };
`;
    const result = stubMissingSlots(v18).apply(source);

    assertEdited(result);
    const [decl] = findThemeComponents(parse(result.output));
    expect(decl.init.type).toBe('ObjectExpression');
    expect(result.output).toContain('icon: cva({}),');
  });

  test('leaves complete slot objects unchanged', () => {
    const result = stubMissingSlots(v18).apply(PORTAL_SWITCH);
    expect(result.kind).toBe('unchanged');
  });
});

describe('swap-exact-classes', () => {
  test('swaps a slot that matches the old baseline byte-for-byte', () => {
    const result = swapExactClasses(v18).apply(PORTAL_SWITCH);

    assertEdited(result);
    expect(result.output).toContain(`'grid gap-x-2 items-center'`);
    // reindented to the portal's 4-space style
    expect(result.output).toContain(`        base: [`);
    // the customized track/thumb slots stay byte-identical
    expect(result.output).toContain(
      `'group-selected/switch:bg-brand bg-input'`
    );
    expect(result.changes).toEqual([
      'Switch.container: swapped baseline styles to the v18 baseline',
    ]);
  });

  test('emits a token diff of removed vs added utilities', () => {
    const result = swapExactClasses(v18).apply(PORTAL_SWITCH);

    assertEdited(result);
    const tokenWarning = result.warnings.find(w => w.includes('resolve'));
    expect(tokenWarning).toContain('\n- disabled:text-disabled-foreground');
    expect(tokenWarning).toContain('\n+ ');
    expect(tokenWarning).toContain('disabled:text-disabled ');
    expect(tokenWarning).toContain('grid');
    // defaultVariants values are variant names, not classes — never listed
    expect(tokenWarning).not.toMatch(/[\s+-]default(\s|$)/);
  });

  test('warns instead of editing when the slot was customized', () => {
    const customized = PORTAL_SWITCH.replace(
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'disabled:cursor-not-allowed my-custom-class'
    );
    const result = swapExactClasses(v18).apply(customized);

    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings[0]
    ).toContain('does not match the old Marigold baseline');
  });

  test('ignores components without swap entries', () => {
    const result = swapExactClasses(v18).apply(PORTAL_CARD);
    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings
    ).toEqual([]);
  });
});

describe('scaffold-component', () => {
  test('derives file content from the slot list with load-bearing classes', () => {
    const entry = v18.scaffolds[0];
    const content = generateScaffold(entry, v18, '    ');

    expect(content).toContain(
      `export const BooleanField: ThemeComponent<'BooleanField'> = {`
    );
    expect(content).toContain(`'grid gap-x-2'`); // load-bearing layout
    expect(content).toContain(`'col-start-2'`);
    // parseable and anchored like hand-written theme files
    expect(findThemeComponents(parse(content)).map(d => d.component)).toEqual([
      'BooleanField',
    ]);
  });

  test('adds the barrel export after the last export line, idempotently', () => {
    const index = `export * from './Card.styles';\nexport * from './Switch.styles';\n`;
    const codemod = addIndexExport('BooleanField.styles');

    const first = codemod.apply(index);
    assertEdited(first);
    expect(first.output).toContain(
      `export * from './Switch.styles';\nexport * from './BooleanField.styles';`
    );

    expect(codemod.apply(first.output).kind).toBe('unchanged');
  });
});

describe('reports', () => {
  test('flags removed components as dead keys', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';
export const MultiSelect: ThemeComponent<'MultiSelect'> = cva({});
`;
    const result = reportDeadKeys(v18).apply(source);

    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings[0]
    ).toContain('removed in v18');
  });

  test('emits structure warnings for themed components with DOM changes', () => {
    const result = reportStructure(v18).apply(PORTAL_SWITCH);

    expect(result.kind).toBe('unchanged');
    expect(
      (result as Extract<CodemodOutcome, { kind: 'unchanged' }>).warnings[0]
    ).toContain('Switch DOM');
  });
});
