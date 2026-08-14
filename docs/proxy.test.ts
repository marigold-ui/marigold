import { describe, expect, test } from 'vitest';
import {
  getRewrittenUrl,
  isRewrite,
  unstable_doesMiddlewareMatch,
} from 'next/experimental/testing/server';
import { NextRequest } from 'next/server';
import { config, proxy } from './proxy';

// What a browser actually sends. The `*/*;q=0.8` at the end is why a naive
// "does Accept mention markdown" check would serve Markdown to every visitor.
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
  test('covers the content areas that have generated markdown', () => {
    expect(matches('/components/actions/button')).toBe(true);
    expect(matches('/foundations/spacing')).toBe(true);
    expect(matches('/getting-started/installation')).toBe(true);
    expect(matches('/patterns/user-input/forms')).toBe(true);
    expect(matches('/releases/blog/release-2026-06-09')).toBe(true);
  });

  test('leaves the rest of the site alone', () => {
    expect(matches('/')).toBe(false);
    expect(matches('/examples/inventory')).toBe(false);
    expect(matches('/impressum')).toBe(false);
    expect(matches('/mcp')).toBe(false);
    expect(matches('/manifest.json')).toBe(false);
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
