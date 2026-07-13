import fs from 'node:fs';
import { resolveThemeCss } from './resolve-theme.js';

export type DesignTokenMap = Record<string, string>;

let cachedTokens: DesignTokenMap | null = null;

const TOKEN_DECL = /--([a-zA-Z0-9_-]+):\s*([^;}\n]+);?/g;

// Restrict token extraction to `:root` / `@theme` blocks. A custom property
// declared inside a component or utility selector is NOT a design token, and
// hoisting it into the global map (last-write-wins across the whole file) could
// silently collide with a real token of the same name. Marigold's theme-rui
// emits every token inside `@theme static { … }`, so scoping keeps 100% of the
// real tokens today while making the parse robust to future non-token `--vars`.
// Falls back to the entire file when neither block exists, so a non-standard
// theme CSS still resolves.
export const extractTokenScopes = (css: string): string => {
  const scopes: string[] = [];
  const opener = /(?::root\b|@theme\b)[^{]*\{/g;
  // exec advances opener.lastIndex to just past the `{`; we only need that
  // index, not the match object, so the result is intentionally not bound.
  while (opener.exec(css) !== null) {
    let depth = 1;
    let i = opener.lastIndex;
    for (; i < css.length && depth > 0; i++) {
      if (css[i] === '{') depth += 1;
      else if (css[i] === '}') depth -= 1;
    }
    scopes.push(css.slice(opener.lastIndex, i - 1));
    opener.lastIndex = i;
  }
  return scopes.length > 0 ? scopes.join('\n') : css;
};

const resolveValue = (value: string, tokens: DesignTokenMap): string => {
  // Resolve `var(--color-foo)` chains down to their primitive value.
  let current = value.trim();
  let depth = 0;
  while (current.startsWith('var(') && depth < 10) {
    const match = current.match(/^var\(--([a-zA-Z0-9_-]+)\)$/);
    if (!match) break;
    const next = tokens[match[1]];
    if (!next) break;
    current = next.trim();
    depth += 1;
  }
  return current;
};

export class ThemeCssNotFoundError extends Error {
  constructor() {
    super(
      '@marigold/theme-rui theme.css not found. ' +
        'Run `pnpm --filter @marigold/theme-rui build` to generate it.'
    );
    this.name = 'ThemeCssNotFoundError';
  }
}

export const loadDesignTokens = (): DesignTokenMap => {
  if (cachedTokens) return cachedTokens;

  const themeCss = resolveThemeCss();
  if (!themeCss) {
    throw new ThemeCssNotFoundError();
  }

  const css = extractTokenScopes(fs.readFileSync(themeCss, 'utf-8'));
  const raw: DesignTokenMap = {};
  for (const m of css.matchAll(TOKEN_DECL)) {
    raw[m[1]] = m[2].trim();
  }
  const resolved: DesignTokenMap = {};
  for (const [name, value] of Object.entries(raw)) {
    resolved[name] = resolveValue(value, raw);
  }
  cachedTokens = resolved;
  return resolved;
};

const PREFIX_TO_CSS_PROPERTIES: Record<string, string[]> = {
  color: [
    'color',
    'background-color',
    'border-color',
    'outline-color',
    'fill',
    'stroke',
  ],
  spacing: ['padding', 'margin', 'gap', 'row-gap', 'column-gap'],
  text: ['font-size'],
  radius: ['border-radius'],
  shadow: ['box-shadow'],
  size: [
    'width',
    'height',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
  ],
  font: ['font-family'],
  'line-height': ['line-height'],
  'font-weight': ['font-weight'],
  border: ['border-width'],
  opacity: ['opacity'],
  'z-index': ['z-index'],
};

export type TokenFamily = {
  prefix: string;
  cssProperties: string[];
  tokenNames: string[];
};

let cachedFamilies: TokenFamily[] | null = null;

export const discoverTokenFamilies = (): TokenFamily[] => {
  if (cachedFamilies) return cachedFamilies;

  const tokens = loadDesignTokens();
  const prefixGroups = new Map<string, string[]>();

  for (const name of Object.keys(tokens)) {
    const dashIdx = name.indexOf('-');
    if (dashIdx === -1) continue;

    let prefix = name.slice(0, dashIdx);
    const secondDash = name.indexOf('-', dashIdx + 1);
    if (secondDash !== -1) {
      const twoSegment = name.slice(0, secondDash);
      if (PREFIX_TO_CSS_PROPERTIES[twoSegment]) {
        prefix = twoSegment;
      }
    }

    let group = prefixGroups.get(prefix);
    if (!group) {
      group = [];
      prefixGroups.set(prefix, group);
    }
    group.push(name);
  }

  const families: TokenFamily[] = [];
  for (const [prefix, tokenNames] of prefixGroups) {
    const cssProperties = PREFIX_TO_CSS_PROPERTIES[prefix];
    if (!cssProperties) continue;
    families.push({ prefix, cssProperties, tokenNames });
  }

  cachedFamilies = families;
  return families;
};

export const getTrackedProperties = (): string[] => {
  const families = discoverTokenFamilies();
  const properties = new Set<string>();
  for (const family of families) {
    for (const prop of family.cssProperties) {
      properties.add(prop);
    }
  }
  return [...properties];
};

export const __resetDesignTokenCacheForTests = (): void => {
  cachedTokens = null;
  cachedFamilies = null;
};
