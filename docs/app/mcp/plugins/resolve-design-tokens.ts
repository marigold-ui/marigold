import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  alignment,
  fontWeight,
  paddingSpace,
  textAlign,
  textSize,
  textStyle,
} from '@marigold/system';
import ruiTheme from '@marigold/theme-rui';
import { MdxJsxElement, getJsxAttr } from './shared';

const FONT_SIZES = textSize;
const FONT_WEIGHTS = fontWeight;
const FONT_STYLES = textStyle;
const TEXT_ALIGNS = textAlign;
const PADDING_SPACE = paddingSpace;
const ALIGNMENT_X = Object.keys(alignment.horizontal.alignmentX);
const ALIGNMENT_Y = Object.keys(alignment.vertical.alignmentY);

// ============================================================================
// Token Extraction
// ============================================================================

/**
 * Extracts design token values from Token.tsx (source of truth for rendered UI).
 * Parses React component code to dynamically extract border radius and breakpoint values.
 * Returns object with borderRadius and breakpoints keys mapping token names to values.
 */
async function extractTokensFromUI(): Promise<{
  borderRadius: Record<string, string>;
  breakpoints: Record<string, string>;
}> {
  const tokenTsxPath = path.resolve(__dirname, '../../../ui/Token.tsx');
  const tokenContent = await fs.readFile(tokenTsxPath, 'utf-8');

  const result = {
    borderRadius: {} as Record<string, string>,
    breakpoints: {} as Record<string, string>,
  };

  // Parse the BorderRadius component to extract all border radius values.
  // Matches the entire component function and extracts <code>rounded-* Xpx</code> patterns.
  const radiusMatch = tokenContent.match(
    /export const BorderRadius = \(\) => \([^]*?<\/Card>\s*\)/
  );
  if (radiusMatch) {
    // Extract each rounded-* variant and its corresponding pixel value.
    // Pattern matches: <code>rounded-sm 2px</code> and stores as result['rounded-sm'] = '2px'
    const codeRegex = /<code[^>]*>\s*rounded-([a-z0-9]+)\s*(\d+px)\s*<\/code>/g;
    let match;
    while ((match = codeRegex.exec(radiusMatch[0])) !== null) {
      result.borderRadius[`rounded-${match[1]}`] = match[2];
    }
  }

  // Extract breakpoint values from CSS custom properties defined in the theme.
  // References CSS variables that are resolved at runtime by the browser CSS engine.
  const breakpointKeys = ['sm', 'md', 'lg', 'xl', '2xl'];
  for (const key of breakpointKeys) {
    // Store CSS variable reference to be resolved dynamically at runtime.
    result.breakpoints[key] = `var(--breakpoint-${key})`;
  }

  return result;
}

/**
 * Extracts color token definitions from theme.css (source of truth for color system).
 * Parses CSS custom properties and categorizes tokens by type: base colors, scales,
 * and semantic variants (feedback, state, base).
 */
