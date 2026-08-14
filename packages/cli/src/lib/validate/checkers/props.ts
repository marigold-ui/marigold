import ts from 'typescript';
import path from 'node:path';
import {
  containsEventTargetAccess,
  staticStringValue,
} from '../helpers/ast.js';
import {
  type ComponentPropInfo,
  buildMarigoldTagResolver,
  getComponentProps,
  getHandlerShadows,
  getSubComponentProps,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationCoverage, ValidationIssue } from '../types.js';

// React Aria handlers that pass a value, not a DOM event, so a `.target.value`
// in the body is wrong.
//
// Error-severity, so the premise must be FP-free: membership here is necessary
// but not sufficient, and the type-based gate below is what decides. Most
// components rename these to `onChange` (ComboBox onChange ≙ onInputChange),
// which is always value-based — but the low-level native wrappers (Input,
// SearchInput) inherit the DOM `ChangeEventHandler` as-is.
const VALUE_BASED_HANDLERS = new Set([
  'onChange',
  'onSelectionChange',
  'onInputChange',
]);

const COMMON_PROPS = new Set(['key', 'ref', 'children', 'data-testid', 'id']);

// Components remove `className`/`style` in favour of `variant`/`size`, so
// unlike COMMON_PROPS these are not blanket-allowed. `validSet` is checked
// first, so the few components that deliberately keep one stay unflagged.
const STYLE_ESCAPE_PROPS = new Set(['className', 'style']);

const suggestProp = (used: string, valid: string[]): string | undefined => {
  // Guard the empty name: `used[0]` below would throw on '' and the throw would
  // escape validateProps and be reported as a fatal runtime error.
  if (!used) return undefined;
  const lower = used.toLowerCase();
  for (const v of valid) {
    if (v.toLowerCase() === lower) return v;
  }
  const stripped = used.replace(/^is/, '').toLowerCase();
  for (const v of valid) {
    if (v.toLowerCase() === stripped) return v;
  }
  const isPrefixed = (
    'is' +
    used[0].toUpperCase() +
    used.slice(1)
  ).toLowerCase();
  for (const v of valid) {
    if (v.toLowerCase() === isPrefixed) return v;
  }
  return undefined;
};

