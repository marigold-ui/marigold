// ANSI / terminal escape-sequence stripper.
//
// `picocolors` only emits SGR (`ESC [ … m`) for our own coloring, but markdown
// fetched from the docs origin is untrusted output. A malicious or compromised
// origin could embed cursor-movement, screen-clear, OSC 52 clipboard writes,
// or DCS payloads that hit the user's terminal. We strip the full ECMA-48
// set, not just SGR.

/* eslint-disable no-control-regex */

// CSI: ESC [ <params> <intermediates> <final 0x40-0x7E>
const CSI = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;

// OSC: ESC ] body (BEL | ESC \ | ST 0x9C). Body uses a negated class so each
// byte is consumed at most once — a lazy `[\s\S]*?` body would backtrack
// quadratically on adversarial input like `\x1b]\x1b]\x1b]…` (ReDoS).
// A stray ESC inside the body aborts the OSC, matching real terminal behavior.
const OSC = /\x1B\][^\x07\x1B\x9C]*(?:\x07|\x1B\\|\x9C)?/g;

// DCS / APC / PM / SOS: ESC (P|_|^|X) body (ESC \ | ST 0x9C). Linear.
const STRING_CMDS = /\x1B[P_^X][^\x1B\x9C]*(?:\x1B\\|\x9C)?/g;

// Single-char escapes: ESC followed by one byte (e.g. ESC c — full reset).
const SINGLE_CHAR = /\x1B[@-Z\\-_a-z]/g;

// 8-bit CSI (0x9B), OSC (0x9D), DCS (0x90) etc. — rare but valid.
const C1_CSI = /\x9B[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;
const C1_OSC = /\x9D[^\x07\x9C]*(?:\x07|\x9C)?/g;

// Lingering bare ESC, BEL, and other C0 controls except tab / newline / CR.
const DANGEROUS_C0 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export const stripAnsi = (s: string): string =>
  s
    .replace(OSC, '')
    .replace(STRING_CMDS, '')
    .replace(C1_OSC, '')
    .replace(CSI, '')
    .replace(C1_CSI, '')
    .replace(SINGLE_CHAR, '');

// Use on remote content before it reaches the terminal. Strips the full
// escape-sequence set plus stray C0 controls that could still drive the
// terminal (BEL, lone ESC, etc.).
export const sanitizeRemote = (s: string): string =>
  stripAnsi(s).replace(DANGEROUS_C0, '');