async function extractColorTokens(): Promise<{
  baseColors: string[];
  colorScales: string[];
  baseSemantic: string[];
  feedbackSemantic: string[];
  stateSemantic: string[];
}> {
  const themeCssPath = path.resolve(
    __dirname,
    '../../../../themes/theme-rui/src/theme.css'
  );
  const content = await fs.readFile(themeCssPath, 'utf-8');

  // Extract all color token names from CSS variable declarations (e.g., --color-red-500).
  const colorTokens = new Set<string>();
  const colorRegex = /--color-([a-z0-9-]+):/g;
  let match;
  while ((match = colorRegex.exec(content)) !== null) {
    colorTokens.add(match[1]);
  }

  // Initialize storage for categorized color tokens by semantic meaning.
  const baseColors = new Set<string>();
  const colorScaleTokens = new Map<string, Set<number>>();
  const baseSemanticTokens = new Set<string>();
  const feedbackSemanticTokens = new Set<string>();
  const stateSemanticTokens = new Set<string>();

  // Process each token to identify its category based on naming pattern and keywords.
  for (const token of colorTokens) {
    // Check if token follows base-N pattern (e.g., red-500, blue-700).
    const scaleMatch = token.match(/^([a-z]+)-(\d+)$/);
    if (scaleMatch) {
      const [, color, scale] = scaleMatch;
      baseColors.add(color);
      if (!colorScaleTokens.has(color)) {
        colorScaleTokens.set(color, new Set());
      }
      colorScaleTokens.get(color)!.add(parseInt(scale, 10));
    } else if (
      // Identify feedback semantic tokens (error, warning, success state indicators).
      token.includes('destructive') ||
      token.includes('success') ||
      token.includes('warning') ||
      token.includes('info') ||
      token.includes('access')
    ) {
      feedbackSemanticTokens.add(token);
    } else if (
      // Identify state semantic tokens (disabled, muted, placeholder UI states).
      token.includes('muted') ||
      token.includes('disabled') ||
      token.includes('placeholder') ||
      token.includes('ring') ||
      token.includes('input')
    ) {
      stateSemanticTokens.add(token);
    } else {
      // All remaining tokens are classified as base semantic colors.
      baseSemanticTokens.add(token);
    }
  }

  // Extract color references used in CSS property values to ensure all used colors are included.
  // Finds var(--color-NAME-N) patterns within CSS custom property definitions.
  const colorRefRegex = /var\(--color-([a-z]+)-(\d+)\)/g;
  while ((match = colorRefRegex.exec(content)) !== null) {
    const [, color, scale] = match;
    if (!baseColors.has(color)) {
      baseColors.add(color);
      if (!colorScaleTokens.has(color)) {
        colorScaleTokens.set(color, new Set());
      }
    }
    if (colorScaleTokens.has(color)) {
      colorScaleTokens.get(color)!.add(parseInt(scale, 10));
    }
  }

  // Collect all unique scale numbers across all color families for consistent output.
  const scales = new Set<number>();
  for (const scaleSet of colorScaleTokens.values()) {
    scaleSet.forEach(s => scales.add(s));
  }

  return {
    baseColors: Array.from(baseColors).sort(),
    colorScales: Array.from(scales)
      .sort((a, b) => a - b)
      .map(s => String(s)),
    baseSemantic: Array.from(baseSemanticTokens).sort(),
    feedbackSemantic: Array.from(feedbackSemanticTokens).sort(),
    stateSemantic: Array.from(stateSemanticTokens).sort(),
  };
}

// ============================================================================
// Markdown Table Generation
// ============================================================================

// Cache extracted tokens to avoid redundant filesystem reads during plugin execution.
let cachedTokens:
  | (Awaited<ReturnType<typeof extractTokensFromUI>> &
      Awaited<ReturnType<typeof extractColorTokens>>)
  | null = null;

/**
 * Creates a unified table node in the UNIST AST format.
 * Constructs table with headers and data rows, converting all values to text nodes.
 */
function createTable(headers: string[], rows: string[][]): Node {
  return {
    type: 'table',
    align: headers.map(() => 'left'),
    children: [
      {
        type: 'tableRow',
        children: headers.map(h => ({
          type: 'tableCell',
          children: [{ type: 'text', value: h }],
        })),
      },
      ...rows.map(row => ({
        type: 'tableRow',
        children: row.map(cell => ({
          type: 'tableCell',
          children: [{ type: 'text', value: cell }],
        })),
      })),
    ],
  } as Node;
}

/**
 * Creates a heading node in the UNIST AST format.
 * Constructs markdown heading at specified depth level (1-6).
 */
function createHeading(level: number, text: string): Node {
  return {
    type: 'heading',
    depth: level,
    children: [{ type: 'text', value: text }],
  } as Node;
}

/**
 * Generates a markdown table for font sizes from @marigold/system.
 * Maps font size names to their respective values.
 */
