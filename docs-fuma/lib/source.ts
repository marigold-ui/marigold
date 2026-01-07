import { type InferPageType, loader } from 'fumadocs-core/source';
import { blog, docs } from 'fumadocs-mdx:collections/server';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: '/releases/blog',
  source: blog.toFumadocsSource(),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}

/**
 * extract badges from pages for client sside use
 * called once during server-side rendering
 */
export function getBadgeMap(): Record<string, string> {
  const badgeMap: Record<string, string> = {};
  const pages = source.getPages();

  for (const page of pages) {
    if (page.data.badge) {
      badgeMap[page.url] = page.data.badge;
    }
  }

  return badgeMap;
}
