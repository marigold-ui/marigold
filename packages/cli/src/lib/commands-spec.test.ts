import { defaultOutputFormat, defaultReportFormat } from './commands-spec.js';

describe('default --format resolvers', () => {
  test('defaultOutputFormat is markdown in a terminal and json otherwise', () => {
    expect(defaultOutputFormat(true)).toBe('markdown');
    expect(defaultOutputFormat(false)).toBe('json');
  });

  test('defaultReportFormat is text in a terminal and json otherwise', () => {
    expect(defaultReportFormat(true)).toBe('text');
    expect(defaultReportFormat(false)).toBe('json');
  });
});
