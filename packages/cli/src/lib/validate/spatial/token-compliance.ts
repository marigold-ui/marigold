import type { Page } from 'playwright';
import {
  ThemeCssNotFoundError,
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
        // Some defaults only apply with the right attributes: an <a> is only
        // link-colored when it has an href, inputs need a type. Without this
        // the browser-default link color is never captured and every themed
        // or unstyled link gets falsely flagged as an off-token color.
        if (tag === 'a') el.setAttribute('href', '#');
        if (tag === 'input') el.setAttribute('type', 'text');
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
  let tokens: Record<string, string>;
  try {
    tokens = loadDesignTokens();
  } catch (err) {
    if (err instanceof ThemeCssNotFoundError) return new Map();
    throw err;
  }
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

// The COMPUTED-style token check (over the snapshots loop below) only fires
// for color-family properties. A color token resolves to an exact rgb() value,
// so a reverse-map match against the computed value is SOUND. Spacing,
// typography and radius (line-height 25.6px, padding shorthand "8px 16px", a
// pill's computed border-radius) are theme-derived computed pixels that rarely
// equal a discrete token even when the value is fully token-driven; flagging
// them produces warning volume that scales with UI size and biases the model
// comparison. The author-written INLINE path (TOKENIZABLE_INLINE_PROPERTIES,
// below) is broader on purpose — there a hardcoded spacing/radius value is a
// real off-token override, not a theme-derived computed pixel.
const COMPUTED_TOKEN_PROPERTIES = new Set([
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'fill',
  'stroke',
]);

export const isComputedTokenCandidate = (property: string): boolean =>
  COMPUTED_TOKEN_PROPERTIES.has(property);

// A disabled control's computed colors are a state treatment — the disabled
// appearance composites an alpha/opacity over the base (e.g. a Marigold Button
// with `disabled` renders rgba(…, 0.3)), so the value can never reverse-map to
// an opaque token. That is not an author-chosen off-token color, so its
// computed styles must not be token-checked. Author-written INLINE styles are
// still checked separately and are unaffected by disabled state.
export const isTokenCheckableSnapshot = (snap: {
  disabled?: boolean;
}): boolean => snap.disabled !== true;

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

const HARDCODED_VALUE =
  /(?:#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\(|lch\(|hwb\(|lab\(|color\(|\d+(?:px|em|rem|ch|vw|vh)\b)/;

// Only properties where a design token is the expected source of the value.
// Layout/positioning properties (transform, width, top, ...) and CSS custom
// properties (--*) are deliberately excluded: components legitimately set
// those inline (e.g. Marigold's Tiles writes `--tilesWidth` from a prop, a
// table sets computed column widths), and they have no token equivalent.
const TOKENIZABLE_INLINE_PROPERTIES = new Set([
  'color',
  'background',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'fill',
  'stroke',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'gap',
  'row-gap',
  'column-gap',
  'border-radius',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'box-shadow',
]);

// React Aria's `VisuallyHidden` (used internally by CheckboxGroup, RadioGroup,
// many form components) renders a screen-reader-only element with the classic
// clip idiom: `position:absolute; width:1px; height:1px; margin:-1px;
// padding:0; overflow:hidden; clip:rect(0 0 0 0); clip-path:inset(50%)`. Those
// inline values are an intentional a11y pattern with no token equivalent — the
// `-1px`/`0` are part of the clip hack, not author-chosen off-token spacing.
// Flagging them is a false positive and, worse, attributes a design-system
// internal to the generated page. Skip the whole element when its inline style
// carries the clip signature. NOTE: the same logic is inlined inside
// detectHardcodedInlineStyles' page.evaluate (browser code cannot import this);
// keep the two in sync.
export const isVisuallyHiddenInlineStyle = (raw: string): boolean =>
  /clip\s*:\s*rect\(\s*0/i.test(raw) ||
  /clip-path\s*:\s*inset\(\s*50%/i.test(raw) ||
  (/(?:^|;)\s*width\s*:\s*1px/i.test(raw) &&
    /(?:^|;)\s*height\s*:\s*1px/i.test(raw) &&
    /overflow\s*:\s*hidden/i.test(raw));

type InlineStyleViolation = {
  selector: string;
  component: string;
  fingerprint: string;
  property: string;
  value: string;
};

const detectHardcodedInlineStyles = async (
  page: Page
): Promise<InlineStyleViolation[]> =>
  page.evaluate(() => {
    const results: Array<{
      selector: string;
      component: string;
      fingerprint: string;
      property: string;
      value: string;
    }> = [];
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;
    const describeEl = mv.describeEl as (el: Element) => {
      component: string;
      fingerprint: string;
    };

    for (const el of document.querySelectorAll('[style]')) {
      const raw = el.getAttribute('style');
      if (!raw) continue;
      // Skip React Aria VisuallyHidden clip elements (kept in sync with the
      // exported isVisuallyHiddenInlineStyle helper).
      if (
        /clip\s*:\s*rect\(\s*0/i.test(raw) ||
        /clip-path\s*:\s*inset\(\s*50%/i.test(raw) ||
        (/(?:^|;)\s*width\s*:\s*1px/i.test(raw) &&
          /(?:^|;)\s*height\s*:\s*1px/i.test(raw) &&
          /overflow\s*:\s*hidden/i.test(raw))
      ) {
        continue;
      }
      const selector = cssPath(el);
      const { component, fingerprint } = describeEl(el);
      for (const decl of raw.split(';')) {
        const colon = decl.indexOf(':');
        if (colon < 0) continue;
        const prop = decl.slice(0, colon).trim();
        const val = decl.slice(colon + 1).trim();
        if (!val || val.includes('var(')) continue;
        results.push({
          selector,
          component,
          fingerprint,
          property: prop,
          value: val,
        });
      }
    }
    return results;
  });

export const checkTokenCompliance = async (
  page: Page,
  snapshots: ComputedStyleSnapshot[],
  browserDefaults?: Map<string, Set<string>>
): Promise<ValidationIssue[]> => {
  let tokens: Record<string, string>;
  try {
    tokens = loadDesignTokens();
  } catch (err) {
    if (err instanceof ThemeCssNotFoundError) return [];
    throw err;
  }
  if (Object.keys(tokens).length === 0) return [];

  const reverseMap = await buildTokenReverseMap(page);
  const defaults = browserDefaults ?? new Map<string, Set<string>>();
  const issues: ValidationIssue[] = [];

  for (const snap of snapshots) {
    if (!isTokenCheckableSnapshot(snap)) continue;
    for (const [property, rawValue] of Object.entries(snap.styles)) {
      if (!isComputedTokenCandidate(property)) continue;
      const value = rawValue.trim();
      if (SKIP_VALUES.has(value)) continue;
      if (isBrowserDefault(snap.selector, property, value, defaults)) continue;
      if (isTokenizedViaReverseMap(property, value, reverseMap)) continue;

      const fp = snap.fingerprint ? ` (“${snap.fingerprint}”)` : '';
      issues.push({
        type: 'style',
        severity: 'warning',
        source: 'token-compliance',
        component: snap.component,
        message: `Computed ${property} value "${value}" on <${snap.component}>${fp} does not map to a known design token.`,
        suggestion: `If this is intentional, ignore the warning. Otherwise, use a Marigold variant or a theme-rui token instead of a hard-coded value.`,
        details: {
          property,
          value,
          selector: snap.selector,
          ...(snap.fingerprint ? { fingerprint: snap.fingerprint } : {}),
        },
      });
    }
  }

  const inlineViolations = await detectHardcodedInlineStyles(page);
  for (const v of inlineViolations) {
    // CSS custom properties are the token mechanism itself, and non-tokenizable
    // properties (transform, width, ...) have no token to use instead.
    if (v.property.startsWith('--')) continue;
    if (!TOKENIZABLE_INLINE_PROPERTIES.has(v.property)) continue;
    // Reset/neutral values (0, 0px, transparent, …) are not off-token
    // overrides; the computed path skips them via SKIP_VALUES, the inline path
    // must too (e.g. a stray `padding: 0px` is not a token violation).
    if (SKIP_VALUES.has(v.value)) continue;
    if (!HARDCODED_VALUE.test(v.value)) continue;
    const fp = v.fingerprint ? ` (“${v.fingerprint}”)` : '';
    issues.push({
      type: 'style',
      severity: 'warning',
      source: 'token-compliance',
      component: v.component,
      message: `Inline style "${v.property}: ${v.value}" on <${v.component}>${fp} uses a hardcoded value instead of a design token.`,
      suggestion: `Use var(--token-name) or a Marigold component prop instead of hardcoding "${v.value}".`,
      details: {
        property: v.property,
        value: v.value,
        inline: true,
        selector: v.selector,
        ...(v.fingerprint ? { fingerprint: v.fingerprint } : {}),
      },
    });
  }

  return issues;
};
