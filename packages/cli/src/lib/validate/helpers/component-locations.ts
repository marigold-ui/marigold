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

// Marigold emits no name-bearing attributes on its rendered DOM, so a dynamic
// finding's `component` label is often a bare tag name and the name-keyed join
// above resolves nothing. The runtime instead computes a content fingerprint
// per element via `__describeEl` (aria-label, else trimmed text, capped at 40
// chars); this builds the mirror of it from the JSX source so a finding can be
// joined by content when the name key fails. Best-effort and additive.
export const buildTextFingerprintMap = (
  filePath: string
): ComponentLocationMap => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const map: ComponentLocationMap = new Map();

  const addLoc = (fingerprint: string, startPos: number): void => {
    if (!fingerprint) return;
    const { line, character } = source.getLineAndCharacterOfPosition(startPos);
    const loc: SourceLocation = {
      file: relFile,
      line: line + 1,
      column: character + 1,
    };
    const existing = map.get(fingerprint);
    if (existing) existing.push(loc);
    else map.set(fingerprint, [loc]);
  };

  // The aria-label string-literal value, mirroring `__describeEl`'s preference
  // for aria-label over text content.
  const ariaLabelOf = (
    el: ts.JsxOpeningElement | ts.JsxSelfClosingElement
  ): string | undefined => {
    for (const attr of el.attributes.properties) {
      if (
        ts.isJsxAttribute(attr) &&
        attr.name.getText(source) === 'aria-label' &&
        attr.initializer &&
        ts.isStringLiteral(attr.initializer)
      ) {
        return attr.initializer.text.trim().replace(/\s+/g, ' ');
      }
    }
    return undefined;
  };

  // Literal JSX text of an element, trimmed and capped at 40 chars — the shape
  // `__describeEl` produces from textContent.
  //
  // KNOWN ASYMMETRY, affecting location precision only, never whether a finding
  // exists: `__describeEl` reads textContent (all descendants) while this sees
  // only direct children, so <Card><Heading>Title</Heading>Body</Card> yields
  // 'TitleBody' at runtime but 'Body' here and won't join. aria-label diverges
  // the same way (collapsed here, raw there). Both cost a location, not a line.
  const childTextOf = (el: ts.JsxElement): string => {
    let text = '';
    for (const child of el.children) {
      if (ts.isJsxText(child)) {
        text += child.text;
      } else if (
        ts.isJsxExpression(child) &&
        child.expression &&
        ts.isStringLiteral(child.expression)
      ) {
        text += child.expression.text;
      }
    }
    return text.trim().replace(/\s+/g, ' ').slice(0, 40);
  };

  const visit = (node: ts.Node): void => {
    if (ts.isJsxSelfClosingElement(node)) {
      const aria = ariaLabelOf(node);
      if (aria) addLoc(aria, node.getStart(source));
    } else if (ts.isJsxElement(node)) {
      const open = node.openingElement;
      const aria = ariaLabelOf(open);
      const start = open.getStart(source);
      if (aria) {
        addLoc(aria, start);
      } else {
        addLoc(childTextOf(node), start);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return map;
};
