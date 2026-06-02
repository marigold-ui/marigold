import ts from 'typescript';
import path from 'node:path';
import type { SourceLocation } from '../types.js';
import { parseSource } from './source.js';

export type ComponentLocationMap = Map<string, SourceLocation[]>;

/**
 * Maps every JSX component usage in a source file to its location(s). Used to
 * join dynamic (rendered-DOM) findings back to the source the author wrote:
 * a finding on `<Tiles>` resolves to the single `<Tiles>` line; a finding on
 * `<Table>` resolves to the list of `<Table>` lines, to be narrowed by a
 * content fingerprint. Keyed by the JSX tag name — both plain (`Button`) and
 * compound (`Table.Column`).
 */
export const buildComponentLocationMap = (
  filePath: string
): ComponentLocationMap => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const map: ComponentLocationMap = new Map();

  const record = (name: string, startPos: number): void => {
    const { line, character } = source.getLineAndCharacterOfPosition(startPos);
    const loc: SourceLocation = {
      file: relFile,
      line: line + 1,
      column: character + 1,
    };
    const existing = map.get(name);
    if (existing) existing.push(loc);
    else map.set(name, [loc]);
  };

  const nameOf = (tag: ts.JsxTagNameExpression): string | undefined => {
    if (ts.isIdentifier(tag)) return tag.text;
    if (ts.isPropertyAccessExpression(tag) && ts.isIdentifier(tag.expression)) {
      return `${tag.expression.text}.${tag.name.text}`;
    }
    return undefined;
  };

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const name = nameOf(node.tagName);
      if (name) record(name, node.getStart(source));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return map;
};
