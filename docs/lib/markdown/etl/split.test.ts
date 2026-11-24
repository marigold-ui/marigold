import { describe, expect, it } from 'vitest';
import { MAX_CHARS, fit, splitTable } from './split';

const head =
  '| Prop | Type | Default | Description |\n| :--- | :--- | :--- | :--- |';
const row = (i: number) =>
  `| prop${i} | \`string\` | - | ${'A long description. '.repeat(20)} |`;
const table = (rows: number) =>
  [head, ...Array.from({ length: rows }, (_, i) => row(i))].join('\n');

describe('splitTable', () => {
  it('leaves a table within the limit as it is', () => {
    const small = table(3);
    expect(splitTable(small)).toEqual([small]);
  });

  it('leaves an oversized paragraph that is not a table to the caller', () => {
    const prose = 'word '.repeat(MAX_CHARS);
    expect(splitTable(prose)).toEqual([prose]);
  });

  it('splits an oversized table by rows and repeats the header in each piece', () => {
    const big = table(60);
    expect(big.length).toBeGreaterThan(MAX_CHARS);

    const pieces = splitTable(big);
    expect(pieces.length).toBeGreaterThan(1);
    for (const piece of pieces) {
      expect(piece.length).toBeLessThanOrEqual(MAX_CHARS);
      expect(piece.startsWith(head)).toBe(true);
    }
    // No row is lost or duplicated.
    const rows = pieces.flatMap(p => p.split('\n').slice(2));
    expect(rows).toEqual(big.split('\n').slice(2));
  });
});

describe('fit', () => {
  it('keeps every chunk of a section with an oversized props table within the limit', () => {
    const chunks = fit('Button > Props', `Intro.\n\n${table(60)}`);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.text.length).toBeLessThanOrEqual(MAX_CHARS);
    }
  });
});
