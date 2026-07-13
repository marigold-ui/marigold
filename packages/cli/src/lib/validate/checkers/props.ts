import ts from 'typescript';
import path from 'node:path';
import {
  containsEventTargetAccess,
  staticStringValue,
} from '../helpers/ast.js';
import {
  type ComponentPropInfo,
  buildMarigoldTagResolver,
  getBooleanShadows,
  getComponentProps,
  getHandlerShadows,
  getSubComponentProps,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationCoverage, ValidationIssue } from '../types.js';

// React Aria value-based handlers that pass a value, not a DOM event.
// If the handler body accesses .target.value or .target.checked, it's wrong.
//
// Error-severity, so the premise (NONE of these ever forward a DOM event) must
// be FP-free. Verified against the react-aria source these all resolve to:
//   @react-types/shared ValueBase.onChange?: (value: C) => void
//   @react-types/shared onSelectionChange?: (key: Key | null | Selection) => void
//   ComboBox onInputChange?: (value: string) => void
// Marigold wraps react-aria-components and only ever *renames* these handlers
// to `onChange` (e.g. ComboBox onChange ≙ onInputChange) — always value-based,
// never a raw ChangeEvent. So `e.target.value` inside one is unambiguously a bug.
const VALUE_BASED_HANDLERS = new Set([
  'onChange',
  'onSelectionChange',
  'onInputChange',
]);

const COMMON_PROPS = new Set([
  'key',
  'ref',
  'children',
  'className',
  'style',
  'data-testid',
  'id',
]);

const suggestProp = (used: string, valid: string[]): string | undefined => {
  // Guard the empty name: `used[0]` below would throw on '' and the throw would
  // escape validateProps and be reported as a fatal runtime error.
  if (!used) return undefined;
  const lower = used.toLowerCase();
  for (const v of valid) {
    if (v.toLowerCase() === lower) return v;
  }
  // Strip is-prefix: isRequired → required
  const stripped = used.replace(/^is/, '').toLowerCase();
  for (const v of valid) {
    if (v.toLowerCase() === stripped) return v;
  }
  // Add is-prefix: disabled → isDisabled
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

  // Maps each JSX tag identifier as written (honoring `import { X as Y }`
  // aliases) to the real @marigold/components symbol. Tags not in this map are
  // local/aliased-local/third-party components that merely share a Marigold
  // name, and must NOT be validated against the Marigold prop schema.
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
    const booleanShadows = getBooleanShadows(baseName);

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

      // Event handler shadow: HTML handler used when a React Aria equivalent exists
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

      // Boolean shadow: HTML prop used when an is-prefixed React Aria equivalent exists
      const ariaBool = booleanShadows.get(name);
      if (ariaBool) {
        issues.push({
          type: 'technical',
          severity: 'warning',
          source: 'prop-validator',
          component: displayName,
          message: `Prop "${name}" on <${displayName}> shadows the React Aria prop "${ariaBool}".`,
          suggestion: `Replace "${name}" with "${ariaBool}".`,
          location,
          details: { used: name, preferred: ariaBool },
        });
        continue;
      }

      // Value-based handler signature check: detect DOM event patterns
      // like e.target.value in handlers that receive a value, not an event.
      if (VALUE_BASED_HANDLERS.has(name) && attr.initializer) {
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
          const propInfo = validProps.find(p => p.name === name);
          const paramType = propInfo?.type ?? 'value';
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

      // A widened union like `'primary' | 'secondary' | (string & {})` lets
      // the type accept any string, so a value outside the listed literals
      // does not violate the type contract. Reporting it here as an error
      // would be a false positive; the theme-variant check covers those
      // props against the actually-defined theme values as a warning.
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
          // Display the tag as written (e.g. <Btn>), validate against `resolved`.
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
