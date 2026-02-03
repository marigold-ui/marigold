import { describe, expect, it } from 'vitest';
import { makeFile } from '../test.utils';
import {
  filterAcceptedFiles,
  generateImagePreview,
  isFileDropItem,
  isImageFile,
  normalizeAndLimitFiles,
} from './fileUtils';

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

describe('isImageFile', () => {
  it('returns true for image MIME types', () => {
    expect(isImageFile(makeFile('pic.jpg', 'image/jpeg'))).toBe(true);
    expect(isImageFile(makeFile('pic.png', 'image/png'))).toBe(true);
    expect(isImageFile(makeFile('pic.gif', 'image/gif'))).toBe(true);
  });

  it('returns false for non-image MIME types', () => {
    expect(isImageFile(makeFile('doc.pdf', 'application/pdf'))).toBe(false);
    expect(isImageFile(makeFile('doc.txt', 'text/plain'))).toBe(false);
  });
});

describe('generateImagePreview', () => {
  it('returns null for non-image files', async () => {
    const pdfFile = makeFile('doc.pdf', 'application/pdf');
    const preview = await generateImagePreview(pdfFile);
    expect(preview).toBeNull();
  });

  it('generates data URL for image files', async () => {
    const imageFile = makeFile('pic.jpg', 'image/jpeg');
    const preview = await generateImagePreview(imageFile);
    expect(preview).toContain('data:');
  });
});
