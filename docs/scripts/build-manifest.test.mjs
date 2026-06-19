import { describe, expect, test } from 'vitest';
import { cleanProse, parseComponentDoc, stripTags } from './build-manifest.mjs';

// Unit coverage for the MDX → searchable-prose extraction behind
// public/component-search.json. The regex stripping is best-effort, so these
// pin the cases that have bitten us (multi-line imports, nested JSX) and the
// section-splitting contract.

describe('stripTags', () => {
  test('removes nested/multiline JSX innermost-first', () => {
    const out = stripTags(
      'Before <TeaserList items={[<svg><path /></svg>]} /> after'
    );

    expect(out).not.toMatch(/svg|path|TeaserList/);
    expect(out).toContain('Before');
    expect(out).toContain('after');
  });

  test('leaves prose comparisons like "value < 10" alone', () => {
    expect(stripTags('use when value < 10 and x > 5')).toBe(
      'use when value < 10 and x > 5'
    );
  });
});

describe('cleanProse', () => {
  test('strips single-line imports', () => {
    expect(cleanProse("import { Foo } from './x';\nHello.")).toBe('Hello.');
  });

  test('strips multi-line imports (regression)', () => {
    const out = cleanProse(
      "import {\n  Foo,\n  Bar,\n} from './x';\n\nReal text."
    );

    expect(out).toBe('Real text.');
    expect(out).not.toMatch(/Foo|from/);
  });

  test('keeps inline-code text but drops its angle brackets', () => {
    expect(cleanProse('The `<TextField>` is great.')).toBe(
      'The TextField is great.'
    );
  });

  test('unwraps markdown links and bold to their text', () => {
    expect(
      cleanProse('See [Validation](/foundations/validation) and **bold**.')
    ).toBe('See Validation and bold.');
  });

  test('collapses whitespace and caps at ~400 chars', () => {
    const long = 'word '.repeat(200); // 1000 chars
    const out = cleanProse(long);

    expect(out.length).toBeLessThanOrEqual(400);
    expect(out).not.toMatch(/\s{2,}/);
  });

  test('strips rule/table separators but keeps prose flags like --offline', () => {
    expect(cleanProse('Intro --- more')).toBe('Intro more');
    expect(cleanProse('| Col | --- | val |')).toBe('Col val');
    expect(cleanProse('Works offline with the --offline flag.')).toBe(
      'Works offline with the --offline flag.'
    );
  });
});

describe('parseComponentDoc', () => {
  const body = [
    '---',
    'title: TextField',
    '---',
    '',
    'The lead intro prose.',
    '',
    '## Usage',
    '',
    'Use it here.',
    '',
    '### Subsection',
    '',
    'Sub text.',
    '',
    '## Props',
    '',
    '<AutoTypeTable path="TextField" />',
    '',
  ].join('\n');

  test('captures lead prose as a synthetic Overview section', () => {
    const { sections } = parseComponentDoc(body);
    const overview = sections.find(s => s.heading === 'Overview');

    expect(overview?.snippet).toBe('The lead intro prose.');
  });

  test('splits on ## but folds ### into the section prose', () => {
    const { headings } = parseComponentDoc(body);

    // Real top-level headings only; Subsection (###) is not its own section.
    expect(headings).toEqual(['Usage', 'Props']);
  });

  test('keeps prose-less headings for scoring but drops them as sections', () => {
    const { headings, sections } = parseComponentDoc(body);

    // Props is JSX-only → no snippet → not emitted as a section…
    expect(sections.find(s => s.heading === 'Props')).toBeUndefined();
    // …but its heading is still indexed for scoring.
    expect(headings).toContain('Props');
  });

  test('excludes the synthetic Overview label from headings', () => {
    const { headings } = parseComponentDoc(body);

    expect(headings).not.toContain('Overview');
  });

  test('a ## inside a fenced code block does not open a section', () => {
    const withFence = [
      'Lead.',
      '',
      '## Usage',
      '',
      '```md',
      '## not a real heading',
      '```',
      '',
      'Text.',
    ].join('\n');

    expect(parseComponentDoc(withFence).headings).toEqual(['Usage']);
  });

  test('a ## inside a tilde-fenced code block does not open a section', () => {
    const withTildeFence = [
      'Lead.',
      '',
      '## Usage',
      '',
      '~~~md',
      '## not a real heading',
      '~~~',
      '',
      'Text.',
    ].join('\n');

    expect(parseComponentDoc(withTildeFence).headings).toEqual(['Usage']);
  });
});
