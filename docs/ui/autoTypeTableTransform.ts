/**
 * Rewrites `entry.simplifiedType` for props whose type references an alias
 * from `@marigold/system` or `@marigold/types`, so the docs' prop table shows
 * the alias name (e.g. `Scale | SpacingTokens`) instead of the full expanded
 * literal union. The full expanded form remains available on row expand via
 * fumadocs' `entry.type`.
 *
 * Escape hatch: a `@remarks \`...\`` tag on the prop wins — fumadocs sets
 * `simplifiedType` from the tag before this transform runs, and we skip when
 * the tag is present.
 */
import type { GenerateOptions } from 'fumadocs-typescript';
import { Node, type Symbol as TsMorphSymbol } from 'ts-morph';

type Transformer = NonNullable<GenerateOptions['transform']>;

const DESIGN_SYSTEM_PATH_PATTERNS = [
  '/packages/system/',
  '/packages/types/',
  '/@marigold/system/',
  '/@marigold/types/',
];

const isFromDesignSystemPath = (filePath: string) =>
  DESIGN_SYSTEM_PATH_PATTERNS.some(p => filePath.includes(p));

/**
 * Follows import-alias chains so `WidthProp` resolved from a local
 * `import type { WidthProp } from '@marigold/system'` statement yields the
 * original declaration in `@marigold/system`, not the local ImportSpecifier.
 */
const resolveAliasedSymbol = (
  symbol: TsMorphSymbol | undefined
): TsMorphSymbol | undefined => {
  if (!symbol) return undefined;
  const aliased = symbol.getAliasedSymbol?.();
  return aliased ?? symbol;
};

const isFromDesignSystemPackage = (symbol: TsMorphSymbol | undefined) => {
  const resolved = resolveAliasedSymbol(symbol);
  return !!resolved
    ?.getDeclarations()
    .some(d => isFromDesignSystemPath(d.getSourceFile().getFilePath()));
};

/**
 * Extracts design-system alias names from a type's default printed form, which
 * looks like `import("/path/to/pkg").AliasName`. TS preserves alias provenance
 * in this text even when `getAliasSymbol()` returns undefined for a flattened
 * union — making this more reliable than walking `type.getUnionTypes()`.
 *
 * Preserves first-seen order of each alias and returns the deduped list.
 */
const IMPORT_ALIAS_REGEX = /import\("([^"]+)"\)\.([A-Za-z_][A-Za-z0-9_]*)/g;

const collectDesignSystemAliasesFromText = (text: string): string[] => {
  const names: string[] = [];
  for (const match of text.matchAll(IMPORT_ALIAS_REGEX)) {
    const [, filePath, name] = match;
    if (!isFromDesignSystemPath(filePath)) continue;
    if (!names.includes(name)) names.push(name);
  }
  return names;
};

/**
 * When the resolved type has been flattened to literals (e.g. `WidthProp['width']`
 * resolves to `'auto' | 'full' | ...` with no surviving alias reference), fall
 * back to the wrapper name written by the author. Only applies when the
 * wrapper's declaration lives in a design-system package.
 */
const getIndexedAccessWrapperName = (
  propertySymbol: TsMorphSymbol
): string | undefined => {
  for (const decl of propertySymbol.getDeclarations()) {
    if (!Node.isPropertySignature(decl)) continue;
    const typeNode = decl.getTypeNode();
    if (!typeNode || !Node.isIndexedAccessTypeNode(typeNode)) continue;

    const objectTypeNode = typeNode.getObjectTypeNode();
    if (!Node.isTypeReference(objectTypeNode)) continue;

    const typeName = objectTypeNode.getTypeName();
    if (!isFromDesignSystemPackage(typeName.getSymbol())) continue;

    return typeName.getText();
  }
  return undefined;
};

export const autoTypeTableTransform: Transformer = function (
  entry,
  propertyType,
  propertySymbol
) {
  // Escape hatch — per-prop `@remarks` override wins.
  if (entry.tags.some(t => t.name === 'remarks')) return;

  // Primary path: extract alias references that TS preserved in the default
  // print form of the resolved type, filtered to our design-system packages.
  const resolvedText = propertyType.getText();
  const aliases = collectDesignSystemAliasesFromText(resolvedText);
  if (aliases.length > 0) {
    // `simplifiedType` currently holds fumadocs' literal-expanded form
    // (`getSimpleForm` recurses through union members, which no longer carry
    // alias symbols after TS flattens them). Move it into `type` so the
    // collapsible row shows the concrete values, and put the alias names in
    // the cell.
    entry.type = entry.simplifiedType;
    entry.simplifiedType = aliases.join(' | ');
    return;
  }

  // Fallback: TS flattened an indexed access to literals so the alias was lost
  // in the resolved type. Surface the wrapper name in the cell; the current
  // `simplifiedType` already holds the literal expansion, so copy it into
  // `type` to keep the collapsible view meaningful.
  const wrapperName = getIndexedAccessWrapperName(propertySymbol);
  if (wrapperName) {
    entry.type = entry.simplifiedType;
    entry.simplifiedType = wrapperName;
  }
};
