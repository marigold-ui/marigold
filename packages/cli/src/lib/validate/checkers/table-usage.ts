import ts from 'typescript';
import path from 'node:path';
import { hasAttrPresent } from '../helpers/ast.js';
import {
  buildMarigoldTagResolver,
  getSubComponentProps,
  isMarigoldComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { SourceLocation, ValidationIssue } from '../types.js';

// Marigold form-field components (curated — part of the design-system-specific
// remainder). A field inside a <Table> means the table is being misused for
// form layout (W8); form fields belong in Stack / Inline / Columns.
const FIELD_COMPONENTS = new Set([
  'TextField',
  'NumberField',
  'TextArea',
  'PasswordField',
  'Select',
  'SelectList',
  'ComboBox',
  'MultiSelect',
  'Autocomplete',
  'Checkbox',
  'CheckboxGroup',
  'Radio',
  'RadioGroup',
  'Switch',
  'DatePicker',
  'DateField',
  'DateRangePicker',
  'DateRangeField',
  'Slider',
  'FileField',
]);

const ROW_HEADER = 'rowHeader';

// Checks ancestors through the resolver so an aliased Marigold Table
// (`import { Table as T }`) is still recognized, no matter what its local
// name is.
const hasMarigoldAncestorNamed = (
  node: ts.Node,
  resolver: Map<string, string>,
  originalName: string
): boolean => {
  let cur: ts.Node | undefined = node.parent;
  while (cur) {
    if (ts.isJsxElement(cur)) {
      const t = cur.openingElement.tagName;
      if (ts.isIdentifier(t) && resolver.get(t.text) === originalName) {
        return true;
      }
    }
    cur = cur.parent;
  }
  return false;
};

export const validateTableUsage = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];
  // Only treat a tag as a Marigold component when it is actually imported
  // from @marigold/components. A locally declared or third-party component
  // that happens to share a Marigold name must not be held to these rules,
  // and an aliased import must still be checked.
  const resolver = buildMarigoldTagResolver(source);

  const columnAcceptsRowHeader =
    getSubComponentProps('Table', 'Column')?.some(p => p.name === ROW_HEADER) ??
    false;

  const locOf = (node: ts.Node): SourceLocation => {
    const { line, character } = source.getLineAndCharacterOfPosition(
      node.getStart(source)
    );
    return { file: relFile, line: line + 1, column: character + 1 };
  };

  const check = (node: ts.Node): void => {
    // --- W8 / W9: interactive component nested inside a Table subtree ---
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      const original = ts.isIdentifier(tag)
        ? resolver.get(tag.text)
        : undefined;
      if (ts.isIdentifier(tag) && original !== undefined) {
        const name = tag.text;
        if (
          original === 'SearchField' &&
          hasMarigoldAncestorNamed(node, resolver, 'Table')
        ) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'table-usage',
            component: name,
            message: `<SearchField> is nested inside a <Table>. Filter controls belong above the table, not within its cells.`,
            suggestion: `Move the <SearchField> outside (above) the <Table>; wire it to the list via filterText/setFilterText.`,
            location: locOf(node),
            details: { insideTable: true },
          });
        } else if (
          FIELD_COMPONENTS.has(original) &&
          hasMarigoldAncestorNamed(node, resolver, 'Table')
        ) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'table-usage',
            component: name,
            message: `<${name}> (a form field) is nested inside a <Table>. Tables are for tabular data, not form layout; fields lose their form semantics inside table cells.`,
            suggestion: `Lay out form fields in Stack, Inline or Columns instead of a Table.`,
            location: locOf(node),
            details: { insideTable: true, field: name },
          });
        }
      }
    }

    // --- W3: a <Table> with statically written columns but no rowHeader ---
    if (
      ts.isJsxElement(node) &&
      columnAcceptsRowHeader &&
      isMarigoldComponent('Table')
    ) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && resolver.get(tag.text) === 'Table') {
        // `Table.Column` sub-elements are written using the same local
        // identifier as the outer `<Table>` tag (aliased or not), so match
        // against `tag.text` rather than the hardcoded original name.
        const tableLocalName = tag.text;
        const columns: (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] = [];
        let dynamicOrSpread = false;

        const collect = (n: ts.Node, root: boolean): void => {
          // Do not descend into a nested <Table>; its columns belong to it.
          if (!root && ts.isJsxElement(n)) {
            const t = n.openingElement.tagName;
            if (ts.isIdentifier(t) && resolver.get(t.text) === 'Table') return;
          }
          if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
            const t = n.tagName;
            if (
              ts.isPropertyAccessExpression(t) &&
              ts.isIdentifier(t.expression) &&
              t.expression.text === tableLocalName &&
              t.name.text === 'Column'
            ) {
              columns.push(n);
              if (n.attributes.properties.some(ts.isJsxSpreadAttribute)) {
                dynamicOrSpread = true;
              }
              // A column produced inside an expression ({cols.map(...)}) gets
              // its rowHeader from data — cannot verify statically, so skip.
              let p: ts.Node | undefined = n.parent;
              while (p && p !== node) {
                if (ts.isJsxExpression(p)) {
                  dynamicOrSpread = true;
                  break;
                }
                p = p.parent;
              }
            }
          }
          ts.forEachChild(n, c => collect(c, false));
        };
        collect(node, true);

        if (
          columns.length > 0 &&
          !dynamicOrSpread &&
          !columns.some(c => hasAttrPresent(c.attributes, ROW_HEADER))
        ) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'table-usage',
            component: 'Table',
            message: `<Table> has no column marked rowHeader. Exactly one Table.Column should set rowHeader so screen readers can announce each row by it.`,
            suggestion: `Add rowHeader to the column that identifies each row, e.g. <Table.Column rowHeader>Name</Table.Column>.`,
            location: locOf(node.openingElement),
            details: { missingRowHeader: true, columnCount: columns.length },
          });
        }
      }
    }

    ts.forEachChild(node, check);
  };

  check(source);
  return issues;
};
