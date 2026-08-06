import {
  type ExportedDeclarations,
  Project,
  type SourceFile,
  type Type,
} from 'ts-morph';
import ts from 'typescript';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

export type ComponentPropInfo = {
  name: string;
  type: string;
  optional: boolean;
  // String literal values extracted from the union type, if any.
  knownValues?: string[];
  // The union also allows arbitrary strings, so `knownValues` is a set of
  // suggestions rather than a closed contract.
  openValues?: boolean;
};

export type ComponentInfo = {
  name: string;
  props: ComponentPropInfo[];
  subComponents: string[];
  subComponentProps: Map<string, ComponentPropInfo[]>;
  // The component or a sub-component declares React Aria's `items` prop, so it
  // renders a variable number of entries by design. Suppresses
  // duplicate-sub-component warnings without a hand-maintained name list.
  collection: boolean;
};

const require = createRequire(import.meta.url);

// Set once per `validate()` so resolution prefers the target project's own
// dependency tree. Without it a globally-installed `marigold` resolves
// `@marigold/components` relative to itself — which it never depends on — and
// every static check silently degrades.
let resolutionRoot: string | undefined;

// validate() is also a programmatic engine: an agent correction loop can
// validate files from two projects in one process. The caches below key on
// nothing but "has the registry loaded", so clearing them when the root
// changes keys them on the root implicitly.
export const setComponentResolutionRoot = (dir: string): void => {
  if (dir === resolutionRoot) return;
  resolutionRoot = dir;
  resetComponentRegistryCache();
};

let cachedRegistry: Map<string, ComponentInfo> | null = null;
let cachedSource: SourceFile | null = null;

const COMPONENT_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

const resolveMarigoldComponentsEntry = (): string => {
  if (resolutionRoot) {
    try {
      return require.resolve('@marigold/components', {
        paths: [resolutionRoot],
      });
    } catch {
      // Not resolvable from the target project either — fall through to the
      // CLI-relative attempt (covers the monorepo's own fixtures).
    }
  }
  return require.resolve('@marigold/components');
};

const findMarigoldComponentsDts = (): string => {
  // The package doesn't expose `package.json` in its `exports` map, so walk up
  // from the resolved entry to the package dir and use the canonical dist path.
  let entry: string;
  try {
    entry = resolveMarigoldComponentsEntry();
  } catch {
    throw new Error(
      '@marigold/components is not installed (or not resolvable from here). The validator derives its component schema from its type declarations — install it with `pnpm add @marigold/components`.'
    );
  }
  let dir = path.dirname(entry);
  while (dir !== path.dirname(dir)) {
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      // Without the name check, a nested package.json on the resolved path
      // would be mistaken for the package root and put dist/ in the wrong
      // place. Mirrors findPackageDir in spatial/renderer.ts.
      let name: string | undefined;
      try {
        name = (JSON.parse(fs.readFileSync(pkg, 'utf-8')) as { name?: string })
          .name;
      } catch {
        // Unreadable/malformed package.json — keep walking up.
      }
      if (name === '@marigold/components') {
        const candidate = path.join(dir, 'dist', 'index.d.mts');
        if (fs.existsSync(candidate)) return candidate;
        throw new Error(
          `@marigold/components is installed at ${dir} but its dist/index.d.mts is missing. Run \`pnpm --filter @marigold/components build\`.`
        );
      }
    }
    dir = path.dirname(dir);
  }
  throw new Error('Could not locate @marigold/components package directory.');
};

const loadDtsSource = (): SourceFile => {
  if (cachedSource) return cachedSource;
  const dts = findMarigoldComponentsDts();
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: false,
    compilerOptions: {
      noEmit: true,
      declaration: true,
      skipLibCheck: true,
      strict: false,
      // Bundler resolution handles the package's `.d.mts` re-export barrel.
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  });
  cachedSource = project.addSourceFileAtPath(dts);
  return cachedSource;
};

