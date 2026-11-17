import { assertEdited, warningsOf } from '../test-helpers.js';
import { systemTextClassMaps } from './system-text-class-maps.js';

const FONT_WEIGHT = `const fontWeight = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}`;

describe('system-text-class-maps', () => {
  test('replaces the import with a local copy and keeps the other names', () => {
    const source = `import { cn, fontWeight } from '@marigold/system';

export const Title = () => <h1 className={cn(fontWeight.bold)}>Hi</h1>;
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`import { cn } from '@marigold/system';

// removed from @marigold/system in v19
${FONT_WEIGHT};

export const Title = () => <h1 className={cn(fontWeight.bold)}>Hi</h1>;
`);
    expect(result.changes).toEqual([
      expect.stringContaining('`fontWeight` is no longer exported'),
    ]);
  });

  test.each([
    [
      'two trailing specifiers',
      "import { cn, fontWeight, textSize } from '@marigold/system';",
      "import { cn } from '@marigold/system';",
    ],
    [
      'a multi-line import with a trailing comma',
      "import {\n  cn,\n  fontWeight,\n  textSize,\n} from '@marigold/system';",
      "import {\n  cn,\n} from '@marigold/system';",
    ],
  ])('drops only the maps from %s', (_, imports, kept) => {
    const source = `${imports}\n\nexport const c = cn(fontWeight.bold, textSize.xs);\n`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output.startsWith(`${kept}\n\n// removed from`)).toBe(true);
    expect(result.output).toContain('const fontWeight = {');
    expect(result.output).toContain('const textSize = {');
  });

  test('puts the copy where the import was when nothing else is imported', () => {
    const source = `import { textSize } from "@marigold/system";

export const size = (s: keyof typeof textSize) => textSize[s];
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toContain(`// removed from @marigold/system in v19
const textSize = {
  xs: "text-xs",`);
    expect(result.output).toContain(`  "2xl": "text-2xl",`);
    expect(result.output).not.toContain('import');
    expect(result.output).toContain(
      '  "9xl": "text-9xl",\n} as const;\n\nexport const size = (s: keyof typeof textSize) => textSize[s];'
    );
  });

  test('puts the copy before code that sits between imports', () => {
    const source = `import { cn, fontWeight } from '@marigold/system';
export const a = fontWeight.bold;
import { x } from './x';
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`import { cn } from '@marigold/system';

// removed from @marigold/system in v19
${FONT_WEIGHT};

export const a = fontWeight.bold;
import { x } from './x';
`);
  });

  test('keeps a blank line after the copy when the removed import was followed by code', () => {
    const source = `// Copyright
import { fontWeight } from '@marigold/system';
export const a = fontWeight.bold;
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`// Copyright
// removed from @marigold/system in v19
${FONT_WEIGHT};

export const a = fontWeight.bold;
`);
  });

  test('puts the copy before code that comes ahead of every import', () => {
    const source = `export const a = fontWeight.bold;
import { fontWeight } from '@marigold/system';
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`// removed from @marigold/system in v19
${FONT_WEIGHT};

export const a = fontWeight.bold;
`);
  });

  test('copies both maps when both are imported', () => {
    const source = `import { fontWeight, textSize } from '@marigold/system';

export const c = [fontWeight.bold, textSize.xs];
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toContain('const fontWeight = {');
    expect(result.output).toContain('const textSize = {');
    expect(result.output).toContain(
      'export const c = [fontWeight.bold, textSize.xs];'
    );
  });

  test('keeps an alias as the name of the local copy', () => {
    const source = `import { fontWeight as fw } from '@marigold/system';

export const bold = fw.bold;
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toContain('const fw = {');
    expect(result.output).toContain('export const bold = fw.bold;');
    expect(result.output).not.toContain('import');
  });

  test('keeps the literal types with `as const` in a TypeScript file', () => {
    const source = `import { fontWeight } from '@marigold/system';

export const pick = (w: string) => fontWeight[w as 'bold'];
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toContain(`${FONT_WEIGHT} as const;`);
  });

  test('leaves out `as const` when the file has no TypeScript syntax', () => {
    const source = `import { fontWeight } from '@marigold/system';

export const pick = w => fontWeight[w];
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toContain(`${FONT_WEIGHT};`);
    expect(result.output).not.toContain('as const');
  });

  // The copy has the import's name, so every use, shadowed or not, keeps
  // resolving to exactly what it resolved to before.
  test.each([
    ['a static lookup', 'export const a = fontWeight.bold;', false],
    ['a dynamic lookup', "export const a = (w: 'bold') => fontWeight[w];"],
    ['an object shorthand', 'export const maps = { fontWeight };', false],
    ['a local re-export', 'export { fontWeight };', false],
    [
      'a default value',
      'export const f = ({ w = fontWeight }) => w.bold;',
      false,
    ],
    ['a write', "fontWeight.bold = 'font-black';", false],
    [
      'a destructured prop shadow',
      'export const b = ({ fontWeight }: { fontWeight: { bold: string } }) => fontWeight.bold;',
    ],
    [
      'a constructor parameter property',
      'export class C { constructor(private fontWeight: { bold: string }) { console.log(fontWeight.bold); } }',
    ],
    [
      'a parameter name in a type',
      'type P = { onChange: (fontWeight: string) => void };\nexport const a = fontWeight.bold;',
    ],
    [
      'a switch whose case block shadows the name',
      "export function f(x: 'bold') {\n  switch (fontWeight[x]) { default: const fontWeight = 1; return fontWeight; }\n}",
    ],
  ])('leaves the code unchanged for %s', (_, code, ts = true) => {
    const source = `import { fontWeight } from '@marigold/system';

${code}
`;

    const result = systemTextClassMaps.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`// removed from @marigold/system in v19
${FONT_WEIGHT}${ts ? ' as const' : ''};

${code}
`);
  });

  test('warns about a namespace import it cannot rewrite', () => {
    const source = `import * as system from '@marigold/system';\nexport const x = system.fontWeight.bold;\n`;

    const result = systemTextClassMaps.apply(source);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([
      expect.stringContaining('`system.fontWeight`'),
    ]);
  });

  test.each([
    [
      'a computed lookup',
      "system['fontWeight'].bold",
      "`system['fontWeight']`",
    ],
    [
      'a destructuring',
      '(() => { const { fontWeight } = system; return fontWeight.bold; })()',
      '`const { fontWeight } = system`',
    ],
  ])('warns about %s on a namespace import', (_, code, usage) => {
    const source = `import * as system from '@marigold/system';\nexport const x = ${code};\n`;

    const result = systemTextClassMaps.apply(source);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([expect.stringContaining(usage)]);
  });

  test('adds `as const` in a TypeScript file that has no TypeScript syntax', () => {
    const source = `import { fontWeight } from '@marigold/system';

export const Title = () => <h1 className={fontWeight.bold}>Hi</h1>;
`;

    const result = systemTextClassMaps.apply(source, 'src/Title.tsx');

    assertEdited(result);
    expect(result.output).toContain(`${FONT_WEIGHT} as const;`);
  });

  test('leaves out `as const` in a JavaScript file', () => {
    const source = `import { fontWeight } from '@marigold/system';

export const Title = () => <h1 className={fontWeight.bold}>Hi</h1>;
`;

    const result = systemTextClassMaps.apply(source, 'src/Title.jsx');

    assertEdited(result);
    expect(result.output).not.toContain('as const');
  });

  test('warns about a re-export it cannot rewrite', () => {
    const source = `export { fontWeight } from '@marigold/system';\n`;

    const result = systemTextClassMaps.apply(source);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([
      expect.stringContaining('`weight` prop on `<Text>`'),
    ]);
  });

  test('warns about a barrel that re-exports all of @marigold/system', () => {
    const source = `export * from '@marigold/system';\n`;

    const result = systemTextClassMaps.apply(source);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([
      expect.stringContaining("`export * from '@marigold/system'`"),
    ]);
  });

  test('leaves other @marigold/system imports alone', () => {
    const source = `import { cn } from '@marigold/system';\nexport const x = cn('a');\n`;

    expect(systemTextClassMaps.apply(source).kind).toBe('unchanged');
  });

  test('ignores a fontWeight that does not come from @marigold/system', () => {
    const source = `import { fontWeight } from './tokens';\nexport const x = fontWeight.bold;\n`;

    expect(systemTextClassMaps.apply(source).kind).toBe('unchanged');
  });
});
