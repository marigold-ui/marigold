import { describe, expect, it } from 'vitest';
import {
  FILE_SIZE_FORMAT_OPTIONS,
  formatFileSize,
  isAcceptedType,
  isFileDropItem,
  normalizeAndLimitFiles,
} from './fileUtils';
import { makeFile } from './makeFile';

describe('isAcceptedType', () => {
  it('accepts any file when accept is undefined', () => {
    expect(isAcceptedType(makeFile('a.txt', 'text/plain'))).toBe(true);
  });

  it('accepts any file when accept is empty', () => {
    expect(isAcceptedType(makeFile('a.txt', 'text/plain'), [])).toBe(true);
  });

  it("accepts any file when a token allows all (e.g. '*')", () => {
    expect(isAcceptedType(makeFile('a.txt', 'text/plain'), ['*'])).toBe(true);
  });

  it("accepts any file when a token allows all (e.g. '*/*')", () => {
    const file = makeFile('b.jpg', 'image/jpeg');

    expect(isAcceptedType(file, ['text/plain', '*/*'])).toBe(true);
  });

  it('matches by exact mime type', () => {
    const accept = ['application/pdf'];

    expect(isAcceptedType(makeFile('doc.pdf', 'application/pdf'), accept)).toBe(
      true
    );
    expect(isAcceptedType(makeFile('pic.jpg', 'image/jpeg'), accept)).toBe(
      false
    );
  });

  it('matches by mime wildcard (e.g., image/*)', () => {
    const accept = ['image/*'];

    expect(isAcceptedType(makeFile('pic.jpg', 'image/jpeg'), accept)).toBe(
      true
    );
    expect(
      isAcceptedType(makeFile('vector.svg', 'image/svg+xml'), accept)
    ).toBe(true);
    expect(isAcceptedType(makeFile('doc.pdf', 'application/pdf'), accept)).toBe(
      false
    );
  });

  it('matches by extension without dot (e.g., pdf)', () => {
    const accept = ['pdf'];

    expect(
      isAcceptedType(makeFile('REPORT.PDF', 'application/pdf'), accept)
    ).toBe(true);
    expect(isAcceptedType(makeFile('readme.txt', 'text/plain'), accept)).toBe(
      false
    );
  });

  it('matches by extension with dot (e.g., .txt) case-insensitively', () => {
    const accept = ['.Txt'];

    expect(isAcceptedType(makeFile('notes.txt', 'text/plain'), accept)).toBe(
      true
    );
    expect(isAcceptedType(makeFile('script.TXT', 'text/plain'), accept)).toBe(
      true
    );
    expect(isAcceptedType(makeFile('pic.jpg', 'image/jpeg'), accept)).toBe(
      false
    );
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

    expect(result.accepted).toHaveLength(1);
    expect(result.accepted[0].name).toBe('doc.pdf');
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

    expect(result.accepted.map(f => f.name)).toEqual(['doc.pdf', 'pic.jpg']);
  });

  it('keeps first of all files when no accept is given and multiple is false', () => {
    const files = [
      makeFile('a.txt', 'text/plain'),
      makeFile('b.jpg', 'image/jpeg'),
    ];
    const result = normalizeAndLimitFiles(files, { multiple: false });

    expect(result.accepted).toHaveLength(1);
    expect(result.accepted[0].name).toBe('a.txt');
  });

  it('reports files that do not match accept as type rejections', () => {
    const files = [
      makeFile('doc.pdf', 'application/pdf'),
      makeFile('sheet.xlsx', 'application/vnd.ms-excel'),
    ];
    const result = normalizeAndLimitFiles(files, {
      accept: ['application/pdf'],
      multiple: true,
    });

    expect(result.accepted.map(f => f.name)).toEqual(['doc.pdf']);
    expect(result.rejected).toEqual([{ file: files[1], reason: 'type' }]);
  });

  it('reports files over maxSize as size rejections', () => {
    const files = [
      makeFile('small.pdf', 'application/pdf', 100),
      makeFile('big.pdf', 'application/pdf', 5000),
    ];
    const result = normalizeAndLimitFiles(files, {
      maxSize: 1000,
      multiple: true,
    });

    expect(result.accepted.map(f => f.name)).toEqual(['small.pdf']);
    expect(result.rejected).toEqual([{ file: files[1], reason: 'size' }]);
  });

  it('accepts a file that is exactly maxSize', () => {
    const files = [makeFile('exact.pdf', 'application/pdf', 1000)];
    const result = normalizeAndLimitFiles(files, {
      maxSize: 1000,
      multiple: true,
    });

    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toEqual([]);
  });

  it('does not report files dropped by the single-file limit', () => {
    const files = [
      makeFile('a.pdf', 'application/pdf'),
      makeFile('b.pdf', 'application/pdf'),
    ];
    const result = normalizeAndLimitFiles(files, {
      accept: ['application/pdf'],
      multiple: false,
    });

    expect(result.accepted.map(f => f.name)).toEqual(['a.pdf']);
    expect(result.rejected).toEqual([]);
  });

  it('reports a wrong-type file as a type rejection even when it is also oversized', () => {
    const files = [makeFile('huge.txt', 'text/plain', 5000)];
    const result = normalizeAndLimitFiles(files, {
      accept: ['application/pdf'],
      maxSize: 1000,
      multiple: true,
    });

    expect(result.rejected).toEqual([{ file: files[0], reason: 'type' }]);
  });

  it('reports a duplicated rejection only once', () => {
    const file = makeFile('sheet.xlsx', 'application/vnd.ms-excel');
    const result = normalizeAndLimitFiles([file, file], {
      accept: ['application/pdf'],
      multiple: true,
    });

    expect(result.rejected).toEqual([{ file, reason: 'type' }]);
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
    [2400, '2.4 kB'],
    [512_000, '512 kB'],
    [2_000_000, '2 MB'],
    [1_500_000_000, '1.5 GB'],
    [3 * 1000 ** 4, '3 TB'],
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
