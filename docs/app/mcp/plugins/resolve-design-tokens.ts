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

async function extractThemeTokens(): Promise<{
  borderRadius: Record<string, string>;
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

  const colorTokens = new Set<string>();
  const colorRegex = /--color-([a-z0-9-]+):/g;
  let match;
  while ((match = colorRegex.exec(content)) !== null) {
    colorTokens.add(match[1]);
  }

  const baseColors = new Set<string>();
  const colorScaleTokens = new Map<string, Set<number>>();
  const baseSemanticTokens = new Set<string>();
  const feedbackSemanticTokens = new Set<string>();
  const stateSemanticTokens = new Set<string>();

  for (const token of colorTokens) {
    const scaleMatch = token.match(/^([a-z]+)-(\d+)$/);
    if (scaleMatch) {
      const [, color, scale] = scaleMatch;
      baseColors.add(color);
      if (!colorScaleTokens.has(color)) {
        colorScaleTokens.set(color, new Set());
      }
      colorScaleTokens.get(color)!.add(parseInt(scale, 10));
    } else if (
      token.includes('destructive') ||
      token.includes('success') ||
      token.includes('warning') ||
      token.includes('info') ||
      token.includes('access')
    ) {
      feedbackSemanticTokens.add(token);
    } else if (
      token.includes('muted') ||
      token.includes('disabled') ||
      token.includes('placeholder') ||
      token.includes('ring') ||
      token.includes('input')
    ) {
      stateSemanticTokens.add(token);
    } else {
      baseSemanticTokens.add(token);
    }
  }

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

  const borderRadius: Record<string, string> = {};
  const radiusRegex = /--radius-([a-z0-9-]+):\s*([^;]+);/g;
  while ((match = radiusRegex.exec(content)) !== null) {
    borderRadius[`rounded-${match[1]}`] = match[2].trim();
  }

  const scales = new Set<number>();
  for (const scaleSet of colorScaleTokens.values()) {
    scaleSet.forEach(s => scales.add(s));
  }

  return {
    borderRadius,
    baseColors: Array.from(baseColors).sort(),
    colorScales: Array.from(scales)
      .sort((a, b) => a - b)
      .map(s => String(s)),
    baseSemantic: Array.from(baseSemanticTokens).sort(),
    feedbackSemantic: Array.from(feedbackSemanticTokens).sort(),
    stateSemantic: Array.from(stateSemanticTokens).sort(),
  };
}

let cachedTokens: Awaited<ReturnType<typeof extractThemeTokens>> | null = null;

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
  };
}

function createHeading(level: number, text: string): Node {
  return {
    type: 'heading',
    depth: level,
    children: [{ type: 'text', value: text }],
  };
}

function generateFontSizes(): Node {
  const rows = Object.entries(FONT_SIZES).map(([name, value]) => [name, value]);
  return createTable(['Name', 'Value'], rows);
}

function generateFontWeights(): Node {
  const rows = Object.entries(FONT_WEIGHTS).map(([name, value]) => [
    name,
    value,
  ]);
  return createTable(['Name', 'Value'], rows);
}

function generateFontStyles(): Node {
  const rows = Object.entries(FONT_STYLES).map(([name, value]) => [
    name,
    value,
  ]);
  return createTable(['Name', 'Value'], rows);
}

function generateTextAligns(): Node {
  const rows = Object.entries(TEXT_ALIGNS).map(([name, value]) => [
    name,
    value,
  ]);
  return createTable(['Name', 'Value'], rows);
}

