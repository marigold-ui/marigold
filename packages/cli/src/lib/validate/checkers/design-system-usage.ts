import ts from 'typescript';
import path from 'node:path';
import { hasAttrPresent, isPascalCase } from '../helpers/ast.js';
import {
  buildMarigoldTagResolver,
  findSubComponentSuggestion,
  isMarigoldComponent,
  isMarigoldSubComponent,
  loadMarigoldRegistry,
} from '../helpers/components.js';
import { collectImports } from '../helpers/jsx.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

const isLowercaseTag = (tagName: string): boolean => /^[a-z]/.test(tagName);

const SVG_ELEMENTS = new Set([
  'svg',
  'path',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'ellipse',
  'g',
  'defs',
  'use',
  'symbol',
  'text',
  'tspan',
  'clipPath',
  'mask',
  'pattern',
  'linearGradient',
  'radialGradient',
  'stop',
  'filter',
  'feGaussianBlur',
  'feOffset',
  'feMerge',
  'feMergeNode',
  'foreignObject',
  'animate',
  'animateTransform',
  'marker',
  'desc',
  'title',
  'metadata',
]);

const hasSvgAncestor = (node: ts.Node): boolean => {
  let current = node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      const tag = current.openingElement.tagName;
      if (ts.isIdentifier(tag) && tag.text === 'svg') return true;
    }
    current = current.parent;
  }
  return false;
};

// Documented escape hatches: native elements with no 1:1 Marigold replacement,
// or that ARE the idiomatic accessible primitive. These are gated so we only
// exempt the semantically-correct usage and keep warning on the lazy case:
//   form — no Marigold form-wrapper equivalent; always exempt.
//   br   — no component; always exempt.
//   label — exempt only with `htmlFor` (the accessible label primitive); a bare
//           <label> without htmlFor is still warned.
//   a    — exempt only with `href` (a real link); a hrefless <a> is non-semantic
//           and should prefer Marigold's <Link>, so it is still warned.
const isExemptHtmlElement = (
  tagName: string,
  attrs: ts.JsxAttributes
): boolean => {
  if (tagName === 'form' || tagName === 'br') return true;
  if (tagName === 'label') return hasAttrPresent(attrs, 'htmlFor');
  if (tagName === 'a') return hasAttrPresent(attrs, 'href');
  return false;
};

const isHtmlElement = (
  tagName: string,
  node: ts.JsxOpeningElement | ts.JsxSelfClosingElement
): boolean => {
  if (!isLowercaseTag(tagName)) return false;
  if (tagName === 'img' || SVG_ELEMENTS.has(tagName)) return false;
  if (hasSvgAncestor(node)) return false;
  if (isExemptHtmlElement(tagName, node.attributes)) return false;
  return true;
};

const HTML_ROLE: Record<string, string> = {
  div: 'layout',
  section: 'layout',
  main: 'layout',
  header: 'layout',
  aside: 'layout',
  footer: 'layout',
  span: 'content',
  p: 'content',
  h1: 'content',
  h2: 'content',
  h3: 'content',
  h4: 'content',
  h5: 'content',
  h6: 'content',
  hr: 'content',
  a: 'navigation',
  nav: 'navigation',
  input: 'form',
  textarea: 'form',
  select: 'form',
  label: 'form',
  fieldset: 'form',
  table: 'collection',
  ul: 'collection',
  ol: 'collection',
  li: 'collection',
  button: 'action',
};

const suggestForHtmlTag = (tagName: string): string => {
  const pascal = tagName[0].toUpperCase() + tagName.slice(1);
  if (isMarigoldComponent(pascal)) {
    return `Use <${pascal}> from @marigold/components instead of <${tagName}>.`;
  }
  const registry = loadMarigoldRegistry();
  for (const name of registry.keys()) {
    if (name.toLowerCase() === tagName.toLowerCase()) {
      return `Use <${name}> from @marigold/components instead of <${tagName}>.`;
    }
  }
  const role = HTML_ROLE[tagName];
  if (role === 'collection') {
    return `Raw <${tagName}> used instead of a Marigold collection component (List, Table, SelectList, …). A Marigold collection provides keyboard navigation, selection and empty-state handling that <${tagName}> lacks.`;
  }
  if (role) {
    return `Raw <${tagName}> used instead of a Marigold ${role} component. Search the Marigold docs for ${role} alternatives.`;
  }
  return `Replace <${tagName}> with the appropriate Marigold component. Search the Marigold docs for alternatives.`;
};

