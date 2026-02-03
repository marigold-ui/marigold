import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import { MdxJsxElement, escapePipes, getJsxAttr, stripHtml } from './shared';

// ============================================================================
// Types
// ============================================================================

interface PropDefinition {
  name: string;
  type: { name: string; value: string };
  defaultValue: { value: string } | null;
  description: string;
  required: boolean;
}

type PropsJson = Record<string, Record<string, PropDefinition>>;

// ============================================================================
// Helpers
// ============================================================================

function createPropsTable(props: Record<string, PropDefinition>): string {
  const entries = Object.values(props);

  if (entries.length === 0) {
    return '*This component has no props.*';
  }

  const rows = [
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
  ];

  for (const prop of entries) {
    const name = prop.required ? `**${prop.name}** (required)` : prop.name;
    const type = `\`${escapePipes(stripHtml(prop.type.name))}\``;
    const defaultVal = prop.defaultValue
      ? `\`${escapePipes(stripHtml(prop.defaultValue.value))}\``
      : '-';
    const desc = escapePipes(prop.description).replace(/\n/g, ' ');

    rows.push(`| ${name} | ${type} | ${defaultVal} | ${desc} |`);
  }

  return rows.join('\n');
}

// ============================================================================
// Plugin
// ============================================================================

export interface ResolvePropsTableOptions {
  propsJsonPath: string;
  frontmatterTitle?: string;
}

/**
 * Replaces <PropsTable component="..." /> with markdown tables.
 */
export function remarkResolvePropsTable(options: ResolvePropsTableOptions) {
  const { propsJsonPath, frontmatterTitle } = options;

  let propsJson: PropsJson = {};
  try {
    propsJson = JSON.parse(fs.readFileSync(propsJsonPath, 'utf-8'));
  } catch {
    console.warn('[PropsTable] Could not load props.json');
  }

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'PropsTable') return;
        if (!parent || typeof index !== 'number') return;

        let componentName = getJsxAttr(node, 'component');
        if (componentName === 'title' && frontmatterTitle) {
          componentName = frontmatterTitle;
        }

        if (!componentName) return;

        const props = propsJson[componentName];
        const content = props
          ? `\n${createPropsTable(props)}`
          : `\n*Props for "${componentName}" not found.*`;

        (parent.children as Node[])[index] = { type: 'html', value: content };
      }
    );
  };
}