function generateFontSizes(): Node {
  const rows = Object.entries(FONT_SIZES).map(([name, value]) => [name, value]);
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for font weights from @marigold/system.
 * Maps font weight names to their numeric values.
 */
function generateFontWeights(): Node {
  const rows = Object.entries(FONT_WEIGHTS).map(([name, value]) => [
    name,
    String(value),
  ]);
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for font styles from @marigold/system.
 * Maps font style names to their CSS representations.
 */
function generateFontStyles(): Node {
  const rows = Object.entries(FONT_STYLES).map(([name, value]) => [
    name,
    String(value),
  ]);
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for text alignment options from @marigold/system.
 * Maps alignment names to their CSS values.
 */
function generateTextAligns(): Node {
  const rows = Object.entries(TEXT_ALIGNS).map(([name, value]) => [
    name,
    String(value),
  ]);
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for headline typography variants from rui theme.
 * Extracts component variants configuration and maps headline levels to styles.
 */
function generateHeadlines(): Node {
  // Extract headline component configuration from @marigold/theme-rui.
  const headlineComponent = ruiTheme.components.Headline;

  if (
    !headlineComponent ||
    !headlineComponent.variants ||
    !headlineComponent.variants.size
  ) {
    throw new Error('Headline component variants not found in rui theme');
  }

  // Extract size variants mapping (h1, h2, h3, etc.) to their styles.
  const headlineStyles = headlineComponent.variants.size as Record<
    string,
    string
  >;
  const rows = Object.entries(headlineStyles).map(([level, styles]) => [
    level,
    styles,
  ]);
  return createTable(['Level', 'Styles'], rows);
}

/**
 * Generates a markdown table for spacing scale from @marigold/system.
 * Converts spacing multiplier tokens to pixel values (multiplier * 4px).
 */
function generateSpacing(): Node {
  // Convert spacing token names to pixel values (multiplier * 4).
  const rows = Object.keys(PADDING_SPACE)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map(key => {
      const multiplier = parseFloat(key);
      const px = Number.isNaN(multiplier) ? key : `${multiplier * 4}px`;
      return [key, px];
    });
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for border radius values from Token.tsx.
 * Maps rounded-* class names to their pixel equivalents.
 */
function generateBorderRadius(tokens: typeof cachedTokens): Node {
  if (!tokens) throw new Error('Tokens not loaded');
  const rows = Object.entries(tokens.borderRadius).map(([name, value]) => [
    name,
    value,
  ]);
  return createTable(['Name', 'Value'], rows);
}

/**
 * Generates a markdown table for horizontal alignment options from @marigold/system.
 * Lists all available horizontal alignment values.
 */
function generateAlignmentsX(): Node {
  const rows = ALIGNMENT_X.map(name => [name]);
  return createTable(['Value'], rows);
}

/**
 * Generates a markdown table for vertical alignment options from @marigold/system.
 * Lists all available vertical alignment values.
 */
function generateAlignmentsY(): Node {
  const rows = ALIGNMENT_Y.map(name => [name]);
  return createTable(['Value'], rows);
}

/**
 * Generates markdown tables for all color token categories from theme.css.
 * Creates separate tables for base colors, scales, and semantic token variants.
 * Returns an array of heading and table nodes to be inserted into the AST.
 */
function generateColorTokenTable(tokens: typeof cachedTokens): Node[] {
  if (!tokens) throw new Error('Tokens not loaded');
  const nodes: Node[] = [];

  // Generate tables for each base color family with all scale variants.
  for (const color of tokens.baseColors) {
    nodes.push(
      createHeading(3, color.charAt(0).toUpperCase() + color.slice(1))
    );
    const rows = tokens.colorScales.map(scale => [`${color}-${scale}`]);
    nodes.push(createTable(['Name'], rows));
  }

  // Generate table for base semantic color tokens.
  nodes.push(createHeading(3, 'Base Semantic Tokens'));
  nodes.push(
    createTable(
      ['Name'],
      tokens.baseSemantic.map(t => [t])
    )
  );

  // Generate table for feedback semantic tokens (success, warning, error, etc.).
  nodes.push(createHeading(3, 'Feedback Semantic Tokens'));
  nodes.push(
    createTable(
      ['Name'],
      tokens.feedbackSemantic.map(t => [t])
    )
  );

  // Generate table for state semantic tokens (disabled, muted, placeholder, etc.).
  nodes.push(createHeading(3, 'State Semantic Tokens'));
  nodes.push(
    createTable(
      ['Name'],
      tokens.stateSemantic.map(t => [t])
    )
  );

  return nodes;
}

// ============================================================================
// Component Generator Registry
// ============================================================================

/**
 * Returns a mapping of component names to their generator functions.
 * Each generator converts a design token component to a markdown table.
 * Accesses cached tokens to ensure consistent data across all generators.
 */
function getComponentGenerators(tokens: typeof cachedTokens) {
  return {
    FontSizes: generateFontSizes,
    FontWeights: generateFontWeights,
    FontStyle: generateFontStyles,
    TextAlign: generateTextAligns,
    Headlines: generateHeadlines,
    Spacing: generateSpacing,
    BorderRadius: () => generateBorderRadius(tokens),
    AlignmentsX: generateAlignmentsX,
    AlignmentsY: generateAlignmentsY,
    ColorTokenTable: () => generateColorTokenTable(tokens),
  };
}

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

/**
 * Remark plugin that resolves design token components into static Markdown tables.
 * Dynamically extracts all token data from:
 * - /docs/ui/Token.tsx (source of truth for rendered UI values: border radius, breakpoints)
 * - @marigold/system (typography, spacing, alignment constants)
 * - /themes/theme-rui/src/theme.css (color tokens, semantic variants)
 *
 * Processes MDX JSX components and replaces them with generated tables.
 * Handles special Tabs components by extracting content from TabPanel children.
 */
export function remarkResolveDesignTokens() {
  return async (tree: Node) => {
    // Extract tokens once per build from all sources to avoid repeated filesystem I/O.
    if (!cachedTokens) {
      const uiTokens = await extractTokensFromUI();
      const colorTokens = await extractColorTokens();
      cachedTokens = { ...uiTokens, ...colorTokens };
    }

    const generators = getComponentGenerators(cachedTokens);
    // Traverse the AST and process all mdxJsxFlowElement nodes (MDX components).
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (!parent || typeof index !== 'number') return;

        const name = node.name;
        const generator = generators[name as keyof typeof generators];

        // Replace component with generated table if matching generator exists.
        if (generator) {
          const result = generator();
          if (Array.isArray(result)) {
            // Multiple nodes (e.g., ColorTokenTable returns headings + tables).
            (parent.children as Node[]).splice(index, 1, ...result);
            return [SKIP, index];
          } else {
            // Single node replacement.
            (parent.children as Node[])[index] = result;
            return;
          }
        }

        // Special handling for Tabs components to extract tab content into separate sections.
        if (name === 'Tabs') {
          const extractedNodes: Node[] = [];
          const tabItems: { id: string; label: string }[] = [];
          const tabPanels: Map<string, Node[]> = new Map();

          // Recursively find Tabs.Item elements (may be nested in paragraphs or Tabs.List).
          const findTabItems = (nodes: Node[]) => {
            for (const node of nodes) {
              if (node.type === 'paragraph') {
                // Paragraphs can contain Tabs.Item elements as children.
                const children =
                  'children' in node ? (node.children as Node[]) : [];
                findTabItems(children);
              } else {
                const el = node as MdxJsxElement;
                if (el.name === 'Tabs.List') {
                  // Traverse into Tabs.List to find Tabs.Item children.
                  findTabItems(el.children || []);
                } else if (el.name === 'Tabs.Item') {
                  // Extract id attribute and text label from Tabs.Item.
                  const id = getJsxAttr(el, 'id') || '';
                  const textNode = el.children?.find(
                    (c: any) => c.type === 'text'
                  ) as any;
                  const label = textNode?.value || id;
                  tabItems.push({ id, label: String(label).trim() });
                }
              }
            }
          };

          // Find Tabs.TabPanel elements and store their content by id.
          const findTabPanels = (children: Node[]) => {
            for (const child of children) {
              const childEl = child as MdxJsxElement;
              if (childEl.name === 'Tabs.TabPanel') {
                const id = getJsxAttr(childEl, 'id') || '';
                tabPanels.set(id, childEl.children || []);
              }
            }
          };

          findTabItems(node.children || []);
          findTabPanels(node.children || []);

          // Build output: heading for each tab + content from corresponding TabPanel.
          for (const { id, label } of tabItems) {
            extractedNodes.push(createHeading(4, label));
            const panelContent = tabPanels.get(id) || [];

            // Process any generator components inside panel content.
            for (const panelNode of panelContent) {
              const el = panelNode as MdxJsxElement;
              if (el.name && generators[el.name as keyof typeof generators]) {
                const generator =
                  generators[el.name as keyof typeof generators];
                const result = generator();
                if (Array.isArray(result)) {
                  extractedNodes.push(...result);
                } else {
                  extractedNodes.push(result);
                }
              } else {
                extractedNodes.push(panelNode);
              }
            }
          }

          if (extractedNodes.length > 0) {
            // Replace Tabs component with extracted content.
            (parent.children as Node[]).splice(index, 1, ...extractedNodes);
            return [SKIP, index];
          } else {
            // Remove empty Tabs component.
            (parent.children as Node[]).splice(index, 1);
            return [SKIP, index];
          }
        }
      }
    );
  };
}