export const validateProps = (
  filePath: string,
  coverage?: ValidationCoverage
): ValidationIssue[] => {
  const source = parseSource(filePath);

  // Each JSX tag as written (honouring aliases) to its real
  // @marigold/components symbol. Tags absent from this map merely share a
  // Marigold name and must not be validated against its prop schema.
  const tagResolver = buildMarigoldTagResolver(source);

  const issues: ValidationIssue[] = [];

  const checkAttributes = (
    displayName: string,
    resolvedName: string,
    validProps: ComponentPropInfo[],
    attrs: ts.JsxAttributes
  ): void => {
    const validNames = validProps.map(p => p.name);
    const validSet = new Set(validNames);

    // Shadow lookups use the RESOLVED real Marigold name (strip sub-component
    // suffix). `displayName` is kept for messages so they read as written.
    const baseName = resolvedName.split('.')[0];
    const handlerShadows = getHandlerShadows(baseName);

    for (const attr of attrs.properties) {
      if (ts.isJsxSpreadAttribute(attr)) {
        if (coverage) coverage.spreadPropsBypassed++;
        const { line, character } = source.getLineAndCharacterOfPosition(
          attr.getStart(source)
        );
        issues.push({
          type: 'technical',
          severity: 'warning',
          source: 'prop-validator',
          component: displayName,
          message: `Spread props on <${displayName}> bypass prop validation.`,
          suggestion: `Pass props explicitly so they can be validated against the component's API.`,
          location: {
            file: path.relative(process.cwd(), filePath),
            line: line + 1,
            column: character + 1,
          },
        });
        continue;
      }
      if (!ts.isJsxAttribute(attr)) continue;
      if (!ts.isIdentifier(attr.name)) continue;
      const name = attr.name.text;
      if (
        COMMON_PROPS.has(name) ||
        name.startsWith('aria-') ||
        name.startsWith('data-')
      ) {
        continue;
      }

      const { line, character } = source.getLineAndCharacterOfPosition(
        attr.getStart(source)
      );
      const location = {
        file: path.relative(process.cwd(), filePath),
        line: line + 1,
        column: character + 1,
      };

      if (!validSet.has(name)) {
        if (STYLE_ESCAPE_PROPS.has(name)) {
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'prop-validator',
            component: displayName,
            message: `Prop "${name}" on <${displayName}> bypasses the design system's theming.`,
            suggestion: `Marigold components don't expose "className"/"style" — use the component's own theming props (e.g. "variant", "size") instead.`,
            location,
            details: { used: name },
          });
          continue;
        }
        const suggested = suggestProp(name, validNames);
        issues.push({
          type: 'technical',
          severity: 'error',
          source: 'prop-validator',
          component: displayName,
          message: `Prop "${name}" does not exist on <${displayName}>.`,
          suggestion: suggested
            ? `Replace "${name}" with "${suggested}".`
            : `Remove the prop. Available props: ${validNames.slice(0, 15).join(', ')}${validNames.length > 15 ? ', …' : ''}.`,
          location,
          details: { used: name, available: validNames.slice(0, 15) },
        });
        continue;
      }

      const ariaHandler = handlerShadows.get(name);
      if (ariaHandler) {
        issues.push({
          type: 'technical',
          severity: 'warning',
          source: 'prop-validator',
          component: displayName,
          message: `Prop "${name}" on <${displayName}> shadows the React Aria handler "${ariaHandler}".`,
          suggestion: `Replace "${name}" with "${ariaHandler}".`,
          location,
          details: { used: name, preferred: ariaHandler },
        });
        continue;
      }

      const valueHandlerPropInfo = validProps.find(p => p.name === name);
      // Plain substring, not a word-boundary match: real declared types are
      // camelCase compounds like `ChangeEventHandler<HTMLInputElement>` with
      // no boundary between "Change" and "Event" for `\bEvent\b` to find.
      const looksEventBased = /Event/.test(valueHandlerPropInfo?.type ?? '');
      if (
        VALUE_BASED_HANDLERS.has(name) &&
        !looksEventBased &&
        attr.initializer
      ) {
        const init = ts.isJsxExpression(attr.initializer)
          ? attr.initializer.expression
          : undefined;
        // Bind the DOM-event detection to the handler's first parameter, so a
        // `.target.value` on any other object in the body is not a false error.
        const fn =
          init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
            ? init
            : undefined;
        const firstParam = fn?.parameters[0];
        const paramName =
          firstParam && ts.isIdentifier(firstParam.name)
            ? firstParam.name.text
            : undefined;
        if (fn && paramName && containsEventTargetAccess(fn.body, paramName)) {
          const paramType = valueHandlerPropInfo?.type ?? 'value';
          issues.push({
            type: 'technical',
            severity: 'error',
            source: 'prop-validator',
            component: displayName,
            message: `Marigold <${displayName}> ${name} passes the value directly (${paramType}), not a DOM event.`,
            suggestion: `Use ${name}={(value) => ...} instead of ${name}={(e) => ... e.target.value}.`,
            location,
            details: { handler: name, pattern: 'event-target-access' },
          });
          continue;
        }
      }

      const propInfo = validProps.find(p => p.name === name);
      if (!propInfo?.knownValues) continue;

      const value = staticStringValue(attr);
      if (value === undefined) {
        // Dynamic value (e.g. variant={cond ? 'a' : 'b'}) cannot be checked
        // against the schema. Record it so the coverage gap is visible.
        if (coverage) coverage.dynamicValuesSkipped++;
        continue;
      }
      if (coverage) coverage.staticValuesChecked++;

      // A widened union accepts any string, so a value outside the literals
      // doesn't violate the type contract — reporting it would be a false
      // positive. The theme-variant check covers those as a warning.
      if (propInfo.openValues) continue;

      if (!propInfo.knownValues.includes(value)) {
        issues.push({
          type: 'technical',
          severity: 'error',
          source: 'prop-validator',
          component: displayName,
          message: `Prop "${name}" value "${value}" is not a known variant for <${displayName}>.`,
          suggestion: `Known values: ${propInfo.knownValues.join(', ')}.`,
          location,
          details: { used: value, known: propInfo.knownValues },
        });
      }
    }
  };

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;

      if (ts.isIdentifier(tag)) {
        const resolved = tagResolver.get(tag.text);
        if (!resolved) return ts.forEachChild(node, visit);
        const props = getComponentProps(resolved);
        if (props && props.length > 0) {
          checkAttributes(tag.text, resolved, props, node.attributes);
        }
      } else if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        const parentDisplay = tag.expression.text;
        const subName = tag.name.text;
        const resolvedParent = tagResolver.get(parentDisplay);
        if (resolvedParent && isMarigoldSubComponent(resolvedParent, subName)) {
          const props = getSubComponentProps(resolvedParent, subName);
          if (props && props.length > 0) {
            checkAttributes(
              `${parentDisplay}.${subName}`,
              `${resolvedParent}.${subName}`,
              props,
              node.attributes
            );
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return issues;
};
