import { describe, expect, it } from 'vitest';
import {
  FILE_SIZE_FORMAT_OPTIONS,
  filterAcceptedFiles,
  formatFileSize,
  isFileDropItem,
  normalizeAndLimitFiles,
} from './fileUtils';
import { makeFile } from './makeFile';

describe('filterAcceptedFiles', () => {
  it('returns all files when accept is undefined', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];
    const result = filterAcceptedFiles(files);

    expect(result).toHaveLength(2);
    expect(result.map(f => f.name)).toEqual(['a.txt', 'b.jpg']);
  });

  it('returns all files when accept is empty', () => {
    const files = [makeFile('a.txt', 'text/plain')];
    const result = filterAcceptedFiles(files, []);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('a.txt');
  });

  it("returns all files when any token allows all (e.g. '*')", () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];

    const result = filterAcceptedFiles(files, ['*']);
    expect(result).toHaveLength(2);
  });

  it("returns all files when any token allows all (e.g. '*/*')", () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];
    const result = filterAcceptedFiles(files, ['text/plain', '*/*']);

    expect(result).toHaveLength(2);
  });

  it('matches by exact mime type', () => {
    const files = [
      makeFile('doc.pdf', 'application/pdf'),
      makeFile('pic.jpg', 'image/jpeg'),
    ];
    const result = filterAcceptedFiles(files, ['application/pdf']);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('doc.pdf');
  });

  it('matches by mime wildcard (e.g., image/*)', () => {
    const files = [
      makeFile('pic.jpg', 'image/jpeg'),
      makeFile('vector.svg', 'image/svg+xml'),
      makeFile('doc.pdf', 'application/pdf'),
    ];
    const result = filterAcceptedFiles(files, ['image/*']);

    expect(result.map(f => f.name)).toEqual(['pic.jpg', 'vector.svg']);
  });

  it('matches by extension without dot (e.g., pdf)', () => {
    const files = [
      makeFile('REPORT.PDF', 'application/pdf'),
      makeFile('readme.txt', 'text/plain'),
    ];

    const result = filterAcceptedFiles(files, ['pdf']);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('REPORT.PDF');
  });

  it('matches by extension with dot (e.g., .txt) case-insensitively', () => {
    const files = [
      makeFile('notes.txt', 'text/plain'),
      makeFile('script.TXT', 'text/plain'),
      makeFile('pic.jpg', 'image/jpeg'),
    ];
    const result = filterAcceptedFiles(files, ['.Txt']);

    expect(result.map(f => f.name)).toEqual(['notes.txt', 'script.TXT']);
  });

  it('filters out non-matching files', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];
    const result = filterAcceptedFiles(files, ['application/pdf']);

    expect(result).toHaveLength(0);
  });
});

describe('normalizeAndLimitFiles', () => {
  it('returns only first accepted when multiple is false', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('doc.pdf', 'application/pdf'),
    ];
    const result = normalizeAndLimitFiles(files, {
      accept: ['application/pdf'],
      multiple: false,
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('doc.pdf');
  });

  it('returns all accepted when multiple is true', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('doc.pdf', 'application/pdf'),
      makeFile('pic.jpg', 'image/jpeg'),
    ];
    const result = normalizeAndLimitFiles(files, {
      accept: ['.pdf', 'image/*'],
      multiple: true,
    });

    expect(result.map(f => f.name)).toEqual(['doc.pdf', 'pic.jpg']);
  });

  it('keeps first of all files when no accept is given and multiple is false', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];
    const result = normalizeAndLimitFiles(files, { multiple: false });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('a.txt');
  });
});

describe('formatFileSize', () => {
  const formatterFor = (locale: string) =>
    new Intl.NumberFormat(locale, FILE_SIZE_FORMAT_OPTIONS);

  it.each([
    [0, '0 B'],
    [340, '340 B'],
    [999, '999 B'],
    [1000, '1 kB'],
    // The regression from DSTSUP-275: a small CSV used to render "0.00 MB".
    [2400, '2.4 kB'],
    [512_000, '512 kB'],
    [2_000_000, '2 MB'],
    [1_500_000_000, '1.5 GB'],
    [3 * 1000 ** 4, '3 TB'],
    // The unit is picked before rounding, so the ladder must not print its own
    // step: 999,999 B rounds to 1,000 kB and has to become "1 MB".
    [1000 ** 2 - 1, '1 MB'],
  ])('formats %i bytes as "%s" in en-US', (size, expected) => {
    expect(formatFileSize(size, formatterFor('en-US'))).toBe(expected);
  });

  it('keeps the largest unit for sizes beyond it', () => {
    expect(formatFileSize(2 * 1000 ** 5, formatterFor('en-US'))).toBe(
      '2,000 TB'
    );
  });

  it('formats the number for the active locale', () => {
    expect(formatFileSize(2400, formatterFor('de-DE'))).toBe('2,4 kB');
  });

  it.each([[-1], [NaN], [Infinity]])(
    'falls back to "0 B" for the non-size %s',
    size => {
      expect(formatFileSize(size, formatterFor('en-US'))).toBe('0 B');
    }
  );
});

describe('isFileDropItem', () => {
  it('returns true for objects with kind="file" and getFile function', () => {
    const item = {
      kind: 'file',
      getFile: async () => makeFile('a.txt', 'text/plain'),
    };

    expect(isFileDropItem(item)).toBe(true);
  });

  it('returns false when kind is not "file"', () => {
    const item = {
      kind: 'string',
      getFile: async () => makeFile('a.txt', 'text/plain'),
    } as any;

    expect(isFileDropItem(item)).toBeFalsy();
  });

  it('returns false when getFile is not a function', () => {
    const item = { kind: 'file', getFile: 'not-a-function' } as any;

    expect(isFileDropItem(item)).toBeFalsy();
  });

  it('returns false for non-object values', () => {
    expect(isFileDropItem(null)).toBeFalsy();
    expect(isFileDropItem(undefined)).toBeFalsy();
    expect(isFileDropItem('file' as any)).toBeFalsy();
    expect(isFileDropItem(123 as any)).toBeFalsy();
  });
});
