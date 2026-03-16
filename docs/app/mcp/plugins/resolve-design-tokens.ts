import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { MdxJsxElement } from './shared';

interface ColorTokens {
  baseColors: string[];
  colorScales: string[];
  baseSemantic: string[];
  feedbackSemantic: string[];
  stateSemantic: string[];
}

let colorCache: ColorTokens | null = null;

async function loadColorTokens(): Promise<ColorTokens> {
  if (colorCache) return colorCache;

  // Read UI files for colors and modifiers
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

  colorCache = {
    baseColors,
    colorScales,
    baseSemantic: extractModifiers('BaseSemanticTokens'),
    feedbackSemantic: extractModifiers('FeedbackSemanticTokens'),
    stateSemantic: extractModifiers('StateSemanticTokens'),
  };

  return colorCache!;
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

export function remarkResolveDesignTokens() {
  return async (tree: Node) => {
    const colors = await loadColorTokens();

    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (!parent || typeof index !== 'number') return;

        // Only handle ColorTokenTable, leave all others unchanged
        if (node.name === 'ColorTokenTable') {
          const nodes: Node[] = [];

          // Base colors
          for (const color of colors.baseColors) {
            nodes.push(
              heading(3, color.charAt(0).toUpperCase() + color.slice(1)),
              table(
                ['Name'],
                colors.colorScales.map(s => [`${color}-${s}`])
              )
            );
          }

          // Semantic colors
          nodes.push(
            heading(3, 'Base Semantic Tokens'),
            table(
              ['Name'],
              colors.baseSemantic.map(t => [t])
            ),
            heading(3, 'Feedback Semantic Tokens'),
            table(
              ['Name'],
              colors.feedbackSemantic.map(t => [t])
            ),
            heading(3, 'State Semantic Tokens'),
            table(
              ['Name'],
              colors.stateSemantic.map(t => [t])
            )
          );

          (parent.children as Node[]).splice(index, 1, ...nodes);
          return [SKIP, index];
        }
      }
    );
  };
}
