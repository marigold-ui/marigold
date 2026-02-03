import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import fs from 'node:fs/promises';
import path from 'node:path';
import ruiTheme from '@marigold/theme-rui';
import {
  parseFrontmatter,
  remarkRemoveFrontmatter,
  remarkResolveAppearanceDemo,
  remarkResolveAppearanceTable,
  remarkResolveComponentDemo,
  remarkResolveDesignTokens,
  remarkResolvePropsTable,
  remarkSimplifyJsx,
} from './plugins';

// ============================================================================
// Types
// ============================================================================

export interface ParseMdxOptions {
  filePath: string;
  contentDir: string;
  propsJsonPath: string;
}

export interface ParsedDocument {
  filePath: string;
  frontmatter: Record<string, string>;
  markdown: string;
  slug: string;
}

// ============================================================================
// Helpers
// ============================================================================

function createSlug(filePath: string): string {
  const parts = filePath.replace('.mdx', '').split('/');

  // Handle grouped pages (e.g., button/button.mdx -> button)
  if (parts.at(-1) === parts.at(-2)) {
    parts.pop();
  }

  return parts.join('/');
}

// ============================================================================
// Parser
// ============================================================================

export async function parseMdxToMarkdown(
  options: ParseMdxOptions
): Promise<ParsedDocument> {
  const { filePath, contentDir, propsJsonPath } = options;

  const absolutePath = path.join(contentDir, filePath);
  let content = await fs.readFile(absolutePath, 'utf-8');

  const frontmatter = parseFrontmatter(content);
  content = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkResolveComponentDemo, { contentDir, filePath })
    .use(remarkResolvePropsTable, {
      propsJsonPath,
      frontmatterTitle: frontmatter.title,
    })
    .use(remarkResolveAppearanceDemo)
    .use(remarkResolveAppearanceTable, {
      theme: ruiTheme,
      frontmatterTitle: frontmatter.title,
    })
    .use(remarkResolveDesignTokens)
    .use(remarkSimplifyJsx)
    .use(remarkRemoveFrontmatter, frontmatter)
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '*',
      strong: '*',
      fence: '`',
      fences: true,
      listItemIndent: 'one',
      // Minimize escaping for cleaner output
      rule: '-',
      ruleRepetition: 3,
      ruleSpaces: false,
      setext: false,
      incrementListMarker: false,
      tightDefinitions: true,
    });

  const result = await processor.process(content);

  // Clean up excessive whitespace and optimize for token efficiency
  let markdown = String(result);

  // Reduce multiple blank lines to single blank line
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // Remove trailing whitespace from lines
  markdown = markdown.replace(/[ \t]+$/gm, '');

  // Optimize tables: remove alignment padding (keeps structure, reduces tokens)
  // This converts padded tables like:
  //   | Prop     | Type      | Default |
  // to compact tables:
  //   | Prop | Type | Default |
  markdown = markdown.replace(/^(\|[^\n]+\|)$/gm, match => {
    // Split by pipes, trim each cell, rejoin
    return match
      .split('|')
      .map(cell => cell.trim())
      .join(' | ');
  });

  return {
    filePath,
    frontmatter,
    markdown,
    slug: createSlug(filePath),
  };
}

export async function getAllMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentDir: string, relativePath = '') {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        if (!entry.name.startsWith('_') && !entry.name.startsWith('.')) {
          await walk(entryPath, relPath);
        }
      } else if (entry.name.endsWith('.mdx')) {
        files.push(relPath);
      }
    }
  }

  await walk(dir);
  return files;
}

export { parseFrontmatter };
