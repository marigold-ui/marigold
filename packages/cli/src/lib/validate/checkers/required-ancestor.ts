import ts from 'typescript';
import path from 'node:path';
import {
  buildMarigoldTagResolver,
  isCompoundComponent,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// A bare item the docs require to live inside a named container, even though
// that container is not part of its dotted name — the inverse of the
// schema-derived rule below, so it must be listed explicitly. Only rules with
// an explicit, prescriptive doc statement belong here. (Tag was a candidate but
// its doc text only *describes* a tag group — standalone removable tags are a
// real pattern — so it is deliberately omitted.)
//   Radio — "The <Radio> should never be used alone … the <Radio.Group> should
//     be wrapped around the <Radio>." (marigold-ui.io/components/form/radio)
export const REQUIRED_CONTAINER: Readonly<Record<string, string>> = {
  Radio: 'Radio.Group',
};

// Some hosts render a root component internally, so its sub-components may be
// written directly inside the host with no literal `<Root>` element. This is
// documented behaviour, not an error:
//   - ActionMenu is a ready-made Menu trigger, so its <Menu.Item>s live inside
//     <ActionMenu> rather than <Menu> (marigold-ui.io/components/overlay/menu).
// Hosts may be written either as a dotted sub (`X.Y`) or a flat component
// (`ActionMenu`); when the host appears, its provided root counts as present.
// AppLayout (which used this pattern for its Sidebar/Header) was replaced by
// AppShell (DST-1360), which has no compound sub-components at all — its docs
// have callers place <Sidebar>, <TopNavigation>, and <Page> as flat children
// directly, so no HOST_PROVIDES entry is needed for it.
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
  // Only treat a tag as a Marigold component when it is actually imported from
  // @marigold/components. A locally declared or third-party component that
  // happens to share a Marigold name must not be held to Marigold's
  // required-ancestor rules — that was a false-positive error. Mirrors the
  // origin guard the composition checker uses.
  const resolver = buildMarigoldTagResolver(source);

  // First pass: catalogue every JSX element in the file. The detached-usage
  // rules are deliberately file-scoped, not ancestor-scoped: LLM-generated code
  // routinely factors a `<Menu>` into one component and its `<Menu.Item>`s into
  // a helper, so an ancestor-only walk would raise false positives. We only
  // flag the unambiguous error — the required container appears *nowhere* in
  // the file — which means the author forgot it entirely.
  const identifierTags = new Set<string>(); // <Menu>, <Radio>, …
  const dottedTags = new Set<string>(); // Menu.Item, Radio.Group, …
  // Canonical (post-alias-resolution) counterparts of the two sets above. A
  // REQUIRED_CONTAINER value (e.g. 'Radio.Group') is always the canonical
  // name — checking it against the as-written sets above breaks the moment
  // the container itself is imported under an alias (`{ RadioGroup as RG }`,
  // or `{ Radio as R }` used for `<R.Group>`): the alias never textually
  // matches the canonical name, so a genuinely-present container is missed
  // and an error-severity false positive is raised.
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
        identifierTags.add(tag.text);
        const original = resolver.get(tag.text);
        if (original) canonicalIdentifierTags.add(original);
      } else if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        dottedTags.add(`${tag.expression.text}.${tag.name.text}`);
        const originalRoot = resolver.get(tag.expression.text);
        if (originalRoot) {
          canonicalDottedTags.add(`${originalRoot}.${tag.name.text}`);
        }
      }
    }
    ts.forEachChild(node, collect);
  };
  collect(source);

  // Roots that are present either literally (`<Sidebar>`) or because a host
  // that renders them internally appears in the file. A host is usually a
  // flat component (`<ActionMenu>`, checked via identifierTags below), but a
  // HOST_PROVIDES key can itself be a dotted sub-component (`<X.Y>`), checked
  // via dottedTags — no current entry uses that form (the one that used to,
  // `AppLayout.Sidebar`, was removed with AppLayout itself), so that branch
  // has no exerciser today, but it stays correct for a host written that way.
  const satisfiedRoots = new Set(identifierTags);
  for (const [host, providedRoot] of Object.entries(HOST_PROVIDES)) {
    if (dottedTags.has(host) || identifierTags.has(host)) {
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
        !satisfiedRoots.has(root)
      ) {
        issues.push({
          type: 'technical',
          severity: 'error',
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
          severity: 'error',
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