// A union member that accepts arbitrary strings widens the literal set:
// plain `string`, or the autocomplete-preserving `(string & {})` idiom.
const acceptsAnyString = (t: Type): boolean => {
  if (t.isStringLiteral()) return false;
  if (t.isString()) return true;
  if (t.isIntersection())
    return t.getIntersectionTypes().some(m => m.isString());
  return false;
};

// Extract string literals from a union like 'primary' | (string & {}).
// Undefined when the type holds no literals at all. `open` marks a widened
// union: a value outside the literals is then not a type error.
const extractKnownValues = (
  type: Type
): { values: string[]; open: boolean } | undefined => {
  const unionTypes = type.isUnion() ? type.getUnionTypes() : [type];
  const literals = unionTypes
    .filter(t => t.isStringLiteral())
    .map(t => t.getLiteralValue())
    // getLiteralValue() is string | number | PseudoBigInt; narrows without a
    // cast, since isStringLiteral() already guarantees string.
    .filter((v): v is string => typeof v === 'string');
  if (literals.length === 0) return undefined;
  return { values: literals, open: unionTypes.some(acceptsAnyString) };
};

const propertiesFromType = (type: Type): ComponentPropInfo[] => {
  // getProperties() includes members inherited via `extends`/`Omit`, giving
  // the merged surface we want to validate against.
  return type.getProperties().map(symbol => {
    const declarations = symbol.getDeclarations();
    const declaration = declarations[0];
    const declaredType = declaration?.getType() ?? symbol.getDeclaredType();
    const known = extractKnownValues(declaredType);
    return {
      name: symbol.getName(),
      type: declaredType.getText().slice(0, 200),
      optional: symbol.isOptional(),
      knownValues: known?.values,
      openValues: known?.open,
    };
  });
};

// Resolve `${componentName}Props` via exported declarations, which follow
// re-exports to the real definition. dist/index.d.mts is a thin barrel with no
// inlined type bodies, so getInterface/getTypeAlias on that file alone finds
// nothing. Falls back to a direct lookup for a fully-inlined rollup.
const extractPropsFor = (
  source: SourceFile,
  exports: ReadonlyMap<string, ExportedDeclarations[]>,
  componentName: string,
  declarations: ExportedDeclarations[]
): ComponentPropInfo[] => {
  const propsName = `${componentName}Props`;

  for (const decl of exports.get(propsName) ?? []) {
    const props = propertiesFromType(decl.getType());
    if (props.length > 0) return props;
  }

  const iface = source.getInterface(propsName);
  if (iface) return propertiesFromType(iface.getType());

  const alias = source.getTypeAlias(propsName);
  if (alias) return propertiesFromType(alias.getType());

  // Some components (CloseButton, IconButton, Split, VisuallyHidden) declare
  // props inline as the function's parameter type instead of a named export.
  // Without this fallback they resolve to `props: []` and props.ts's
  // `props.length > 0` guard skips them — a silent false negative.
  for (const decl of declarations) {
    const signatures = decl.getType().getCallSignatures();
    if (signatures.length === 0) continue;
    const params = signatures[0].getParameters();
    if (params.length === 0) continue;
    const paramDecl = params[0].getDeclarations()[0];
    if (!paramDecl) continue;
    const props = propertiesFromType(paramDecl.getType());
    if (props.length > 0) return props;
  }

  return [];
};

type SubComponentData = {
  names: string[];
  props: Map<string, ComponentPropInfo[]>;
};

const extractSubComponentData = (
  declarations: ExportedDeclarations[]
): SubComponentData => {
  const names: string[] = [];
  const props = new Map<string, ComponentPropInfo[]>();

  for (const decl of declarations) {
    for (const prop of decl.getType().getProperties()) {
      const name = prop.getName();
      if (!COMPONENT_NAME_PATTERN.test(name)) continue;
      names.push(name);

      if (props.has(name)) continue;

      const propType = prop.getTypeAtLocation(decl);
      const signatures = propType.getCallSignatures();
      if (signatures.length > 0) {
        const params = signatures[0].getParameters();
        if (params.length > 0) {
          const paramDecl = params[0].getDeclarations()[0];
          if (paramDecl) {
            props.set(name, propertiesFromType(paramDecl.getType()));
          }
        }
      }
    }
  }
  return { names: [...new Set(names)], props };
};

