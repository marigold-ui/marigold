import ts from 'typescript';
import path from 'node:path';
import {
  buildMarigoldTagResolver,
  isCompoundComponent,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// A bare item the docs require inside a named container that isn't part of its
// dotted name — the inverse of the schema-derived rule below, so it must be
// listed explicitly. Only prescriptive doc statements belong here. (Tag is
// omitted: its docs only *describe* a group, and standalone tags are real.)
//   Radio — "The <Radio> should never be used alone … the <Radio.Group> should
//     be wrapped around the <Radio>." (marigold-ui.io/components/form/radio)
export const REQUIRED_CONTAINER: Readonly<Record<string, string>> = {
  Radio: 'Radio.Group',
};

// Some hosts render a root internally, so its sub-components may sit directly
// inside the host with no literal `<Root>`. Documented behaviour, not an error:
//   - ActionMenu is a ready-made Menu trigger, so its <Menu.Item>s live inside
//     <ActionMenu> rather than <Menu> (marigold-ui.io/components/overlay/menu).
// When the host appears, its provided root counts as present.
export const HOST_PROVIDES: Readonly<Record<string, string>> = {
  ActionMenu: 'Menu',
};

// `Radio.Group` is also exported flat as `RadioGroup`; treat the two as the
// same container so a bare item inside the flat form is not falsely flagged.
const deDotted = (name: string): string => name.replace(/\./g, '');

// `<X.Provider>` wraps `<X>` from the outside (a context provider), so it must
// not itself be required to live inside an `<X>`. Skip provider sub-components.
const PROVIDER_SUB = 'Provider';

type ElementInfo = {
  node: ts.JsxElement | ts.JsxSelfClosingElement;
  tag: ts.JsxTagNameExpression;
};

const tagOf = (node: ts.Node): ts.JsxTagNameExpression | undefined => {
  if (ts.isJsxElement(node)) return node.openingElement.tagName;
  if (ts.isJsxSelfClosingElement(node)) return node.tagName;
  return undefined;
};

export const validateRequiredAncestor = (
  filePath: string
): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];
  // Only tags actually imported from @marigold/components: a local or
  // third-party component sharing a Marigold name must not be held to these
  // rules. Mirrors the composition checker's origin guard.
  const resolver = buildMarigoldTagResolver(source);

  // First pass: catalogue every JSX element. These rules are deliberately
  // file-scoped rather than ancestor-scoped, because generated code routinely
  // factors a `<Menu>` and its `<Menu.Item>`s into separate components. Only
  // the unambiguous case is flagged: the container appears nowhere in the file.
  //
  // Keyed by CANONICAL name, not as-written text. REQUIRED_CONTAINER and
  // HOST_PROVIDES entries are always canonical, so matching them against
  // as-written tags would miss a genuinely-present container the moment either
  // side is aliased (`{ RadioGroup as RG }`) and false-positive on valid code.
  const canonicalIdentifierTags = new Set<string>();
  const canonicalDottedTags = new Set<string>();
  const elements: ElementInfo[] = [];

  const collect = (node: ts.Node): void => {
    const tag = tagOf(node);
    if (tag) {
      elements.push({
        node: node as ts.JsxElement | ts.JsxSelfClosingElement,
        tag,
      });
      if (ts.isIdentifier(tag)) {
        const original = resolver.get(tag.text);
        if (original) canonicalIdentifierTags.add(original);
      } else if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        const originalRoot = resolver.get(tag.expression.text);
        if (originalRoot) {
          canonicalDottedTags.add(`${originalRoot}.${tag.name.text}`);
        }
      }
    }
    ts.forEachChild(node, collect);
  };
  collect(source);

  // Roots present either literally (`<Sidebar>`) or via a host that renders
  // them internally. A host is usually flat (`<ActionMenu>`), but a
  // HOST_PROVIDES key may itself be dotted — no entry uses that form today, so
  // that branch is unexercised, though correct. Built from the canonical sets
  // for the same aliasing reason as above.
  const satisfiedRoots = new Set(canonicalIdentifierTags);
  for (const [host, providedRoot] of Object.entries(HOST_PROVIDES)) {
    if (canonicalDottedTags.has(host) || canonicalIdentifierTags.has(host)) {
      satisfiedRoots.add(providedRoot);
    }
  }

  const locate = (node: ts.JsxElement | ts.JsxSelfClosingElement) => {
    const start = ts.isJsxElement(node)
      ? node.openingElement.getStart(source)
      : node.getStart(source);
    const { line, character } = source.getLineAndCharacterOfPosition(start);
    return { file: relFile, line: line + 1, column: character + 1 };
  };

  for (const { node, tag } of elements) {
    // (a) Schema-derived: a dotted compound piece `<X.Y>` requires its root
    // container `<X>` somewhere in the file.
    if (ts.isPropertyAccessExpression(tag) && ts.isIdentifier(tag.expression)) {
      const root = tag.expression.text;
      const sub = tag.name.text;
      const originalRoot = resolver.get(root);
      if (
        sub !== PROVIDER_SUB &&
        originalRoot !== undefined &&
        isCompoundComponent(originalRoot) &&
        isMarigoldSubComponent(originalRoot, sub) &&
        !satisfiedRoots.has(originalRoot)
      ) {
        issues.push({
          type: 'technical',
          // Warning, not error: the rule is file-scoped, so cross-file
          // factoring (a `<${root}>` defined elsewhere) false-positives here,
          // and an `error` must be false-positive-free.
          severity: 'warning',
          source: 'required-ancestor',
          component: `${root}.${sub}`,
          message: `<${root}.${sub}> is used without a <${root}> container anywhere in the file. Compound parts must be rendered inside their root component.`,
          suggestion: `Wrap the <${root}.${sub}> usage in a <${root}>…</${root}>.`,
          location: locate(node),
          details: { subComponent: `${root}.${sub}`, requiredRoot: root },
        });
      }
      continue;
    }

    // (b) Curated inverse: a bare item that must sit inside a named container.
    if (ts.isIdentifier(tag)) {
      const original = resolver.get(tag.text);
      const container = original ? REQUIRED_CONTAINER[original] : undefined;
      if (
        container &&
        !canonicalDottedTags.has(container) &&
        !canonicalIdentifierTags.has(deDotted(container))
      ) {
        issues.push({
          type: 'technical',
          // Same file-scoped reasoning as the branch above.
          severity: 'warning',
          source: 'required-ancestor',
          component: tag.text,
          message: `<${tag.text}> is used without a <${container}> anywhere in the file. It must be grouped inside a <${container}>.`,
          suggestion: `Wrap the <${tag.text}> usage in a <${container}>…</${container}>.`,
          location: locate(node),
          details: { component: tag.text, requiredContainer: container },
        });
      }
    }
  }

  return issues;
};
