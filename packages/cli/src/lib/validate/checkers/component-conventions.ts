import ts from 'typescript';
import path from 'node:path';
import { isPascalCase, staticStringValue } from '../helpers/ast.js';
import { buildMarigoldTagResolver } from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { SourceLocation, ValidationIssue } from '../types.js';

const PRIMARY = 'primary';

// Does this function's own body contain JSX (so it is a component)? Stops at
// nested function boundaries so a helper returning a render callback is not
// mistaken for the component itself.
const returnsJsx = (fn: ts.FunctionLikeDeclaration): boolean => {
  const body = fn.body;
  if (!body) return false;
  let found = false;
  const walk = (n: ts.Node): void => {
    if (found) return;
    if (
      ts.isJsxElement(n) ||
      ts.isJsxSelfClosingElement(n) ||
      ts.isJsxFragment(n)
    ) {
      found = true;
      return;
    }
    if (
      n !== body &&
      (ts.isFunctionDeclaration(n) ||
        ts.isFunctionExpression(n) ||
        ts.isArrowFunction(n))
    ) {
      return;
    }
    ts.forEachChild(n, walk);
  };
  walk(body);
  return found;
};

const LOADING_LABEL =
  /\b(saving|loading|submitting|sending|please wait|wird|lädt|speichert|send(?:e|et|en)?)\b/i;

export const validateComponentConventions = (
  filePath: string
): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  // Resolve JSX tags to their real @marigold/components symbol so W7/W10 only
  // fire on Marigold's own <Form>/<Button> — not a locally declared or
  // third-party component that happens to share the name, and honoring aliased
  // imports (`{ Button as Btn }`). Mirrors the origin guard the prop and
  // composition checkers use; without it these warnings false-positive on
  // `./ui/Button` or a local <Form>.
  const resolver = buildMarigoldTagResolver(source);
  const isMarigoldForm = (name: string): boolean =>
    resolver.get(name) === 'Form';
  const isMarigoldButton = (name: string): boolean =>
    resolver.get(name) === 'Button';

  const locOf = (node: ts.Node): SourceLocation => {
    const { line, character } = source.getLineAndCharacterOfPosition(
      node.getStart(source)
    );
    return { file: relFile, line: line + 1, column: character + 1 };
  };

  // --- W4: a component that takes props but leaves the props parameter
  // completely untyped. Conservative: only an entirely missing type annotation
  // is flagged (an inline object type still counts as typed). ---
  const checkComponentProps = (
    name: string,
    fn: ts.FunctionLikeDeclaration,
    nameNode: ts.Node
  ): void => {
    if (!isPascalCase(name)) return;
    const param = fn.parameters[0];
    if (!param) return; // props-less component — fine
    if (param.type) return; // already typed (named or inline) — fine
    if (param.dotDotDotToken) return; // rest param — skip
    if (!returnsJsx(fn)) return; // not a component
    issues.push({
      type: 'technical',
      severity: 'warning',
      source: 'component-conventions',
      component: name,
      message: `The component <${name}> takes props but its props parameter is untyped. Define a typed props interface so the component's contract is explicit and checkable.`,
      suggestion: `Add a props type, e.g. type ${name}Props = { … }; const ${name} = (props: ${name}Props) => …`,
      location: locOf(nameNode),
      details: { untypedProps: true },
    });
  };

  // --- W7: more than one primary Button inside the same <Form>. The Marigold
  // convention is exactly one primary action per form (the affirmative submit);
  // every other action is secondary/ghost/link. Settings pages are the
  // exception because each independently-saving Panel wraps its OWN <Form>, so
  // counting per-<Form> handles them automatically. ---
  const primaryButtonsInForm = (
    formNode: ts.JsxElement
  ): (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] => {
    const found: (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] = [];
    const walk = (n: ts.Node, root: boolean): void => {
      // a nested <Form> starts its own scope
      if (!root && ts.isJsxElement(n)) {
        const t = n.openingElement.tagName;
        if (ts.isIdentifier(t) && isMarigoldForm(t.text)) return;
      }
      if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
        const t = n.tagName;
        if (ts.isIdentifier(t) && isMarigoldButton(t.text)) {
          for (const attr of n.attributes.properties) {
            if (
              ts.isJsxAttribute(attr) &&
              ts.isIdentifier(attr.name) &&
              attr.name.text === 'variant' &&
              staticStringValue(attr) === PRIMARY
            ) {
              found.push(n);
            }
          }
        }
      }
      ts.forEachChild(n, c => walk(c, false));
    };
    walk(formNode, true);
    return found;
  };

  const visit = (node: ts.Node): void => {
    // W4 — arrow/function-expression components: const Name = (props) => …
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.initializer &&
          (ts.isArrowFunction(decl.initializer) ||
            ts.isFunctionExpression(decl.initializer))
        ) {
          checkComponentProps(decl.name.text, decl.initializer, decl.name);
        }
      }
    }
    // W4 — function declarations: function Name(props) { … }
    if (ts.isFunctionDeclaration(node) && node.name) {
      checkComponentProps(node.name.text, node, node.name);
    }

    // W7 — more than one primary Button per Form
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && isMarigoldForm(tag.text)) {
        const primaries = primaryButtonsInForm(node);
        if (primaries.length > 1) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'component-conventions',
            component: 'Form',
            message: `This <Form> has ${primaries.length} primary buttons (variant="primary"). A form should have exactly one primary action; all others should be secondary, ghost or link.`,
            suggestion: `Keep one Button variant="primary" (the submit) and change the rest to variant="secondary"/"ghost"/"link".`,
            location: locOf(node.openingElement),
            details: { primaryCount: primaries.length },
          });
        }
      }
    }

    // W10 — a Button that swaps its label to a loading text by hand instead of
    // using the built-in `loading` prop.
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && isMarigoldButton(tag.text)) {
        const swap = node.children.some(c => {
          if (!ts.isJsxExpression(c) || !c.expression) return false;
          const e = c.expression;
          const branches: ts.Node[] = [];
          if (ts.isConditionalExpression(e)) {
            branches.push(e.whenTrue, e.whenFalse);
          } else if (
            ts.isBinaryExpression(e) &&
            e.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
          ) {
            branches.push(e.right);
          }
          return branches.some(
            b => ts.isStringLiteral(b) && LOADING_LABEL.test(b.text)
          );
        });
        if (swap) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'component-conventions',
            component: 'Button',
            message: `<Button> swaps its label to a loading text by hand. The built-in loading prop shows a spinner, disables the button and sets aria-busy for you.`,
            suggestion: `Use <Button loading={isPending}>…</Button> with a stable label instead of swapping the text.`,
            location: locOf(node.openingElement),
            details: { manualLoadingLabel: true },
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(source);
  return issues;
};
