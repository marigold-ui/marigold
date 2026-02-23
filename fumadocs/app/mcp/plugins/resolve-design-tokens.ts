import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { MdxJsxElement, getJsxAttr } from './shared';

// Note: this plugin is async — only works with processor.process(), not processSync().

interface TokenData {
  textSize: Record<string, string>;
  fontWeight: Record<string, string>;
  textStyle: Record<string, string>;
  textAlign: Record<string, string | undefined>;
  paddingSpace: Record<string, string>;
  alignment: {
    horizontal: { alignmentX: Record<string, unknown> };
    vertical: { alignmentY: Record<string, unknown> };
  };
  borderRadius: Record<string, string>;
  headlineStyles: Record<string, string>;
  colors: {
    baseColors: string[];
    colorScales: string[];
    baseSemantic: string[];
    feedbackSemantic: string[];
    stateSemantic: string[];
  };
}

let tokenCache: TokenData | null = null;

async function loadAllTokens(): Promise<TokenData> {
  if (tokenCache) return tokenCache;

  const system = await import('@marigold/system');
  const theme = await import('@marigold/theme-rui');

  const headlineStyles: Record<string, string> = {};
  const headlineComponent = theme.default.components?.Headline as
    | { variants?: { size?: Record<string, unknown> } }
    | undefined;
  const variants = headlineComponent?.variants?.size;
  if (variants) {
    for (const [level, value] of Object.entries(variants)) {
      headlineStyles[level] = String(value);
    }
  }

  const colorTablePath = path.resolve(process.cwd(), 'ui/ColorTable.tsx');
  const colorTokensPath = path.resolve(process.cwd(), 'ui/ColorTokens.tsx');

  const [colorTableTsx, colorTokensTsx] = await Promise.all([
    fs.readFile(colorTablePath, 'utf-8'),
    fs.readFile(colorTokensPath, 'utf-8'),
  ]);

  const baseColors: string[] = [];
  const colorMatches = colorTokensTsx.matchAll(
    /<ColorPalettes name="([^"]+)"/g
  );
  for (const match of colorMatches) {
    baseColors.push(match[1]);
  }

  const colorPaletteStart = colorTableTsx.indexOf('export const ColorPalettes');
  let colorScales: string[] = [];

  if (colorPaletteStart !== -1) {
    const modifiersStart = colorTableTsx.indexOf(
      'modifiers={[',
      colorPaletteStart
    );
    const modifiersEnd = colorTableTsx.indexOf(']}', modifiersStart);
    if (modifiersStart !== -1 && modifiersEnd !== -1) {
      const modifiersContent = colorTableTsx.substring(
        modifiersStart + 12,
        modifiersEnd
      );
      colorScales = modifiersContent
        .split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
        .filter(Boolean);
    }
  }

  const extractModifiers = (componentName: string): string[] => {
    const regex = new RegExp(
      `export const ${componentName}[^}]+modifiers=\\{?\\[([^\\]]+)\\]`,
      's'
    );
    const m = colorTableTsx.match(regex);
    return m
      ? m[1]
          .split(',')
          .map(s => s.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      : [];
  };

  const tokenPath = path.resolve(process.cwd(), 'ui/Token.tsx');
  const tokenTsx = await fs.readFile(tokenPath, 'utf-8');

  const borderRadius: Record<string, string> = {};
  const radiusMatches = tokenTsx.matchAll(
    /(rounded-[a-z0-9]+)\s+(\d+px|9999px)/g
  );
  for (const match of radiusMatches) {
    borderRadius[match[1]] = match[2];
  }

  tokenCache = {
    textSize: system.textSize,
    fontWeight: system.fontWeight,
    textStyle: system.textStyle,
    textAlign: system.textAlign,
    paddingSpace: system.paddingSpace,
    alignment: system.alignment,
    borderRadius,
    headlineStyles,
    colors: {
      baseColors,
      colorScales,
      baseSemantic: extractModifiers('BaseSemanticTokens'),
      feedbackSemantic: extractModifiers('FeedbackSemanticTokens'),
      stateSemantic: extractModifiers('StateSemanticTokens'),
    },
  };

  return tokenCache!;
}

