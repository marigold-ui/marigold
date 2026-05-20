import { sanitizeRemote, stripAnsi } from './strip-ansi.js';

describe('stripAnsi', () => {
  test('strips SGR color codes', () => {
    expect(stripAnsi('\x1b[31mred\x1b[0m')).toBe('red');
  });

  test('strips cursor-movement and screen-clear', () => {
    expect(stripAnsi('before\x1b[H\x1b[2Jafter')).toBe('beforeafter');
  });

  test('strips OSC 52 clipboard write', () => {
    expect(stripAnsi('x\x1b]52;c;aGVsbG8=\x07y')).toBe('xy');
  });

  test('strips OSC terminated by ST (ESC \\)', () => {
    expect(stripAnsi('a\x1b]0;title\x1b\\b')).toBe('ab');
  });

  test('strips DCS payloads', () => {
    expect(stripAnsi('a\x1bP1;2;3qpayload\x1b\\b')).toBe('ab');
  });

  test('strips APC payloads', () => {
    expect(stripAnsi('a\x1b_anything\x1b\\b')).toBe('ab');
  });

  test('strips PM payloads', () => {
    expect(stripAnsi('a\x1b^anything\x1b\\b')).toBe('ab');
  });

  test('strips SOS payloads', () => {
    expect(stripAnsi('a\x1bXanything\x1b\\b')).toBe('ab');
  });

  test('strips single-char escapes like ESC c (reset)', () => {
    expect(stripAnsi('a\x1bcb')).toBe('ab');
  });

  test('strips 8-bit CSI variant', () => {
    expect(stripAnsi('a\x9b31mb')).toBe('ab');
  });

  test('strips 8-bit OSC variant', () => {
    expect(stripAnsi('a\x9d52;c;x\x9cb')).toBe('ab');
  });

  test('leaves plain markdown untouched', () => {
    const md = '# Heading\n\n```ts\nconst x = 1;\n```\n\n`inline` and **bold**';

    expect(stripAnsi(md)).toBe(md);
  });
});

describe('sanitizeRemote', () => {
  test('strips lone BEL', () => {
    expect(sanitizeRemote('a\x07b')).toBe('ab');
  });

  test('strips bare trailing ESC', () => {
    // ESC at EOF has no following byte for SINGLE_CHAR to match —
    // DANGEROUS_C0 cleans it up.
    expect(sanitizeRemote('hello\x1b')).toBe('hello');
  });

  test('preserves tab, newline, and carriage return', () => {
    expect(sanitizeRemote('a\tb\nc\rd')).toBe('a\tb\nc\rd');
  });

  test('strips other C0 controls', () => {
    expect(sanitizeRemote('a\x00b\x08c\x7fd')).toBe('abcd');
  });

  test('handles a combined injection attempt', () => {
    const evil = 'safe\x1b]52;c;cm0gLXJmIC8=\x07\x1b[2J\x1b[Hgone';

    expect(sanitizeRemote(evil)).toBe('safegone');
  });

  test('runs in linear time on adversarial input (no ReDoS)', () => {
    // Many OSC starts with no terminator: `\x1b]\x1b]…`. A lazy body would
    // backtrack quadratically; the negated character class is linear.
    const evil = '\x1b]'.repeat(200_000);

    const start = performance.now();
    const out = sanitizeRemote(evil);

    expect(performance.now() - start).toBeLessThan(500);
    expect(out).toBe('');
  });
});
