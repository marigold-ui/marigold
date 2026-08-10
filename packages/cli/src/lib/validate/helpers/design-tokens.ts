import fs from 'node:fs';
import path from 'node:path';
import { resolveThemeCss, setThemeResolutionRootRaw } from './resolve-theme.js';

export type DesignTokenMap = Record<string, string>;

let cachedTokens: DesignTokenMap | null = null;

// The public entry point (callers import this, not resolve-theme.js): this
// module caches its derived result globally with no key of its own, so a root
// change must invalidate cachedTokens/cachedFamilies too — otherwise a second
// project validated in the same process reads back the first one's tokens.
export const setThemeResolutionRoot = (dir: string): void => {
  if (setThemeResolutionRootRaw(dir)) resetDesignTokenCache();
};

// The value class deliberately allows newlines: theme-rui writes multi-layer
// shadow tokens across several lines with one trailing `;`, so excluding `\n`
// would truncate the value at the first line break.
const TOKEN_DECL = /--([a-zA-Z0-9_-]+):\s*([^;}]+);?/g;

// Matches a local (`./`, `../`) `@import`, either the bare-string form
// (`@import './x.css';`) or the `url(...)` form (`@import url('./x.css');`),
// each optionally followed by trailing media descriptors before the `;`
// (`@import './x.css' screen;`). Group 1 captures the url() path, group 2 the
// bare-string path — exactly one of the two is set per match.
const LOCAL_IMPORT =
  /@import\s+(?:url\(\s*['"]?(\.\.?\/[^'")]+)['"]?\s*\)|['"](\.\.?\/[^'"]+)['"])[^;]*;?/g;

// theme-rui's theme.css declares no tokens itself and only `@import`s the
// partials that do, so reading it verbatim yields zero tokens. Inline every
// local `@import` recursively, relative to the importing file, so the result
// contains the `@theme`/`:root` blocks the scan looks for. `seen` guards
// against reaching one file through two import paths.
export const resolveCssImports = (
  cssPath: string,
  seen = new Set<string>()
): string => {
  const absolute = path.resolve(cssPath);
  if (seen.has(absolute)) return '';
  seen.add(absolute);
  const dir = path.dirname(absolute);
  // A theme.css that survives the existence check but `@import`s a missing
  // partial must degrade per-file rather than throw out of the whole load, so
  // only that partial's tokens go missing.
  //
  // Narrowed to ENOENT, not a blanket catch: this also reads the top-level
  // theme.css, so a genuine EACCES/EISDIR there is an environment
  // misconfiguration that must still surface (as a warning, via the caller's
  // catch-all) instead of silently yielding an empty token map.
  let raw: string;
  try {
    raw = fs.readFileSync(absolute, 'utf-8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return '';
    throw err;
  }
  return raw.replace(
    LOCAL_IMPORT,
    (_match, urlPath: string | undefined, quotedPath: string | undefined) =>
      resolveCssImports(path.join(dir, (urlPath ?? quotedPath)!), seen)
  );
};

// Restrict extraction to `:root` / `@theme` blocks: a custom property declared
// inside a component selector is not a token, and hoisting it into the global
// map could collide with a real token of the same name. theme-rui emits every
// token inside `@theme static { … }`, so this keeps all of them today while
// staying robust to future non-token `--vars`. Falls back to the whole file
// when neither block exists.
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

  const css = extractTokenScopes(resolveCssImports(themeCss));
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

export const resetDesignTokenCache = (): void => {
  cachedTokens = null;
  cachedFamilies = null;
};