// A real dist exports well over a hundred components. A present-but-partial
// one (a truncated build, or a ts-morph upgrade dropping exports) would leave
// the registry near-empty without signaling failure, and every checker that
// resolves tags through it would then read genuine Marigold imports as
// unresolvable, mass-erroring valid code as hallucinated. Treating it as a
// load failure routes it through the same degrade-to-warning path as a
// missing dist.
const MIN_PLAUSIBLE_REGISTRY_SIZE = 20;

// Exported so the threshold is testable without fabricating a truncated dist.
export const isImplausiblySmallRegistry = (size: number): boolean =>
  size <= MIN_PLAUSIBLE_REGISTRY_SIZE;

export const loadMarigoldRegistry = (): Map<string, ComponentInfo> => {
  if (cachedRegistry) return cachedRegistry;

  const source = loadDtsSource();
  const registry = new Map<string, ComponentInfo>();
  const allExports = source.getExportedDeclarations();

  for (const [exportedName, declarations] of allExports) {
    if (!COMPONENT_NAME_PATTERN.test(exportedName)) continue;
    if (exportedName.endsWith('Props')) continue;
    if (registry.has(exportedName)) continue;

    const isCallable = declarations.some(
      d => d.getType().getCallSignatures().length > 0
    );
    if (!isCallable) continue;

    const props = extractPropsFor(
      source,
      allExports,
      exportedName,
      declarations
    );
    const subData = extractSubComponentData(declarations);
    const hasItems = (list: ComponentPropInfo[]): boolean =>
      list.some(p => p.name === 'items');
    registry.set(exportedName, {
      name: exportedName,
      props,
      subComponents: subData.names,
      subComponentProps: subData.props,
      collection: hasItems(props) || [...subData.props.values()].some(hasItems),
    });
  }

  if (isImplausiblySmallRegistry(registry.size)) {
    throw new Error(
      `@marigold/components dist/index.d.mts loaded but yielded only ${registry.size} component(s) — a real build exports well over a hundred, so this dist looks truncated or malformed. Rebuild with \`pnpm --filter @marigold/components build\`.`
    );
  }

  cachedRegistry = registry;
  return registry;
};

export const isMarigoldComponent = (name: string): boolean =>
  loadMarigoldRegistry().has(name);

export const getComponentProps = (
  name: string
): ComponentPropInfo[] | undefined => loadMarigoldRegistry().get(name)?.props;

export const getSubComponents = (name: string): string[] | undefined =>
  loadMarigoldRegistry().get(name)?.subComponents;

export const isCompoundComponent = (name: string): boolean => {
  const info = loadMarigoldRegistry().get(name);
  return info !== undefined && info.subComponents.length > 0;
};

export const isCollectionComponent = (name: string): boolean =>
  loadMarigoldRegistry().get(name)?.collection ?? false;

export const getSubComponentProps = (
  parentName: string,
  subName: string
): ComponentPropInfo[] | undefined =>
  loadMarigoldRegistry().get(parentName)?.subComponentProps.get(subName);

export const isMarigoldSubComponent = (
  parentName: string,
  subName: string
): boolean => {
  const info = loadMarigoldRegistry().get(parentName);
  return info !== undefined && info.subComponents.includes(subName);
};

let cachedSubComponentLookup: Map<string, string[]> | null = null;