const buildImportMap = (source: ts.SourceFile): Map<string, string> => {
  const map = new Map<string, string>();
  for (const decl of collectImports(source)) {
    for (const name of decl.names) {
      map.set(name, decl.module);
    }
  }
  return map;
};

/**
 * Collect the set of locally declared PascalCase identifiers
 * (function declarations, arrow-function consts, class declarations).
 */
const collectLocalDeclarations = (source: ts.SourceFile): Set<string> => {
  const locals = new Set<string>();

  const walk = (node: ts.Node): void => {
    // function MyComponent() { ... }
    if (ts.isFunctionDeclaration(node) && node.name) {
      locals.add(node.name.text);
    }

    // class MyComponent { ... }
    if (ts.isClassDeclaration(node) && node.name) {
      locals.add(node.name.text);
    }

    // const MyComponent = ...
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          locals.add(decl.name.text);
        }
      }
    }

    ts.forEachChild(node, walk);
  };

  for (const statement of source.statements) {
    walk(statement);
  }

  return locals;
};

const suggestAlternatives = (tagName: string): string => {
  const subMatch = findSubComponentSuggestion(tagName);
  if (subMatch) {
    return `Use ${subMatch.map(a => `<${a}>`).join(' or ')} — compound sub-components use dot notation.`;
  }

  return `<${tagName}> does not exist in @marigold/components. Search the Marigold docs for the correct component.`;
};

