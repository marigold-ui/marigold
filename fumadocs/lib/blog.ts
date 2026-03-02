import { blog } from '@/lib/source';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface BlogPost {
  title: string;
  date: Date;
  slug: string;
  introduction: string;
}

/**
 * Extracts the introduction (first two paragraphs) from a markdown file.
 * Strips frontmatter and returns the first two paragraphs of content.
 */
const extractIntroduction = (filePath: string): string => {
  try {
    // Read raw markdown file
    const rawContent = readFileSync(filePath, 'utf8');
    // Strip frontmatter by splitting on --- markers
    // Frontmatter is between the first two --- markers
    const parts = rawContent.split(/^---$/m);
    let contentWithoutFrontmatter = rawContent;
    if (parts.length >= 3) {
      // Skip first part (empty), second part (frontmatter), keep rest (content)
      contentWithoutFrontmatter = parts.slice(2).join('---').trim();
    } else {
      // Fallback: try regex approach - match from start, through frontmatter, to content
      contentWithoutFrontmatter = rawContent
        .replace(/^---[\s\S]*?---\s*\n\s*\n?/, '')
        .trim();
    }
    // Remove leading empty lines
    contentWithoutFrontmatter = contentWithoutFrontmatter.replace(
      /^\s*\n+/,
      ''
    );
    // Extract first two paragraphs (matches everything till the second line break)
    // This regex matches: any chars -> newline -> any chars -> newline
    const match = contentWithoutFrontmatter.match(
      /^([\s\S]*?\n[\s\S]*?)(?:\n|$)/
    );
    return match
      ? match[1].trim()
      : contentWithoutFrontmatter.split('\n').slice(0, 2).join('\n').trim();
  } catch (error) {
    // If file can't be read, skip introduction
    console.warn(`Could not read blog post file: ${filePath}`, error);
    return '';
  }
};

/**
 * Processes all blog posts and returns them with their introductions.
 * Posts are sorted by date (newest first).
 */
export const getAllBlogPosts = (): BlogPost[] => {
  // Get all blog posts using the blog collection loader
  const allPages = blog.getPages();

  const posts = allPages.map(page => {
    let introduction = '';

    // Get the file path from the page
    // The page.url is like '/releases/blog/release-2024-10-25'
    // We need to construct the file path: content/releases/blog/release-2024-10-25.mdx
    const fileName = page.url.split('/').pop() || '';
    const filePath = join(
      process.cwd(),
      'content/releases/blog',
      `${fileName}.mdx`
    );

    introduction = extractIntroduction(filePath);

    return {
      title: page.data.title || '',
      date:
        page.data.date instanceof Date
          ? page.data.date
          : new Date(page.data.date),
      slug: page.url,
      introduction,
    };
  });

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Gets the latest blog post (most recent by date).
 */
export const getLatestPost = (): BlogPost | null => {
  const posts = getAllBlogPosts();
  return posts.length > 0 ? posts[0] : null;
};
