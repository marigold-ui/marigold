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
 * Gets a JSX attribute value from a MDX element node.
 * Handles both simple string values and complex JavaScript expressions.
 * Returns undefined if attribute not found.
 */
export function getJsxAttr(
  node: MdxJsxElement,
  name: string
): string | undefined {
  const attr = node.attributes?.find(
    a => a.type === 'mdxJsxAttribute' && a.name === name
  );

  if (!attr) return undefined;

  // Handle simple string attribute values.
  if (typeof attr.value === 'string') {
    return attr.value;
  }

  // Handle complex expression attributes (e.g., {variableName}).
  if (attr.value && typeof attr.value === 'object') {
    // Try to extract identifier name from estree AST expression.
    const estree = attr.value.data?.estree;
    if (estree?.body?.[0]?.expression?.name) {
      return estree.body[0].expression.name;
    }
    // Fallback to direct value property if available.
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
 * Extracts plain text content from a node tree recursively.
 * Converts newlines to spaces for inline text representation.
 */
export function extractText(node: Node): string {
  if (node.type === 'text') {
    return (node as TextNode).value.replace(/\n/g, ' ');
  }

  if (node.type === 'inlineCode') {
    return (node as InlineCodeNode).value;
  }

  // Recursively extract text from parent nodes containing children.
  if ('children' in node && Array.isArray((node as Parent).children)) {
    return (node as Parent).children.map(extractText).join('').trim();
  }

  return '';
}

/**
 * Flattens node tree while unwrapping JSX container elements.
 * Preserves text and inline code nodes at terminal positions.
 */
export function flattenChildren(node: Node): Node[] {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return [node];
  }

  // Recursively flatten children from parent nodes.
  if ('children' in node && Array.isArray((node as Parent).children)) {
    return (node as Parent).children.flatMap(flattenChildren);
  }

  return [];
}

/**
 * Finds all JSX elements matching a specific component name.
 * Performs depth-first traversal of the node tree to locate matching elements.
 */
export function findJsxElements(nodes: Node[], name: string): MdxJsxElement[] {
  const results: MdxJsxElement[] = [];

  // Recursive walker function to traverse the node tree.
  function walk(node: Node) {
    const isJsx =
      node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
    // Record JSX elements that match the target name.
    if (isJsx && (node as MdxJsxElement).name === name) {
      results.push(node as MdxJsxElement);
    }
    // Continue traversal into children of parent nodes.
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
 * Strips HTML markup and decodes HTML entity references.
 * Removes all tags and converts common entity codes to their character equivalents.
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
 * Escapes pipe characters for safe inclusion in markdown table cells.
 * Markdown table format uses pipes as column delimiters, so pipes in content must be escaped.
 */
export function escapePipes(str: string): string {
  return str.replace(/\|/g, '\\|');
}
