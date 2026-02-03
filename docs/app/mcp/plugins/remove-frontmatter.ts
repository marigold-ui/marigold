import type { Node } from 'unist';

// ============================================================================
// Frontmatter Parsing
// ============================================================================

/**
 * Parses YAML frontmatter from MDX document header.
 * Extracts key-value pairs from YAML between --- delimiters.
 * Returns empty object if no frontmatter found.
 */
export function parseFrontmatter(content: string): Record<string, string> {
  const frontmatter: Record<string, string> = {};
  // Match YAML block at start of file: --- CONTENT ---
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) return frontmatter;

  // Parse each key: value line in the YAML section.
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

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

/**
 * Remark plugin that removes frontmatter and inserts frontmatter data as heading and caption.
 * Converts YAML title field to top-level H1 heading.
 * Converts YAML caption field to italic paragraph beneath title.
 */
export function remarkRemoveFrontmatter(frontmatter: Record<string, string>) {
  return (tree: Node & { children?: Node[] }) => {
    if (!tree.children || !frontmatter.title) return;

    // Insert title as H1 heading at start of document.
    tree.children.unshift({
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: frontmatter.title }],
    } as Node);

    // Insert caption as italic paragraph immediately after title if present.
    if (frontmatter.caption) {
      tree.children.splice(1, 0, {
        type: 'paragraph',
        children: [
          {
            type: 'emphasis',
            children: [{ type: 'text', value: frontmatter.caption }],
          },
        ],
      } as Node);
    }
  };
}
