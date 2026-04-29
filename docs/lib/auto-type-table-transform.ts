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
type Entry = Parameters<Transformer>[0];

const DESIGN_SYSTEM_PATH_REGEX = /\/(?:@marigold|packages)\/(?:system|types)\//;

const isFromDesignSystemPath = (filePath: string) =>
  DESIGN_SYSTEM_PATH_REGEX.test(filePath);

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

  const aliases = collectDesignSystemAliasesFromText(propertyType.getText());
  if (aliases.length > 0) {
    promoteExpanded(entry, aliases.join(' | '));
    return;
  }

  const wrapperName = getIndexedAccessWrapperName(propertySymbol);
  if (wrapperName) promoteExpanded(entry, wrapperName);
};
