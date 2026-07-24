import { v18 } from './manifests/v18.js';
import {
  definedTokensIn,
  reportTokenDependencies,
  reportTokenUsage,
} from './primitives/tokens.js';
import type { CodemodOutcome } from './types.js';

const warningsOf = (result: CodemodOutcome): string[] =>
  result.kind === 'skipped' ? [] : result.warnings;

const NONE = new Set<string>();

describe('definedTokensIn', () => {
  test('collects --color-* definitions from CSS', () => {
    const css = `:root {
  --color-brand: #f80;
  --color-disabled-surface: oklch(0.9 0 0);
  --spacing-input: 2rem;
}
.x { color: var(--color-brand); }
`;
    expect(definedTokensIn(css)).toEqual(['brand', 'disabled-surface']);
  });
});

describe('report-token-usage', () => {
  test('flags renamed tokens in class utilities with the new name', () => {
    const source = `const styles = 'hover:bg-brand text-brand-foreground/50';`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining(
        '`bg-brand` (line 1): the `brand` token was renamed in v18 — use `bg-primary`'
      ),
      expect.stringContaining('use `text-primary-foreground`'),
    ]);
  });

  test('flags raw custom-property references', () => {
    const source = `.legacy { outline-color: var(--color-focus); }`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining(
        '`--color-focus` (line 1): the `focus` token was renamed in v18 — use `--color-focus-highlight`'
      ),
    ]);
  });

  test('names removed-without-replacement tokens as such', () => {
    const source = `const field = 'border-input';`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining(
        'the `input` token was removed in v18 without a 1:1 replacement'
      ),
    ]);
  });

  test('prefers the longest token name (status tokens over muted-foreground)', () => {
    const source = `const text = 'text-warning-muted-foreground';`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining('use `text-warning-foreground`'),
    ]);
  });

  test('does not mistake variants or new names for the old focus token', () => {
    const source = `const ok = 'focus:ring-2 bg-focus-highlight group-focus:underline';`;

    const warnings = warningsOf(
      reportTokenUsage(v18, new Set(v18.tokens.added)).apply(source)
    );

    expect(warnings).toEqual([]);
  });

  test('flags added tokens that the consumer CSS does not define', () => {
    const source = `const track = 'bg-disabled-surface';`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining(
        'the v18 token `disabled-surface` is not defined in your CSS — define `--color-disabled-surface`'
      ),
    ]);
  });

  test('stays silent for tokens the consumer defines themselves', () => {
    const source = `const styles = 'bg-brand bg-disabled-surface';`;

    const warnings = warningsOf(
      reportTokenUsage(v18, new Set(['brand', 'disabled-surface'])).apply(
        source
      )
    );

    expect(warnings).toEqual([]);
  });

  test('warns at the definition site of a repurposed token with the remap recipe', () => {
    const css = `:root {
  --color-disabled: var(--color-gray-200);
  --color-disabled-foreground: var(--color-gray-400);
}
`;

    const warnings = warningsOf(
      reportTokenUsage(v18, new Set(['disabled', 'disabled-foreground'])).apply(
        css
      )
    );

    expect(warnings).toEqual([
      expect.stringContaining(
        '`--color-disabled` (line 2): defined here, but its meaning changed in v18 — v17 used it as the disabled background'
      ),
    ]);
  });

  test('settles the definition warning once the moved-to token is defined', () => {
    const css = `:root {
  --color-disabled: var(--color-gray-400);
  --color-disabled-surface: var(--color-gray-200);
}
`;

    const warnings = warningsOf(
      reportTokenUsage(v18, new Set(['disabled', 'disabled-surface'])).apply(
        css
      )
    );

    expect(warnings).toEqual([]);
  });

  test('flags old-role usages of an undefined repurposed token', () => {
    const source = `const styles = 'bg-disabled text-disabled';`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      // `bg-` is the old role and warns; `text-` is the new role and stays
      expect.stringContaining(
        '`bg-disabled` (line 1): the `disabled` token changed meaning in v18'
      ),
    ]);
  });

  test('flags raw var() reads of an undefined repurposed token', () => {
    const css = `.banner { background: var(--color-warning); }`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(css));

    expect(warnings).toEqual([
      expect.stringContaining(
        '`--color-warning` (line 1): the `warning` token changed meaning in v18 — v17 was the solid accent (yellow-400)'
      ),
    ]);
  });

  test('groups repeated references into one warning with line numbers', () => {
    const source = `a { color: var(--color-brand); }
b { background: var(--color-brand); }
c { border-color: var(--color-brand); }
`;

    const warnings = warningsOf(reportTokenUsage(v18, NONE).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining('`--color-brand` (lines 1, 2, 3)'),
    ]);
  });
});

describe('report-token-dependencies', () => {
  test('warns when an importer uses a component that hardcodes missing tokens', () => {
    const source = `import { SelectList } from '@marigold/components';
export const App = () => <SelectList aria-label="x" />;
`;

    const warnings = warningsOf(
      reportTokenDependencies(v18, NONE).apply(source)
    );

    expect(warnings).toEqual([
      expect.stringContaining(
        'SelectList: its v18 implementation hardcodes `selected-bold`, `selected-bold-foreground`, `disabled-surface`'
      ),
    ]);
  });

  test('anchors on the import: same name from another package stays silent', () => {
    const source = `import { SelectList } from './my-components';
export const App = () => <SelectList />;
`;

    const warnings = warningsOf(
      reportTokenDependencies(v18, NONE).apply(source)
    );

    expect(warnings).toEqual([]);
  });

  test('stays silent when every hardcoded token is defined', () => {
    const source = `import { SelectList } from '@marigold/components';
export const App = () => <SelectList aria-label="x" />;
`;

    const warnings = warningsOf(
      reportTokenDependencies(v18, new Set(v18.tokens.added)).apply(source)
    );

    expect(warnings).toEqual([]);
  });
});
