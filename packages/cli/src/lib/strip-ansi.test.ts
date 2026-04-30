import { describe, expect, it } from 'vitest';
import { sanitizeRemote, stripAnsi } from './strip-ansi.js';

describe('stripAnsi', () => {
  it('strips SGR color codes', () => {
    expect(stripAnsi('\x1b[31mred\x1b[0m')).toBe('red');
  });

  it('strips cursor-movement and screen-clear', () => {
    expect(stripAnsi('before\x1b[H\x1b[2Jafter')).toBe('beforeafter');
  });

  it('strips OSC 52 clipboard write', () => {
    expect(stripAnsi('x\x1b]52;c;aGVsbG8=\x07y')).toBe('xy');
  });

  it('strips OSC terminated by ST (ESC \\)', () => {
    expect(stripAnsi('a\x1b]0;title\x1b\\b')).toBe('ab');
  });

  it('strips DCS payloads', () => {
    expect(stripAnsi('a\x1bP1;2;3qpayload\x1b\\b')).toBe('ab');
  });

  it('strips APC / PM / SOS payloads', () => {
    expect(stripAnsi('a\x1b_anything\x1b\\b')).toBe('ab');
    expect(stripAnsi('a\x1b^anything\x1b\\b')).toBe('ab');
    expect(stripAnsi('a\x1bXanything\x1b\\b')).toBe('ab');
  });

  it('strips single-char escapes like ESC c (reset)', () => {
    expect(stripAnsi('a\x1bcb')).toBe('ab');
  });

  it('strips 8-bit CSI / OSC variants', () => {
    expect(stripAnsi('a\x9b31mb')).toBe('ab');
    expect(stripAnsi('a\x9d52;c;x\x9cb')).toBe('ab');
  });

  it('leaves plain markdown untouched', () => {
    const md = '# Heading\n\n```ts\nconst x = 1;\n```\n\n`inline` and **bold**';
    expect(stripAnsi(md)).toBe(md);
  });
});

describe('sanitizeRemote', () => {
  it('strips lone BEL', () => {
    expect(sanitizeRemote('a\x07b')).toBe('ab');
  });

  it('strips bare trailing ESC', () => {
    // ESC at EOF has no following byte for SINGLE_CHAR to match —
    // DANGEROUS_C0 cleans it up.
    expect(sanitizeRemote('hello\x1b')).toBe('hello');
  });

  it('preserves tab, newline, and carriage return', () => {
    expect(sanitizeRemote('a\tb\nc\rd')).toBe('a\tb\nc\rd');
  });

  it('strips other C0 controls', () => {
    expect(sanitizeRemote('a\x00b\x08c\x7fd')).toBe('abcd');
  });

  it('handles a combined injection attempt', () => {
    const evil = 'safe\x1b]52;c;cm0gLXJmIC8=\x07\x1b[2J\x1b[Hgone';
    expect(sanitizeRemote(evil)).toBe('safegone');
  });
});
