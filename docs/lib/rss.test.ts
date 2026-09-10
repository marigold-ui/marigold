import { describe, expect, it } from 'vitest';
import type { BlogPost } from './blog';
import { buildRssFeed } from './rss';

const post = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  title: 'Marigold v18.0.0',
  date: new Date('2026-08-11T00:00:00Z'),
  slug: '/releases/blog/release-2026-08-11',
  introduction: 'A very big release.',
  ...overrides,
});

describe('buildRssFeed', () => {
  it('builds a feed with one item per post', () => {
    const feed = buildRssFeed([post()]);

    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain('<title>Marigold v18.0.0</title>');
    expect(feed).toContain(
      '<link>https://www.marigold-ui.io/releases/blog/release-2026-08-11</link>'
    );
    expect(feed).toContain('<pubDate>Tue, 11 Aug 2026 00:00:00 GMT</pubDate>');
    expect(feed).toContain('<description>A very big release.</description>');
  });

  it('points guid and the self link at the canonical origin', () => {
    const feed = buildRssFeed([post()]);

    expect(feed).toContain(
      '<guid isPermaLink="true">https://www.marigold-ui.io/releases/blog/release-2026-08-11</guid>'
    );
    expect(feed).toContain('href="https://www.marigold-ui.io/rss.xml"');
  });

  it('sorts posts newest first', () => {
    const feed = buildRssFeed([
      post({ title: 'Older', date: new Date('2025-01-22T00:00:00Z') }),
      post({ title: 'Newer', date: new Date('2026-08-11T00:00:00Z') }),
    ]);

    expect(feed.indexOf('<title>Newer</title>')).toBeLessThan(
      feed.indexOf('<title>Older</title>')
    );
  });

  it('dates the feed from the newest post, not the build', () => {
    const feed = buildRssFeed([
      post({ date: new Date('2025-01-22T00:00:00Z') }),
      post({ date: new Date('2026-08-11T00:00:00Z') }),
    ]);

    expect(feed).toContain(
      '<lastBuildDate>Tue, 11 Aug 2026 00:00:00 GMT</lastBuildDate>'
    );
  });

  it('escapes XML in titles and descriptions', () => {
    const feed = buildRssFeed([
      post({
        title: 'Tabs & <Panel>',
        introduction: 'Use "quotes" & angle brackets <like this>.',
      }),
    ]);

    expect(feed).toContain('<title>Tabs &amp; &lt;Panel&gt;</title>');
    expect(feed).toContain(
      '<description>Use &quot;quotes&quot; &amp; angle brackets &lt;like this&gt;.</description>'
    );
  });

  it('reduces Markdown in a description to plain text', () => {
    const feed = buildRssFeed([
      post({
        introduction:
          'The [CLI](/getting-started/cli) ships `@marigold/cli`.\n\nSecond paragraph.',
      }),
    ]);

    expect(feed).toContain(
      '<description>The CLI ships @marigold/cli. Second paragraph.</description>'
    );
  });

  it('drops the brackets around a component name', () => {
    const feed = buildRssFeed([
      post({ introduction: 'Now with `<DateRangePicker>` and `<Dialog>`.' }),
    ]);

    expect(feed).toContain(
      '<description>Now with DateRangePicker and Dialog.</description>'
    );
  });

  it('strips emphasis markers but leaves underscores in identifiers', () => {
    const feed = buildRssFeed([
      post({
        introduction:
          "This is about what you _don't_ ship with **bundle_size**.",
      }),
    ]);

    expect(feed).toContain(
      '<description>This is about what you don&apos;t ship with bundle_size.</description>'
    );
  });

  it('omits the description when a post has no introduction', () => {
    const feed = buildRssFeed([post({ introduction: '' })]);

    expect(feed).not.toContain('<description></description>');
    expect(feed).toContain('<item>');
  });

  it('stays a valid channel with no posts', () => {
    const feed = buildRssFeed([]);

    expect(feed).toContain('<channel>');
    expect(feed).not.toContain('<item>');
    expect(feed).not.toContain('<lastBuildDate>');
  });
});
