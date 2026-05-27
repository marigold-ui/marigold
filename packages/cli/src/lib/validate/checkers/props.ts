import ts from 'typescript';
import path from 'node:path';
import {
  containsEventTargetAccess,
  staticStringValue,
} from '../helpers/ast.js';
import {
  type ComponentPropInfo,
  getBooleanShadows,
  getComponentProps,
  getHandlerShadows,
  getSubComponentProps,
  isMarigoldComponent,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// React Aria value-based handlers that pass a value, not a DOM event.
// If the handler body accesses .target.value or .target.checked, it's wrong.
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

export const validateProps = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);

  const issues: ValidationIssue[] = [];

  const checkAttributes = (
    displayName: string,
    validProps: ComponentPropInfo[],
    attrs: ts.JsxAttributes
  ): void => {
    const validNames = validProps.map(p => p.name);
    const validSet = new Set(validNames);

    // The base component name (strip sub-component suffix for shadow lookups)
    const baseName = displayName.split('.')[0];
    const handlerShadows = getHandlerShadows(baseName);
    const booleanShadows = getBooleanShadows(baseName);

    for (const attr of attrs.properties) {
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
            : `Remove the prop. Available props: ${validNames.slice(0, 12).join(', ')}${validNames.length > 12 ? ', …' : ''}.`,
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
        if (
          init &&
          (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) &&
          containsEventTargetAccess(init.body)
        ) {
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
      if (value === undefined) continue;

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
        if (!isMarigoldComponent(tag.text)) return ts.forEachChild(node, visit);
        const props = getComponentProps(tag.text);
        if (props && props.length > 0) {
          checkAttributes(tag.text, props, node.attributes);
        }
      } else if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        const parentName = tag.expression.text;
        const subName = tag.name.text;
        if (isMarigoldSubComponent(parentName, subName)) {
          const props = getSubComponentProps(parentName, subName);
          if (props && props.length > 0) {
            checkAttributes(`${parentName}.${subName}`, props, node.attributes);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return issues;
};
