import type { BlogPost } from '@/lib/blog';
import { canonicalUrl } from '@/lib/config';

const FEED_PATH = '/rss.xml';
const FEED_TITLE = 'Marigold Design System';
const FEED_DESCRIPTION = "Release notes for Marigold, Reservix' Design System.";
const BLOG_PATH = '/releases/blog';

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, char => XML_ENTITIES[char]);

// Feed readers render a description as plain text, so inline Markdown would
// show up as literal syntax.
const toPlainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Only emphasis markers, not the underscores in an identifier.
    .replace(/(?<![\w`])[*_]([^*_\n]+)[*_](?![\w`])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const buildItem = (post: BlogPost) => {
  const url = `${canonicalUrl}${post.slug}`;
  const description = toPlainText(post.introduction);

  return [
    '    <item>',
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${escapeXml(url)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
    `      <pubDate>${post.date.toUTCString()}</pubDate>`,
    ...(description
      ? [`      <description>${escapeXml(description)}</description>`]
      : []),
    '    </item>',
  ].join('\n');
};

export const buildRssFeed = (posts: BlogPost[]) => {
  const sorted = [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Derived from the newest post rather than the build time, so rebuilding
  // without new content produces a byte-identical feed.
  const lastBuildDate = sorted[0]?.date.toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${canonicalUrl}${BLOG_PATH}</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${canonicalUrl}${FEED_PATH}" rel="self" type="application/rss+xml"/>`,
    ...(lastBuildDate
      ? [`    <lastBuildDate>${lastBuildDate}</lastBuildDate>`]
      : []),
    ...sorted.map(buildItem),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
};
