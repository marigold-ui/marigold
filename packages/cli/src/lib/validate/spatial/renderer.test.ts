import { describe, expect, it } from 'vitest';
import { stripConsoleFormatTokens } from './renderer.js';

describe('stripConsoleFormatTokens', () => {
  // React reports an error-boundary catch through a console template whose
  // placeholders arrive unsubstituted, so the console text the renderer sees
  // starts with a run of literal tokens before the real error. Reporting that
  // verbatim gives an agent "Console error during render: %o" to act on.
  it('strips the unsubstituted placeholder run React leaks, keeping the message', () => {
    const text =
      '%o\n\n%s\n\n%s\n Error: kaboom\n    at Boom (http://127.0.0.1:5173/Component.tsx:5:8)';

    expect(stripConsoleFormatTokens(text)).toBe(
      'Error: kaboom\n    at Boom (http://127.0.0.1:5173/Component.tsx:5:8)'
    );
  });

  it('leaves a message that never had placeholders untouched', () => {
    const text = 'Warning: validateDOMNesting received an invalid child.';

    expect(stripConsoleFormatTokens(text)).toBe(text);
  });

  // Only a leading run is dropped. A percent token inside the body is part of
  // the user's own message and must survive verbatim.
  it('does not touch a placeholder-looking token inside the message body', () => {
    const text = 'Expected width %o but the value was 50%s of the container';

    expect(stripConsoleFormatTokens(text)).toBe(text);
  });

  it('keeps a message that is only placeholders from becoming misleading text', () => {
    expect(stripConsoleFormatTokens('%o')).toBe('');
    expect(stripConsoleFormatTokens('%o %s %d')).toBe('');
  });
});
