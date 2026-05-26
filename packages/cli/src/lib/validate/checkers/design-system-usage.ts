import ts from 'typescript';
import path from 'node:path';
import {
  findSubComponentSuggestion,
  isMarigoldComponent,
  isMarigoldSubComponent,
  loadMarigoldRegistry,
} from '../helpers/components.js';
import { collectImports } from '../helpers/jsx.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

const isLowercaseTag = (tagName: string): boolean => /^[a-z]/.test(tagName);

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

const isHtmlElement = (tagName: string, node: ts.Node): boolean => {
  if (!isLowercaseTag(tagName)) return false;
  if (tagName === 'svg') return false;
  if (hasSvgAncestor(node)) return false;
  return true;
};

const isPascalCase = (name: string): boolean =>
  name.length > 0 &&
  name[0] === name[0].toUpperCase() &&
  name[0] !== name[0].toLowerCase();

const isMarigoldModule = (moduleSpecifier: string): boolean =>
  moduleSpecifier.startsWith('@marigold/');

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

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;

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
          // Check for hallucinated Marigold components
          if (isMarigoldComponent(tagName)) {
            // Valid Marigold component — skip
          } else if (localDeclarations.has(tagName)) {
            // Locally declared component — skip
          } else {
            const importedFrom = importMap.get(tagName);

            if (importedFrom && isMarigoldModule(importedFrom)) {
              // Imported from a @marigold/* package but not a real component
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

        if (isPascalCase(parentName) && isMarigoldComponent(parentName)) {
          if (!isMarigoldSubComponent(parentName, subName)) {
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
