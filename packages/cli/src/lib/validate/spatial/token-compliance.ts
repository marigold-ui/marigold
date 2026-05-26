import type { Page } from 'playwright';
import {
  discoverTokenFamilies,
  loadDesignTokens,
} from '../helpers/design-tokens.js';
import type { ValidationIssue } from '../types.js';
import type { ComputedStyleSnapshot } from './computed-styles.js';

const SKIP_VALUES = new Set([
  '',
  'none',
  'normal',
  'auto',
  'inherit',
  'initial',
  'unset',
  '0px',
  '0',
  'rgba(0, 0, 0, 0)',
  'rgb(0, 0, 0)',
  'transparent',
]);

const NATIVE_ELEMENTS = [
  'div',
  'span',
  'p',
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'option',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'label',
  'fieldset',
  'legend',
  'table',
  'tr',
  'td',
  'th',
  'img',
];

export const snapshotBrowserDefaults = async (
  page: Page,
  properties: string[]
): Promise<Map<string, Set<string>>> => {
  const defaults = await page.evaluate<
    Record<string, Record<string, string>>,
    { elements: string[]; properties: string[] }
  >(
    ({ elements, properties }) => {
      const container = document.createElement('div');
      container.style.cssText =
        'position:absolute;left:-9999px;top:-9999px;visibility:hidden';
      document.body.appendChild(container);

      const result: Record<string, Record<string, string>> = {};
      for (const tag of elements) {
        const el = document.createElement(tag);
        container.appendChild(el);
        const computed = window.getComputedStyle(el);
        const styles: Record<string, string> = {};
        for (const p of properties) {
          styles[p] = computed.getPropertyValue(p);
        }
        result[tag] = styles;
      }

      document.body.removeChild(container);
      return result;
    },
    { elements: NATIVE_ELEMENTS, properties }
  );

  const defaultValues = new Map<string, Set<string>>();
  for (const styles of Object.values(defaults)) {
    for (const [prop, value] of Object.entries(styles)) {
      let set = defaultValues.get(prop);
      if (!set) {
        set = new Set();
        defaultValues.set(prop, set);
      }
      set.add(value.trim());
    }
  }
  return defaultValues;
};

const NATIVE_ELEMENT_PATTERN = new RegExp(
  `\\b(${NATIVE_ELEMENTS.join('|')}):nth-child`
);

const isBrowserDefault = (
  selector: string,
  property: string,
  value: string,
  browserDefaults: Map<string, Set<string>>
): boolean => {
  if (!NATIVE_ELEMENT_PATTERN.test(selector)) return false;
  return browserDefaults.get(property)?.has(value) ?? false;
};

type TokenReverseMap = Map<string, Map<string, string>>;

const buildTokenReverseMap = async (page: Page): Promise<TokenReverseMap> => {
  const tokens = loadDesignTokens();
  if (Object.keys(tokens).length === 0) return new Map();

  const families = discoverTokenFamilies();

  const grouped: Record<string, Array<{ name: string; value: string }>> = {};
  for (const family of families) {
    for (const tokenName of family.tokenNames) {
      const value = tokens[tokenName];
      if (!value) continue;
      for (const prop of family.cssProperties) {
        if (!grouped[prop]) grouped[prop] = [];
        grouped[prop].push({ name: tokenName, value });
      }
    }
  }

  const normalized = await page.evaluate<
    Record<string, Record<string, string>>,
    Record<string, Array<{ name: string; value: string }>>
  >(grouped => {
    const result: Record<string, Record<string, string>> = {};
    const container = document.createElement('div');
    container.style.cssText =
      'position:absolute;left:-9999px;visibility:hidden';
    document.body.appendChild(container);

    for (const [prop, entries] of Object.entries(grouped)) {
      result[prop] = {};
      for (const { name, value } of entries) {
        const el = document.createElement('div');
        el.style.setProperty(prop, value);
        container.appendChild(el);
        const computed = window.getComputedStyle(el).getPropertyValue(prop);
        if (computed) {
          result[prop][computed.trim()] = name;
        }
        container.removeChild(el);
      }
    }

    document.body.removeChild(container);
    return result;
  }, grouped);

  const map: TokenReverseMap = new Map();
  for (const [prop, reverseEntries] of Object.entries(normalized)) {
    map.set(prop, new Map(Object.entries(reverseEntries)));
  }
  return map;
};

const isTokenizedViaReverseMap = (
  property: string,
  value: string,
  reverseMap: TokenReverseMap
): boolean => {
  const propMap = reverseMap.get(property);
  if (!propMap) return false;
  if (propMap.has(value)) return true;

  if (!value.includes(' ')) return false;
  const parts = value.split(/\s+/);
  return parts.every(part => SKIP_VALUES.has(part) || propMap.has(part));
};

export const checkTokenCompliance = async (
  page: Page,
  snapshots: ComputedStyleSnapshot[],
  browserDefaults?: Map<string, Set<string>>
): Promise<ValidationIssue[]> => {
  const tokens = loadDesignTokens();
  if (Object.keys(tokens).length === 0) return [];

  const reverseMap = await buildTokenReverseMap(page);
  const defaults = browserDefaults ?? new Map<string, Set<string>>();
  const issues: ValidationIssue[] = [];

  for (const snap of snapshots) {
    for (const [property, rawValue] of Object.entries(snap.styles)) {
      const value = rawValue.trim();
      if (SKIP_VALUES.has(value)) continue;
      if (isBrowserDefault(snap.selector, property, value, defaults)) continue;
      if (isTokenizedViaReverseMap(property, value, reverseMap)) continue;

      issues.push({
        type: 'style',
        severity: 'warning',
        source: 'token-compliance',
        component: snap.selector,
        message: `Computed ${property} value "${value}" does not map to a known design token.`,
        suggestion: `If this is intentional, ignore the warning. Otherwise, use a Marigold variant or a theme-rui token instead of a hard-coded value.`,
        details: { property, value },
      });
    }
  }
  return issues;
};
