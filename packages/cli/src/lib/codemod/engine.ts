import MagicString from 'magic-string';
import { insertImport } from '../edit-tsx.js';
import { type AnyNode, collectImports, parseTsx, walk } from '../tsx-ast.js';
import {
  asPropertyKey,
  findThemeComponents,
  marigoldLocalName,
} from './anchor.js';
import type { Codemod, CodemodOutcome, MigrationManifest } from './types.js';

// Source-text utilities shared by the codemod primitives. Everything here is
// formatting-aware but byte-preserving: consumer code outside an edited span
// is never re-printed (magic-string), and moved code is moved verbatim.

/** parse, or return the uniform skipped outcome every primitive must honor */
export const parseOr = (
  source: string,
  run: (file: AnyNode) => CodemodOutcome
): CodemodOutcome => {
  let ast;
  try {
    ast = parseTsx(source);
  } catch (err) {
    return {
      kind: 'skipped',
      reason: `parse error: ${(err as Error).message}`,
    };
  }
  return run(ast as unknown as AnyNode);
};

export interface ThemeVisit {
  component: string;
  /** the initializer (object literal of slots, or a single cva call) */
  init: AnyNode;
  file: AnyNode;
  source: string;
  s: MagicString;
  unit: string;
  changes: string[];
  warnings: string[];
}

/**
 * The shared frame of every theme-editing primitive: cheap pre-check (the
 * anchor requires a literal `ThemeComponent` import), parse-or-skip, one
 * MagicString, a visit per anchored component, and the uniform
 * unchanged/edited outcome. `ensureCva` adds the cva import when edits
 * introduced stubs.
 */
export const themeCodemod = (
  name: string,
  visit: (ctx: ThemeVisit) => void,
  options: { ensureCva?: boolean } = {}
): Codemod => ({
  name,
  apply: source => {
    if (!source.includes('ThemeComponent')) {
      return { kind: 'unchanged', warnings: [] };
    }
    return parseOr(source, file => {
      const s = new MagicString(source);
      const unit = detectIndentUnit(source);
      const changes: string[] = [];
      const warnings: string[] = [];
      for (const { component, init } of findThemeComponents(file)) {
        visit({ component, init, file, source, s, unit, changes, warnings });
      }
      if (changes.length === 0) return { kind: 'unchanged', warnings };
      if (options.ensureCva) ensureCvaImport(s, file);
      return { kind: 'edited', output: s.toString(), changes, warnings };
    });
  },
});

/**
 * Class-string literals of a cva() argument, in source order — skipping the
 * `defaultVariants` subtree, whose values are variant names (`'default'`),
 * not classes.
 */
export const classStringsIn = (node: AnyNode): string[] => {
  const out: string[] = [];
  walk(node, n => {
    if (
      n.type === 'ObjectProperty' &&
      (n.key as AnyNode | undefined as { name?: string } | undefined)?.name ===
        'defaultVariants'
    ) {
      return false;
    }
    if (n.type === 'StringLiteral') out.push(n.value as string);
  });
  return out;
};

/** individual class utilities used across a set of class strings */
export const classTokens = (classes: string[]): Set<string> =>
  new Set(classes.flatMap(s => s.split(/\s+/)).filter(Boolean));

/** first indentation unit found in the file; two spaces when none found */
export const detectIndentUnit = (source: string): string =>
  /\n([ \t]+)\S/.exec(source)?.[1].slice(0, 4) ?? '  ';

/** leading whitespace of the line containing `offset` */
export const lineIndentAt = (source: string, offset: number): string => {
  const lineStart = source.lastIndexOf('\n', offset - 1) + 1;
  const match = /^[ \t]*/.exec(source.slice(lineStart, offset));
  return match ? match[0] : '';
};

/**
 * Re-indent manifest source (written with 2-space indentation) to the
 * consumer file's indentation: depth n at 2 spaces becomes `base` +
 * `unit` * n. The first line is left as-is (it lands mid-line).
 */
export const reindent = (text: string, unit: string, base: string): string => {
  const [first, ...rest] = text.split('\n');
  if (rest.length === 0) return text;
  const relined = rest.map(line => {
    const leading = /^ */.exec(line)![0].length;
    return base + unit.repeat(Math.floor(leading / 2)) + line.slice(leading);
  });
  return [first, ...relined].join('\n');
};

/**
 * Parse a manifest `newSource` cva-argument expression so its class strings
 * can be inspected. Returns null when the manifest source does not parse
 * (a manifest authoring error surfaced as a warning, not a crash).
 */
export const parseExpression = (expr: string): AnyNode | null => {
  try {
    const ast = parseTsx(`(${expr})`) as unknown as AnyNode;
    const body = (ast.program as { body?: AnyNode[] } | undefined)?.body;
    const statement = body?.[0];
    if (statement?.type !== 'ExpressionStatement') return null;
    return (statement.expression as AnyNode) ?? null;
  } catch {
    return null;
  }
};

/** ensure `cva` is imported from @marigold/system, inserting if needed */
export const ensureCvaImport = (s: MagicString, file: AnyNode): string => {
  const local = marigoldLocalName(file, 'cva');
  if (local) return local;
  insertImport(
    s,
    file,
    collectImports(file),
    `import { cva } from '@marigold/system';`
  );
  return 'cva';
};

/** render a list of names as `code` spans for the report */
export const codeList = (names: string[]): string =>
  names.map(name => `\`${name}\``).join(', ');

/** the empty-stub property line shared by restructure and stubbing */
export const stubSlotLine = (slot: string, indent: string): string =>
  `${indent}${asPropertyKey(slot)}: cva({}),`;

/** deep link to the default theme's styles for a component, if configured */
export const stylesReference = (
  manifest: MigrationManifest,
  component: string
): string | null =>
  manifest.stylesReferenceUrl
    ? `${manifest.stylesReferenceUrl}/${component}.styles.ts`
    : null;
