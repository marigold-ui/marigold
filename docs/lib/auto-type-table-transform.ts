/**
 * Rewrites `entry.simplifiedType` for props whose type references an alias
 * from `@marigold/system` or `@marigold/types`, so the docs' prop table shows
 * the alias name (e.g. `Scale | SpacingTokens`) instead of the bare `union`
 * label fumadocs falls back to. The form it replaces moves to `entry.type`.
 *
 * Escape hatch: a `@remarks \`...\`` tag on the prop wins — fumadocs sets
 * `simplifiedType` from the tag before this transform runs, and we skip when
 * the tag is present.
 */
import type { GenerateOptions } from 'fumadocs-typescript';

type Transformer = NonNullable<GenerateOptions['transform']>;
type Entry = Parameters<Transformer>[0];
type PropertySymbol = Parameters<Transformer>[2];
type Context = ThisParameterType<Transformer>;
type Checker = Context['checker'];
type Project = Context['program'];
type NodeHandle = PropertySymbol['declarations'][number];
type AstNode = NonNullable<ReturnType<NodeHandle['resolve']>>;

// fumadocs-typescript runs the TypeScript 7 API, which docs cannot import (it
// is on 6), so the constants and node shapes below are spelled out instead.

// NodeBuilderFlags.NoTruncation | UseFullyQualifiedType, which prints an alias
// as `import("/path").Alias`.
const FULLY_QUALIFIED = 1 | 64;

// The `prop: Wrapper['key']` chain, walked by key: only it carries all three.
type AstNodeLinks = Partial<
  Record<'type' | 'objectType' | 'typeName', AstNode>
>;

const link = (node: AstNode | undefined, key: keyof AstNodeLinks) =>
  (node as AstNodeLinks | undefined)?.[key];

const DESIGN_SYSTEM_PATH_REGEX = /\/(?:@marigold|packages)\/(?:system|types)\//;

const isFromDesignSystemPath = (filePath: string) =>
  DESIGN_SYSTEM_PATH_REGEX.test(filePath);

// `getAliasedSymbol` answers with the unknown symbol, not undefined.
const resolveAliasedSymbol = (checker: Checker, symbol: PropertySymbol) => {
  const aliased = checker.getAliasedSymbol(symbol);
  return checker.isUnknownSymbol(aliased) ? symbol : aliased;
};

const isFromDesignSystemPackage = (
  checker: Checker,
  symbol: PropertySymbol | undefined
) =>
  !!symbol &&
  resolveAliasedSymbol(checker, symbol).declarations.some(declaration =>
    isFromDesignSystemPath(declaration.path)
  );

// TS preserves alias provenance in the printed form as `import("/path").AliasName`
// even when `getAliasSymbol()` returns undefined for a flattened union.
const IMPORT_ALIAS_REGEX = /import\("([^"]+)"\)\.([A-Za-z_][A-Za-z0-9_]*)/g;

const collectDesignSystemAliasesFromText = (text: string): string[] => {
  const seen = new Set<string>();
  for (const [, filePath, name] of text.matchAll(IMPORT_ALIAS_REGEX)) {
    if (isFromDesignSystemPath(filePath)) seen.add(name);
  }
  return Array.from(seen);
};

// Fallback for when TS has flattened an indexed access to literals
// (e.g. `WidthProp['width']` → `'auto' | 'full' | ...`). Surfaces the
// wrapper type name when its declaration lives in a design-system package.
const getIndexedAccessWrapperName = (
  checker: Checker,
  program: Project,
  propertySymbol: PropertySymbol
): string | undefined => {
  for (const declaration of propertySymbol.declarations) {
    const typeName = link(
      link(link(declaration.resolve(program), 'type'), 'objectType'),
      'typeName'
    );
    if (!typeName) continue;
    if (
      !isFromDesignSystemPackage(checker, checker.getSymbolAtLocation(typeName))
    )
      continue;

    return (typeName as { text?: string }).text;
  }
  return undefined;
};

const promoteExpanded = (entry: Entry, summary: string) => {
  entry.type = entry.simplifiedType;
  entry.simplifiedType = summary;
};

export const autoTypeTableTransform: Transformer = function (
  entry,
  propertyType,
  propertySymbol
) {
  if (entry.tags.some(t => t.name === 'remarks')) return;

  const printed = this.checker.typeToString(
    propertyType,
    undefined,
    FULLY_QUALIFIED
  );

  const aliases = collectDesignSystemAliasesFromText(printed);
  if (aliases.length > 0) {
    promoteExpanded(entry, aliases.join(' | '));
    return;
  }

  const wrapperName = getIndexedAccessWrapperName(
    this.checker,
    this.program,
    propertySymbol
  );
  if (wrapperName) promoteExpanded(entry, wrapperName);
};
