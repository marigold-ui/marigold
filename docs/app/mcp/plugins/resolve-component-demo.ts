import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import { MdxJsxElement, getJsxAttr } from './shared';

// ============================================================================
// Types
// ============================================================================

export interface ResolveComponentDemoOptions {
  contentDir: string;
  filePath: string;
}

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

/**
 * Remark plugin that replaces <ComponentDemo file="..." /> JSX with code blocks.
 * Loads component demo source code from filesystem and embeds it as TSX code block.
 * Falls back to error message if file cannot be read.
 */
export function remarkResolveComponentDemo(
  options: ResolveComponentDemoOptions
) {
  const { contentDir, filePath } = options;
  // Resolve file directory relative to content root for path calculations.
  const fileDir = path.dirname(path.join(contentDir, filePath));

  return (tree: Node) => {
    // Visit all mdxJsxFlowElement nodes (MDX components) in the AST.
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'ComponentDemo') return;
        if (!parent || typeof index !== 'number') return;

        // Extract file attribute pointing to demo source file.
        const demoFile = getJsxAttr(node, 'file');
        if (!demoFile) return;

        try {
          // Read demo source file from filesystem relative to current document.
          const demoPath = path.join(fileDir, demoFile);
          const source = fs.readFileSync(demoPath, 'utf-8');
          // Extract demo name from filename for code block metadata.
          const demoName = path.basename(demoFile, '.demo.tsx');

          // Replace JSX component with code block node.
          (parent.children as Node[])[index] = {
            type: 'code',
            lang: 'tsx',
            meta: `title="${demoName}"`,
            value: source.trim(),
          } as Node;
        } catch {
          // Fallback to error message paragraph if file read fails.
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [
              { type: 'text', value: `[Demo not found: ${demoFile}]` },
            ],
          } as Node;
        }
      }
    );
  };
}