function table(headers: string[], rows: string[][]): Node {
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

function heading(level: number, text: string): Node {
  return {
    type: 'heading',
    depth: level,
    children: [{ type: 'text', value: text }],
  } as Node;
}

function buildGenerators(tokens: TokenData) {
  return {
    FontSizes: () => table(['Name', 'Value'], Object.entries(tokens.textSize)),
    FontWeights: () =>
      table(['Name', 'Value'], Object.entries(tokens.fontWeight)),
    FontStyle: () =>
      table(
        ['Name', 'Value'],
        Object.entries(tokens.textStyle).map(([k, v]) => [k, String(v)])
      ),
    TextAlign: () =>
      table(
        ['Name', 'Value'],
        Object.entries(tokens.textAlign).map(([k, v]) => [k, String(v)])
      ),
    Headlines: () =>
      table(['Level', 'Styles'], Object.entries(tokens.headlineStyles)),
    Spacing: () =>
      table(
        ['Name', 'Value'],
        Object.keys(tokens.paddingSpace)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map(k => [k, tokens.paddingSpace[k] ?? `${parseFloat(k) * 4}px`])
      ),
    BorderRadius: () =>
      table(['Name', 'Value'], Object.entries(tokens.borderRadius)),
    AlignmentsX: () =>
      table(
        ['Value'],
        Object.keys(tokens.alignment.horizontal.alignmentX).map(k => [k])
      ),
    AlignmentsY: () =>
      table(
        ['Value'],
        Object.keys(tokens.alignment.vertical.alignmentY).map(k => [k])
      ),
    ColorTokenTable: () => {
      const nodes: Node[] = [];
      for (const color of tokens.colors.baseColors) {
        nodes.push(
          heading(3, color.charAt(0).toUpperCase() + color.slice(1)),
          table(
            ['Name'],
            tokens.colors.colorScales.map(s => [`${color}-${s}`])
          )
        );
      }
      nodes.push(
        heading(3, 'Base Semantic Tokens'),
        table(
          ['Name'],
          tokens.colors.baseSemantic.map(t => [t])
        ),
        heading(3, 'Feedback Semantic Tokens'),
        table(
          ['Name'],
          tokens.colors.feedbackSemantic.map(t => [t])
        ),
        heading(3, 'State Semantic Tokens'),
        table(
          ['Name'],
          tokens.colors.stateSemantic.map(t => [t])
        )
      );
      return nodes;
    },
  };
}

export function remarkResolveDesignTokens() {
  return async (tree: Node) => {
    const tokens = await loadAllTokens();
    const generators = buildGenerators(tokens);

    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (!parent || typeof index !== 'number') return;

        const gen = generators[node.name as keyof typeof generators];
        if (gen) {
          const result = gen();
          (parent.children as Node[]).splice(
            index,
            1,
            ...(Array.isArray(result) ? result : [result])
          );
          return [SKIP, index];
        }

        if (node.name === 'Tabs') {
          const sections: Node[] = [];

          const itemsAttr = getJsxAttr(node, 'items');
          let tabLabels: string[] = [];
          if (itemsAttr) {
            try {
              tabLabels = JSON.parse(itemsAttr.replace(/'/g, '"'));
            } catch {
              // Fall back to numbered tabs if parsing fails (e.g. apostrophes in labels)
            }
          }

          const tabChildren = (node.children || []).filter(
            (child: Node) => (child as MdxJsxElement).name === 'Tab'
          ) as MdxJsxElement[];

          for (let i = 0; i < tabChildren.length; i++) {
            const tab = tabChildren[i];
            const label =
              tabLabels[i] || getJsxAttr(tab, 'value') || `Tab ${i + 1}`;

            sections.push(heading(4, label));

            for (const contentNode of tab.children || []) {
              const el = contentNode as MdxJsxElement;
              const gen =
                el.name && generators[el.name as keyof typeof generators];
              if (gen) {
                const res = gen();
                sections.push(...(Array.isArray(res) ? res : [res]));
              } else {
                sections.push(contentNode);
              }
            }
          }

          (parent.children as Node[]).splice(index, 1, ...sections);
          return [SKIP, index];
        }
      }
    );
  };
}
