import { describe, expect, test } from 'vitest';
import {
  getRewrittenUrl,
  isRewrite,
  unstable_doesMiddlewareMatch,
} from 'next/experimental/testing/server';
import { NextRequest } from 'next/server';
import { config, proxy } from './proxy';

// What a browser actually sends. Markdown loses on both readings of the header:
// it names no markdown media type at all, and the `*/*;q=0.8` that a
// provided-type negotiation would match one against ranks below `text/html`.
const BROWSER_ACCEPT =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';

const request = (path: string, accept?: string) =>
  new NextRequest(`https://www.marigold-ui.io${path}`, {
    headers: accept ? { accept } : {},
  });

const matches = (url: string) => unstable_doesMiddlewareMatch({ config, url });

const isRewritten = (path: string, accept?: string) =>
  isRewrite(proxy(request(path, accept)));

describe('matcher', () => {
  test.each([
    '/components/actions/button',
    '/foundations/spacing',
    '/getting-started/installation',
    '/patterns/user-input/forms',
    '/releases/blog/release-2026-06-09',
  ])('covers %s, which has generated markdown', path => {
    expect(matches(path)).toBe(true);
  });

  test.each([
    '/',
    '/examples/inventory',
    '/impressum',
    '/mcp',
    '/manifest.json',
  ])('leaves %s alone', path => {
    expect(matches(path)).toBe(false);
  });
});

describe('negotiation', () => {
  test('serves html to a browser', () => {
    expect(isRewritten('/components/actions/button', BROWSER_ACCEPT)).toBe(
      false
    );
  });

  test('serves html when the client has no preference', () => {
    // curl's default. Nothing that works today should start returning markdown.
    expect(isRewritten('/components/actions/button', '*/*')).toBe(false);
    expect(isRewritten('/components/actions/button')).toBe(false);
  });

  test('rewrites to the generated markdown when markdown is preferred', () => {
    const response = proxy(
      request('/components/actions/button', 'text/markdown')
    );

    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(
      'https://www.marigold-ui.io/components/actions/button.md'
    );
  });

  test('accepts text/plain as a markdown preference', () => {
    expect(isRewritten('/components/actions/button', 'text/plain')).toBe(true);
  });

  test('prefers markdown when it outranks html', () => {
    expect(
      isRewritten('/components/actions/button', 'text/html;q=0.5,text/markdown')
    ).toBe(true);
  });

  // The two below are what separate ranking from mere mention: a check that only
  // asked "does `Accept` name a markdown type" would serve markdown for both.
  // They pin the `markdown >= html` comparison added in fumadocs-core 16.13.0,
  // so a downgrade past it fails here instead of in production.
  test('serves html when html outranks markdown', () => {
    expect(
      isRewritten('/components/actions/button', 'text/html,text/markdown;q=0.1')
    ).toBe(false);
  });

  test('serves html when text/plain is only a fallback', () => {
    expect(
      isRewritten('/components/actions/button', 'text/html,text/plain;q=0.1')
    ).toBe(false);
  });

  // Next.js replaces `Vary` on a rendered page with its own router values, so
  // this is only assertable on the rewrite.
  test('reports that the markdown response varies by accept', () => {
    const response = proxy(
      request('/components/actions/button', 'text/markdown')
    );

    expect(response.headers.get('Vary')).toBe('Accept');
  });
});

describe('paths a rewrite would break', () => {
  test('leaves an explicit .md request alone rather than doubling it', () => {
    expect(isRewritten('/components/actions/button.md', 'text/markdown')).toBe(
      false
    );
  });

  test('leaves __internal__ alone, which has no generated markdown', () => {
    expect(
      isRewritten(
        '/components/__internal__/component-guidelines',
        'text/markdown'
      )
    ).toBe(false);
  });

  test('drops a trailing slash instead of rewriting to /.md', () => {
    const response = proxy(
      request('/components/actions/button/', 'text/markdown')
    );

    expect(getRewrittenUrl(response)).toBe(
      'https://www.marigold-ui.io/components/actions/button.md'
    );
  });

  test('keeps the query string', () => {
    const response = proxy(
      request('/components/actions/button?foo=bar', 'text/markdown')
    );

    expect(getRewrittenUrl(response)).toBe(
      'https://www.marigold-ui.io/components/actions/button.md?foo=bar'
    );
  });
});
