import type { Node, Parent } from 'unist';

// ============================================================================
// Types
// ============================================================================

export interface MdxJsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value:
    | string
    | { type: string; value: string; data?: { estree?: { body?: any[] } } };
}

export interface MdxJsxElement extends Node {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  name: string;
  attributes?: MdxJsxAttribute[];
  children?: Node[];
}

export interface TextNode extends Node {
  type: 'text';
  value: string;
}

export interface InlineCodeNode extends Node {
  type: 'inlineCode';
  value: string;
}

// ============================================================================
// JSX Attribute Helpers
// ============================================================================

/**
 * Gets a JSX attribute value. Handles both simple strings and expressions.
 */
export function getJsxAttr(
  node: MdxJsxElement,
  name: string
): string | undefined {
  const attr = node.attributes?.find(
    a => a.type === 'mdxJsxAttribute' && a.name === name
  );

  if (!attr) return undefined;

  if (typeof attr.value === 'string') {
    return attr.value;
  }

  if (attr.value && typeof attr.value === 'object') {
    // Try to get identifier from estree (for expressions like {title})
    const estree = attr.value.data?.estree;
    if (estree?.body?.[0]?.expression?.name) {
      return estree.body[0].expression.name;
    }
    if ('value' in attr.value) {
      return attr.value.value;
    }
  }

  return undefined;
}

// ============================================================================
// Text Extraction
// ============================================================================

/**
 * Extracts plain text from a node tree. Replaces newlines with spaces.
 */
export function extractText(node: Node): string {
  if (node.type === 'text') {
    return (node as TextNode).value.replace(/\n/g, ' ');
  }

  if (node.type === 'inlineCode') {
    return (node as InlineCodeNode).value;
  }

  if ('children' in node && Array.isArray((node as Parent).children)) {
    return (node as Parent).children.map(extractText).join('').trim();
  }

  return '';
}

/**
 * Flattens children, unwrapping JSX elements but keeping text/code nodes.
 */
export function flattenChildren(node: Node): Node[] {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return [node];
  }

  if ('children' in node && Array.isArray((node as Parent).children)) {
    return (node as Parent).children.flatMap(flattenChildren);
  }

  return [];
}

/**
 * Recursively finds all JSX elements with a specific name.
 */
export function findJsxElements(nodes: Node[], name: string): MdxJsxElement[] {
  const results: MdxJsxElement[] = [];

  function walk(node: Node) {
    const isJsx =
      node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
    if (isJsx && (node as MdxJsxElement).name === name) {
      results.push(node as MdxJsxElement);
    }
    if ('children' in node && Array.isArray((node as Parent).children)) {
      (node as Parent).children.forEach(walk);
    }
  }

  nodes.forEach(walk);
  return results;
}

// ============================================================================
// String Helpers
// ============================================================================

/**
 * Strips HTML tags and decodes common entities.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#x3C;/g, '<')
    .replace(/&#x3E;/g, '>')
    .trim();
}

/**
 * Escapes pipe characters for markdown tables.
 */
export function escapePipes(str: string): string {
  return str.replace(/\|/g, '\\|');
}
