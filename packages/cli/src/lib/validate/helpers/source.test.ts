import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpFile } from '../test-support/tmp.js';
import { parseSource } from './source.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

describe('parseSource — SUPPORTED_EXTENSIONS check', () => {
  it('throws for .css files', () => {
    const file = tmpFile('source-test.css', 'body { color: red; }');
    expect(() => parseSource(file)).toThrow('Unsupported file type');
  });

  it('throws for .html files', () => {
    const file = tmpFile('source-test.html', '<html></html>');
    expect(() => parseSource(file)).toThrow('Unsupported file type');
  });

  it('throws for .png files', () => {
    const file = tmpFile('source-test.png', '');
    expect(() => parseSource(file)).toThrow('Unsupported file type');
  });

  it('accepts .tsx files', () => {
    const source = parseSource(fixture('valid-button.tsx'));
    expect(source).toBeDefined();
    expect(source.fileName).toContain('valid-button.tsx');
  });

  it('accepts .ts files', () => {
    const file = tmpFile(
      'source-test.ts',
      `export const greeting: string = 'hello';`
    );
    const source = parseSource(file);
    expect(source).toBeDefined();
    expect(source.fileName).toContain('source-test.ts');
  });
});
