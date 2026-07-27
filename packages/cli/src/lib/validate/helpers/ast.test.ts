import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { getJsxTagRootIdentifier, staticStringValue } from './ast.js';
import { parseSource } from './source.js';

// Grabs the tagName of the first JSX element/self-closing element in the
// file — enough to exercise `getJsxTagRootIdentifier` against a real parsed
// AST without pulling in a whole checker.
const findFirstTag = (
  source: ts.SourceFile
): ts.JsxTagNameExpression | undefined => {
  let found: ts.JsxTagNameExpression | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isJsxElement(node)) {
      found = node.openingElement.tagName;
      return;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      found = node.tagName;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
};

// Grabs the first JSX attribute named `name` anywhere in the file — enough to
// exercise `staticStringValue` against a real parsed AST without pulling in a
// whole checker.
const findAttr = (
  source: ts.SourceFile,
  name: string
): ts.JsxAttribute | undefined => {
  let found: ts.JsxAttribute | undefined;
  const visit = (node: ts.Node): void => {
    if (
      ts.isJsxAttribute(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name
    ) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
};

describe('staticStringValue', () => {
  it('reads a plain string literal attribute', () => {
    const source = parseSource(
      tmpFile(
        'ast-string-literal.tsx',
        `const C = () => <Button variant="primary" />;`
      )
    );
    expect(staticStringValue(findAttr(source, 'variant')!)).toBe('primary');
  });

  it('reads a string literal wrapped in a JSX expression', () => {
    const source = parseSource(
      tmpFile(
        'ast-string-expr.tsx',
        `const C = () => <Button variant={"primary"} />;`
      )
    );
    expect(staticStringValue(findAttr(source, 'variant')!)).toBe('primary');
  });

  it('reads a no-substitution template literal attribute', () => {
    // `variant={\`primary\`}` is definitionally a constant string — the same
    // as `variant="primary"` — so it must be treated as a static value too.
    const source = parseSource(
      tmpFile(
        'ast-template-literal.tsx',
        'const C = () => <Button variant={`primary`} />;'
      )
    );
    expect(staticStringValue(findAttr(source, 'variant')!)).toBe('primary');
  });

  it('returns undefined for a template literal with substitutions', () => {
    const source = parseSource(
      tmpFile(
        'ast-template-substitution.tsx',
        'const C = ({ v }) => <Button variant={`${v}`} />;'
      )
    );
    expect(staticStringValue(findAttr(source, 'variant')!)).toBeUndefined();
  });

  it('returns undefined for a dynamic (non-literal) expression', () => {
    const source = parseSource(
      tmpFile(
        'ast-dynamic-expr.tsx',
        `const C = ({ v }) => <Button variant={v} />;`
      )
    );
    expect(staticStringValue(findAttr(source, 'variant')!)).toBeUndefined();
  });

  it('returns undefined for a valueless attribute', () => {
    const source = parseSource(
      tmpFile('ast-boolean-attr.tsx', `const C = () => <Button disabled />;`)
    );
    expect(staticStringValue(findAttr(source, 'disabled')!)).toBeUndefined();
  });
});

describe('getJsxTagRootIdentifier', () => {
  it('returns the identifier itself for a bare tag', () => {
    const source = parseSource(
      tmpFile('ast-root-bare.tsx', `const C = () => <Button />;`)
    );
    expect(getJsxTagRootIdentifier(findFirstTag(source)!)?.text).toBe('Button');
  });

  it('returns the leftmost identifier for a dotted tag', () => {
    const source = parseSource(
      tmpFile('ast-root-dotted.tsx', `const C = () => <Dialog.Title />;`)
    );
    expect(getJsxTagRootIdentifier(findFirstTag(source)!)?.text).toBe('Dialog');
  });

  it('returns the leftmost identifier for a doubly-dotted tag', () => {
    const source = parseSource(
      tmpFile(
        'ast-root-double-dotted.tsx',
        `const C = () => <UI.Dialog.Title />;`
      )
    );
    expect(getJsxTagRootIdentifier(findFirstTag(source)!)?.text).toBe('UI');
  });
});
