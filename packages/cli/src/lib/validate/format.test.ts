import { describe, expect, it } from 'vitest';
import { formatForLLM } from './format.js';
import { type ValidationReport, emptyCoverage } from './types.js';

const sampleReport = (): Omit<ValidationReport, 'text'> => ({
  file: 'src/Sample.tsx',
  errors: [
    {
      type: 'technical',
      severity: 'error',
      source: 'prop-validator',
      component: 'Button',
      message: 'Prop "isLoading" does not exist on <Button>.',
      suggestion: 'Replace "isLoading" with "loading".',
      location: { file: 'src/Sample.tsx', line: 12, column: 5 },
    },
  ],
  warnings: [
    {
      type: 'a11y',
      severity: 'warning',
      source: 'aom-extractor',
      component: 'TextField',
      message: 'Placeholder used as the only label.',
      suggestion: 'Add an explicit label prop.',
    },
  ],
  passed: ['TypeScript compilation'],
  metadata: {
    renderTimeMs: 0,
    componentsFound: ['Button', 'TextField'],
    checksRun: ['technical', 'a11y'],
    coverage: emptyCoverage(),
  },
});

describe('formatForLLM', () => {
  it('header contains the file path', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toMatch(/^marigold-validate: src\/Sample\.tsx —/);
  });

  it('summary shows error and warning counts', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('1 error(s), 1 warning(s)');
  });

  it('summary says ok when there are no issues', () => {
    const md = formatForLLM({
      file: 'src/Sample.tsx',
      errors: [],
      warnings: [],
      passed: [],
      metadata: {
        renderTimeMs: 0,
        componentsFound: [],
        checksRun: ['technical'],
        coverage: emptyCoverage(),
      },
    });
    expect(md).toMatch(/— ok$/m);
  });

  it('issue tag includes severity and type', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('[error/technical]');
    expect(md).toContain('[warning/a11y]');
  });

  it('issue line includes the component name', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('<Button>');
    expect(md).toContain('<TextField>');
  });

  it('issue line includes location when present', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('(src/Sample.tsx:12:5)');
  });

  it('issue line has no location parens when location is absent', () => {
    const md = formatForLLM(sampleReport());
    const warnLine = md.split('\n').find(l => l.includes('[warning/a11y]'));
    expect(warnLine).toBeDefined();
    expect(warnLine).not.toMatch(/\(.+:\d+:\d+\)/);
  });

  it('suggestion line starts with →', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('  → Replace "isLoading" with "loading".');
    expect(md).toContain('  → Add an explicit label prop.');
  });

  it('puts technical errors before a11y warnings', () => {
    const md = formatForLLM(sampleReport());
    const techIdx = md.indexOf('[error/technical]');
    const a11yIdx = md.indexOf('[warning/a11y]');
    expect(techIdx).toBeGreaterThan(-1);
    expect(a11yIdx).toBeGreaterThan(techIdx);
  });

  it('passed line lists all checks on one line', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toMatch(/^passed: TypeScript compilation$/m);
  });

  it('omits passed line when list is empty', () => {
    const md = formatForLLM({ ...sampleReport(), passed: [] });
    expect(md).not.toContain('passed:');
  });

  it('passed line joins multiple entries with commas', () => {
    const md = formatForLLM({
      ...sampleReport(),
      passed: ['TypeScript compilation', 'All Marigold props are valid'],
    });
    expect(md).toContain(
      'passed: TypeScript compilation, All Marigold props are valid'
    );
  });

  it('includes details on issue lines when present', () => {
    const report = sampleReport();
    report.errors[0].details = { available: ['loading'], prop: 'isLoading' };
    const md = formatForLLM(report);
    expect(md).toContain('data: {');
    expect(md).toContain('available=["loading"]');
    expect(md).toContain('prop=isLoading');
  });

  it('omits details line when details are absent', () => {
    const md = formatForLLM(sampleReport());
    expect(md).not.toContain('data: {');
  });

  it('truncates long string values in details', () => {
    const report = sampleReport();
    report.errors[0].details = { html: 'x'.repeat(100) };
    const md = formatForLLM(report);
    expect(md).toContain('...');
    expect(md).not.toContain('x'.repeat(100));
  });

  it('does not crash on an undefined detail value (e.g. an axe impact)', () => {
    const report = sampleReport();
    // JSON.stringify(undefined) is the value undefined, not a string — an
    // unguarded formatter would throw on `.length`. This mirrors an axe
    // violation with no impact rating: details: { ruleId, impact: undefined }.
    report.errors[0].details = { ruleId: 'color-contrast', impact: undefined };
    expect(() => formatForLLM(report)).not.toThrow();
    const md = formatForLLM(report);
    expect(md).toContain('ruleId=color-contrast');
    expect(md).toContain('impact=undefined');
  });

  it('does not crash on a bigint or circular detail value', () => {
    const report = sampleReport();
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    // JSON.stringify throws on both — the formatter must fall back, not crash.
    report.errors[0].details = { big: BigInt(10), cyclic };
    expect(() => formatForLLM(report)).not.toThrow();
  });

  it('does not crash on a >8-element array containing a bigint', () => {
    const report = sampleReport();
    // The array-truncation branch used to sit outside the bigint-safe
    // try/catch, so this exact shape (long array, unstringifiable element)
    // crashed the formatter.
    report.errors[0].details = { items: [1, 2, 3, 4, 5, 6, 7, 8, BigInt(9)] };
    expect(() => formatForLLM(report)).not.toThrow();
  });

  it('includes checks run line', () => {
    const md = formatForLLM(sampleReport());
    expect(md).toContain('checks run: technical, a11y');
  });

  it('includes checks run even when report has no issues', () => {
    const md = formatForLLM({
      file: 'src/Sample.tsx',
      errors: [],
      warnings: [],
      passed: [],
      metadata: {
        renderTimeMs: 0,
        componentsFound: [],
        checksRun: ['technical', 'spatial'],
        coverage: emptyCoverage(),
      },
    });
    expect(md).toContain('checks run: technical, spatial');
  });
});