export const validateDesignSystemUsage = (
  filePath: string
): ValidationIssue[] => {
  const source = parseSource(filePath);

  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const importMap = buildImportMap(source);
  const localDeclarations = collectLocalDeclarations(source);
  // Resolves a tag *as written* (including an alias, `{ Button as Btn }`) to
  // its real @marigold/components export name. Built from the import
  // statements directly, so — unlike a bare `isMarigoldComponent(name)`
  // lookup — it correctly recognizes an aliased Marigold import as real, and
  // correctly rejects a local/third-party tag that merely shares a Marigold
  // name.
  const resolver = buildMarigoldTagResolver(source);

  // A tag is a *real* Marigold component only if it resolves through an
  // actual `@marigold/components` import — not shadowed by a local
  // declaration and not imported from a non-Marigold module, and correctly
  // recognized even when imported under an alias.
  const isRealMarigoldComponent = (name: string): boolean =>
    resolver.get(name) !== undefined;

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;

      // Is this element a real Marigold component or sub-component? Used by the
      // className check below: Tailwind className is allowed on native tags but
      // not on Marigold components, which expose their own styling props.
      let isMarigoldTag = false;
      if (ts.isIdentifier(tag)) {
        isMarigoldTag = isRealMarigoldComponent(tag.text);
      } else if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        const originalParent = resolver.get(tag.expression.text);
        isMarigoldTag =
          originalParent !== undefined &&
          isMarigoldSubComponent(originalParent, tag.name.text);
      }

      if (ts.isIdentifier(tag)) {
        const tagName = tag.text;

        if (isHtmlElement(tagName, node)) {
          const { line, character } = source.getLineAndCharacterOfPosition(
            node.getStart(source)
          );

          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'design-system-usage',
            component: tagName,
            message: `Raw <${tagName}> used instead of a Marigold component.`,
            suggestion: suggestForHtmlTag(tagName),
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: { htmlElement: tagName },
          });
        } else if (isPascalCase(tagName)) {
          // Check for hallucinated Marigold components. Resolved through the
          // import-aware resolver (not a bare `isMarigoldComponent(tagName)`
          // lookup) so an aliased import (`{ Button as Btn }`) is recognized
          // as real — a bare-name lookup would find no registry entry for
          // "Btn" and fall through to the hallucinated-component error below.
          if (resolver.get(tagName) !== undefined) {
            // Valid Marigold component (possibly aliased) — skip
          } else if (localDeclarations.has(tagName)) {
            // Locally declared component — skip
          } else {
            const importedFrom = importMap.get(tagName);

            if (importedFrom === '@marigold/components') {
              // Imported from @marigold/components but not a real export of it —
              // a hallucinated/typo'd component. Other @marigold/* packages
              // (@marigold/icons, @marigold/system, …) export legitimate
              // components, so an import from them is NOT flagged here.
              const { line, character } = source.getLineAndCharacterOfPosition(
                node.getStart(source)
              );
              issues.push({
                type: 'technical',
                severity: 'error',
                source: 'design-system-usage',
                component: tagName,
                message: `<${tagName}> is not a Marigold component. It is not exported from @marigold/components.`,
                suggestion: suggestAlternatives(tagName),
                location: {
                  file: relFile,
                  line: line + 1,
                  column: character + 1,
                },
                details: { hallucinated: true, importedFrom },
              });
            } else if (importedFrom) {
              // Imported from a non-Marigold module (third-party or local) — skip
            } else {
              // Not imported, not declared locally — undeclared hallucinated component
              const { line, character } = source.getLineAndCharacterOfPosition(
                node.getStart(source)
              );
              issues.push({
                type: 'technical',
                severity: 'error',
                source: 'design-system-usage',
                component: tagName,
                message: `<${tagName}> is not a Marigold component. It is not exported from @marigold/components.`,
                suggestion: suggestAlternatives(tagName),
                location: {
                  file: relFile,
                  line: line + 1,
                  column: character + 1,
                },
                details: { hallucinated: true },
              });
            }
          }
        }
      }

      // Check for hallucinated sub-components (e.g. Table.Footer when only Table.Header exists)
      if (ts.isPropertyAccessExpression(tag)) {
        const parentName = tag.expression.getText(source);
        const subName = tag.name.text;

        // Resolve through the import-aware resolver (not the name-only
        // isMarigoldComponent/isRealMarigoldComponent) so a locally declared
        // or non-Marigold-imported `Table` sharing a Marigold name cannot
        // raise a false-positive hallucinated-sub-component ERROR — symmetric
        // with the hallucinated-component branch above — and so an aliased
        // parent (`{ Select as S }`, `<S.Option>`) is checked against its
        // real sub-component list instead of a registry lookup on "S".
        const originalParent = resolver.get(parentName);
        if (isPascalCase(parentName) && originalParent !== undefined) {
          if (!isMarigoldSubComponent(originalParent, subName)) {
            const { line, character } = source.getLineAndCharacterOfPosition(
              node.getStart(source)
            );
            issues.push({
              type: 'technical',
              severity: 'error',
              source: 'design-system-usage',
              component: `${parentName}.${subName}`,
              message: `<${parentName}.${subName}> is not a valid sub-component of <${parentName}>.`,
              suggestion: `Check the Marigold docs for valid ${parentName} sub-components.`,
              location: {
                file: relFile,
                line: line + 1,
                column: character + 1,
              },
              details: {
                hallucinated: true,
                parent: parentName,
                subComponent: subName,
              },
            });
          }
        }
      }

      for (const attr of node.attributes.properties) {
        if (!ts.isJsxAttribute(attr)) continue;
        if (!ts.isIdentifier(attr.name)) continue;

        // className on a Marigold component bypasses the design system. Marigold
        // components are styled through their own props (variant, size, space,
        // …); Tailwind className belongs only on native containers.
        if (attr.name.text === 'className' && isMarigoldTag) {
          const tagText = ts.isIdentifier(node.tagName)
            ? node.tagName.text
            : node.tagName.getText(source);
          const { line, character } = source.getLineAndCharacterOfPosition(
            attr.getStart(source)
          );
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'design-system-usage',
            component: tagText,
            message: `className on the Marigold component <${tagText}> bypasses the design system. Marigold components are styled through their own props (variant, size, space, …).`,
            suggestion: `Remove className from <${tagText}> and use its built-in props, or move the utility classes onto a wrapping native element.`,
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: { marigoldComponent: tagText, prop: 'className' },
          });
          continue;
        }

        if (attr.name.text !== 'style') continue;

        const init = attr.initializer;
        if (!init || !ts.isJsxExpression(init)) continue;
        if (!init.expression) continue;
        if (!ts.isObjectLiteralExpression(init.expression)) continue;

        const tagName = ts.isIdentifier(node.tagName)
          ? node.tagName.text
          : node.tagName.getText(source);

        const cssProps = init.expression.properties
          .filter(ts.isPropertyAssignment)
          .map(p =>
            ts.isIdentifier(p.name) ? p.name.text : p.name.getText(source)
          )
          .slice(0, 5);

        const { line, character } = source.getLineAndCharacterOfPosition(
          attr.getStart(source)
        );

        issues.push({
          type: 'technical',
          severity: 'warning',
          source: 'design-system-usage',
          component: tagName,
          message: `Inline style on <${tagName}> bypasses the design system${cssProps.length > 0 ? ` (${cssProps.join(', ')})` : ''}.`,
          suggestion:
            'Use Marigold layout components (Stack, Columns, Inset, Container) and theme tokens instead of inline styles.',
          location: {
            file: relFile,
            line: line + 1,
            column: character + 1,
          },
          details: { cssProperties: cssProps },
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(source);
  return issues;
};