function generateHeadlines(
  _tokens: Awaited<ReturnType<typeof extractThemeTokens>>
): Node {
  // Extract headline styles from rui theme component
  const headlineComponent = ruiTheme.components.Headline;

  if (
    !headlineComponent ||
    !headlineComponent.variants ||
    !headlineComponent.variants.size
  ) {
    throw new Error('Headline component variants not found in rui theme');
  }

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

function generateSpacing(): Node {
  // Convert spacing token names to pixel values (multiplier * 4)
  const rows = Object.keys(PADDING_SPACE)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map(key => {
      const multiplier = parseFloat(key);
      const px = Number.isNaN(multiplier) ? key : `${multiplier * 4}px`;
      return [key, px];
    });
  return createTable(['Name', 'Value'], rows);
}

function generateBorderRadius(
  tokens: Awaited<ReturnType<typeof extractThemeTokens>>
): Node {
  const rows = Object.entries(tokens.borderRadius).map(([name, value]) => [
    name,
    value,
  ]);
  return createTable(['Name', 'Value'], rows);
}

function generateAlignmentsX(): Node {
  const rows = ALIGNMENT_X.map(name => [name]);
  return createTable(['Value'], rows);
}

function generateAlignmentsY(): Node {
  const rows = ALIGNMENT_Y.map(name => [name]);
  return createTable(['Value'], rows);
}

function generateColorTokenTable(
  tokens: Awaited<ReturnType<typeof extractThemeTokens>>
): Node[] {
  const nodes: Node[] = [];

  // Base color palettes (dynamically extracted)
  for (const color of tokens.baseColors) {
    nodes.push(
      createHeading(3, color.charAt(0).toUpperCase() + color.slice(1))
    );
    const rows = tokens.colorScales.map(scale => [`${color}-${scale}`]);
    nodes.push(createTable(['Name'], rows));
  }

  // Base semantic tokens (dynamically extracted)
  nodes.push(createHeading(3, 'Base Semantic Tokens'));
  nodes.push(
    createTable(
      ['Name'],
      tokens.baseSemantic.map(t => [t])
    )
  );

  // Feedback semantic tokens (dynamically extracted)
  nodes.push(createHeading(3, 'Feedback Semantic Tokens'));
  nodes.push(
    createTable(
      ['Name'],
      tokens.feedbackSemantic.map(t => [t])
    )
  );

  // State semantic tokens (dynamically extracted)
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
// Component Map
// ============================================================================

function getComponentGenerators(
  tokens: Awaited<ReturnType<typeof extractThemeTokens>>
) {
  return {
    FontSizes: generateFontSizes,
    FontWeights: generateFontWeights,
    FontStyle: generateFontStyles,
    TextAlign: generateTextAligns,
    Headlines: () => generateHeadlines(tokens),
    Spacing: generateSpacing,
    BorderRadius: () => generateBorderRadius(tokens),
    AlignmentsX: generateAlignmentsX,
    AlignmentsY: generateAlignmentsY,
    ColorTokenTable: () => generateColorTokenTable(tokens),
  };
}

// ============================================================================
// Plugin
// ============================================================================

/**
 * Resolves design token components into static Markdown tables.
 * Dynamically extracts token data from theme CSS.
 */
export function remarkResolveDesignTokens() {
  return async (tree: Node) => {
    // Extract tokens once per build
    if (!cachedTokens) {
      cachedTokens = await extractThemeTokens();
    }

    const generators = getComponentGenerators(cachedTokens);
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (!parent || typeof index !== 'number') return;

        const name = node.name;
        const generator = generators[name as keyof typeof generators];

        if (generator) {
          const result = generator();
          if (Array.isArray(result)) {
            (parent.children as Node[]).splice(index, 1, ...result);
            return [SKIP, index];
          } else {
            (parent.children as Node[])[index] = result;
            return;
          }
        }

        // Handle Tabs component → extract content from TabPanels
        if (name === 'Tabs') {
          const extractedNodes: Node[] = [];
          const tabItems: { id: string; label: string }[] = [];
          const tabPanels: Map<string, Node[]> = new Map();

          // Recursively find Tabs.Item elements (may be nested in paragraphs)
          const findTabItems = (nodes: Node[]) => {
            for (const node of nodes) {
              const el = node as MdxJsxElement;
              if (el.name === 'Tabs.List') {
                findTabItems(el.children || []);
              } else if (el.name === 'Tabs.Item') {
                const id = getJsxAttr(el, 'id') || '';
                const label =
                  el.children?.find((c: any) => c.type === 'text')?.value || id;
                tabItems.push({ id, label: String(label).trim() });
              } else if (el.type === 'paragraph' && el.children) {
                // Tabs.Item can be inside a paragraph wrapper
                findTabItems(el.children as Node[]);
              }
            }
          };

          // Find Tabs.TabPanel and extract content
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

          // Build output: heading for each tab + content
          for (const { id, label } of tabItems) {
            extractedNodes.push(createHeading(4, label));
            const panelContent = tabPanels.get(id) || [];
            extractedNodes.push(...panelContent);
          }

          if (extractedNodes.length > 0) {
            (parent.children as Node[]).splice(index, 1, ...extractedNodes);
            return [SKIP, index];
          } else {
            (parent.children as Node[]).splice(index, 1);
            return [SKIP, index];
          }
        }
      }
    );
  };
}