const buildSubComponentLookup = (): Map<string, string[]> => {
  if (cachedSubComponentLookup) return cachedSubComponentLookup;

  const lookup = new Map<string, string[]>();
  const registry = loadMarigoldRegistry();

  const addEntry = (key: string, dotForm: string): void => {
    const existing = lookup.get(key);
    if (existing) {
      if (!existing.includes(dotForm)) existing.push(dotForm);
    } else {
      lookup.set(key, [dotForm]);
    }
  };

  for (const [parentName, info] of registry) {
    for (const sub of info.subComponents) {
      const dotForm = `${parentName}.${sub}`;

      // {Parent}{Sub} → {Parent}.{Sub}, e.g. TableHeader → Table.Header
      addEntry(parentName + sub, dotForm);

      // Standalone sub-component name, e.g. Row → Table.Row
      addEntry(sub, dotForm);
    }
  }

  cachedSubComponentLookup = lookup;
  return lookup;
};

export const findSubComponentSuggestion = (
  tagName: string
): string[] | undefined => buildSubComponentLookup().get(tagName);

export const resetComponentRegistryCache = (): void => {
  cachedRegistry = null;
  cachedSource = null;
  cachedSubComponentLookup = null;
};

/**
 * Map a JSX tag identifier *as written in the source* to the real
 * `@marigold/components` symbol it refers to:
 *   `import { Button }        from '@marigold/components'` → Button → Button
 *   `import { Button as Btn } from '@marigold/components'` → Btn    → Button
 *
 * Local shadows and third-party imports are not recorded, so callers can
 * early-return for unknown tags instead of validating them against the
 * Marigold prop schema by name alone.
 *
 * Reads the TS AST directly rather than via `collectImports` (helpers/jsx.ts),
 * which discards the alias's original name.
 */
export const buildMarigoldTagResolver = (
  source: ts.SourceFile
): Map<string, string> => {
  const resolver = new Map<string, string>();

  for (const stmt of source.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    if (!ts.isStringLiteral(stmt.moduleSpecifier)) continue;
    if (stmt.moduleSpecifier.text !== '@marigold/components') continue;

    const bindings = stmt.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;

    for (const el of bindings.elements) {
      // `propertyName` is set only for aliased imports; then `el.name` is the
      // local alias. For non-aliased imports `el.name` is both.
      const originalName = (el.propertyName ?? el.name).text;
      const localName = el.name.text;
      if (!isMarigoldComponent(originalName)) continue;
      resolver.set(localName, originalName);
    }
  }

  return resolver;
};

// HTML event handlers to replace with their React Aria equivalent. Curated,
// not auto-derived from "both names exist on the type" (that over-fires).
//
// `onChange` is deliberately absent: Marigold *renames* React Aria handlers to
// `onChange` as its public API, and `onChange` vs `onSelectionChange`/
// `onOpenChange` are different interactions, not synonyms. A component that
// doesn't expose `onChange` is already caught by the prop validator.
const HANDLER_PREFERRED_ALTERNATIVES: ReadonlyArray<[string, string]> = [
  ['onClick', 'onPress'],
  ['onClick', 'onAction'],
  ['onSubmit', 'onAction'],
];

/**
 * Event handler pairs where an HTML handler coexists with a more-specific
 * React Aria one. Returns htmlHandler → reactAriaHandler.
 */
export const getHandlerShadows = (
  componentName: string
): Map<string, string> => {
  const info = loadMarigoldRegistry().get(componentName);
  if (!info) return new Map();

  const propNames = new Set(info.props.map(p => p.name));
  const shadows = new Map<string, string>();

  for (const [htmlHandler, ariaHandler] of HANDLER_PREFERRED_ALTERNATIVES) {
    if (propNames.has(htmlHandler) && propNames.has(ariaHandler)) {
      // First match wins — earlier entries have higher priority
      if (!shadows.has(htmlHandler)) {
        shadows.set(htmlHandler, ariaHandler);
      }
    }
  }

  return shadows;
};

// A boolean equivalent (x → isX) was tried and dropped: no pair in the real
// registry ever qualified, and auto-deriving one over-fires on genuine aliases
// (Modal's `open`/`isOpen`). Re-add only once a real pair shows up —
// boolean-shadows.tsx and props.test.ts's RadioGroup case guard it either way.
