import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import fs from 'node:fs/promises';
import path from 'node:path';
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

export interface ParseMdxOptions {
  filePath: string;
  contentDir: string;
}

export interface ParsedDocument {
  filePath: string;
  frontmatter: Record<string, string>;
  markdown: string;
  slug: string;
}
function createSlug(filePath: string): string {
  const parts = filePath.replace('.mdx', '').split('/');

  // Handle grouped pages (e.g., button/button.mdx -> button)
  if (parts.at(-1) === parts.at(-2)) {
    parts.pop();
  }

  return parts.join('/');
}

export async function parseMdxToMarkdown(
  options: ParseMdxOptions
): Promise<ParsedDocument> {
  const { filePath, contentDir } = options;

  const absolutePath = path.join(contentDir, filePath);
  let content = await fs.readFile(absolutePath, 'utf-8');

  const frontmatter = parseFrontmatter(content);
  content = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkResolveComponentDemo)
    .use(remarkResolvePropsTable)
    .use(remarkResolveAppearanceDemo)
    .use(remarkResolveAppearanceTable, {
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
      rule: '-',
      ruleRepetition: 3,
      ruleSpaces: false,
      setext: false,
      incrementListMarker: false,
      tightDefinitions: true,
    });

  const result = await processor.process(content);

  let markdown = String(result);

  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  markdown = markdown.replace(/[ \t]+$/gm, '');

  markdown = markdown.replace(/^(\|[^\n]+\|)$/gm, match => {
    const parts = match.split(/(?<!\\)\|/);
    return parts.map(cell => cell.trim()).join(' | ');
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
