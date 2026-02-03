import type { Node } from 'unist';

/**
 * Parses YAML frontmatter from MDX content.
 */
export function parseFrontmatter(content: string): Record<string, string> {
  const frontmatter: Record<string, string> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) return frontmatter;

  for (const line of match[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

/**
 * Adds title and caption from frontmatter as heading nodes.
 */
export function remarkRemoveFrontmatter(frontmatter: Record<string, string>) {
  return (tree: Node & { children?: Node[] }) => {
    if (!tree.children || !frontmatter.title) return;

    tree.children.unshift({
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: frontmatter.title }],
    });

    if (frontmatter.caption) {
      tree.children.splice(1, 0, {
        type: 'paragraph',
        children: [
          {
            type: 'emphasis',
            children: [{ type: 'text', value: frontmatter.caption }],
          },
        ],
      });
    }
  };
}
