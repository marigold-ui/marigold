import ts from 'typescript';
import path from 'node:path';
import { hasAttrPresent, hasSpreadAttribute } from '../helpers/ast.js';
import {
  getSubComponentProps,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// Collection components expose a `<X.Section>` whose `header` prop the docs
// declare mandatory ("A header is required for each section, which is set using
// the `header` prop." — Select, ComboBox, Autocomplete, TagField). The
// published declarations type `header` as a required `ReactNode`, but tsc does
// not enforce it on `<X.Section>` usage (verified empirically: a section
// without a header compiles cleanly through the RAC generics), so the compiler
// check never flags a missing header. This check closes that gap: it fires
// only for `*.Section` sub-components that the schema confirms accept a
// `header` prop, so it stays in sync with the component API.
const SECTION_SUB = 'Section';
const HEADER_PROP = 'header';

export const validateSectionHeader = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const check = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression) &&
        tag.name.text === SECTION_SUB
      ) {
        const parent = tag.expression.text;
        const props = getSubComponentProps(parent, SECTION_SUB);
        const acceptsHeader = props?.some(p => p.name === HEADER_PROP) ?? false;

        // A spread (`{...props}`) may carry the header, which cannot be
        // resolved statically — skip to avoid a false positive.
        const hasSpread = hasSpreadAttribute(node.attributes);

        if (
          isMarigoldSubComponent(parent, SECTION_SUB) &&
          acceptsHeader &&
          !hasSpread &&
          !hasAttrPresent(node.attributes, HEADER_PROP)
        ) {
          const start = node.getStart(source);
          const { line, character } =
            source.getLineAndCharacterOfPosition(start);
          issues.push({
            type: 'technical',
            severity: 'error',
            source: 'section-header',
            component: `${parent}.${SECTION_SUB}`,
            message: `<${parent}.${SECTION_SUB}> is missing the required "${HEADER_PROP}" prop. The compiler does not enforce it, but the docs require a header for every section.`,
            suggestion: `Add a header, e.g. <${parent}.${SECTION_SUB} ${HEADER_PROP}="…">.`,
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: {
              subComponent: `${parent}.${SECTION_SUB}`,
              missingProp: HEADER_PROP,
            },
          });
        }
      }
    }
    ts.forEachChild(node, check);
  };

  check(source);
  return issues;
};
