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
  // Populated when the type is a union that contains at least one string
  // literal — e.g. 'primary' | 'secondary' | (string & {}).
  knownValues?: string[];
  // True when the union also contains a widening member such as
  // `(string & {})` or plain `string`. The literals are then suggestions,
  // not a closed contract — a value outside them does not violate the type,
  // so the prop validator must not report it as an error. The theme-variant
  // check covers those props with a warning instead.
  openValues?: boolean;
};

export type ComponentInfo = {
  name: string;
  props: ComponentPropInfo[];
  subComponents: string[];
  subComponentProps: Map<string, ComponentPropInfo[]>;
  // Derived from the type contract: the component (or one of its
  // sub-components) declares the React Aria collection API's `items` prop, so
  // it renders a variable number of entries by design. Used to suppress
  // duplicate-sub-component warnings without a hand-maintained name list.
  collection: boolean;
};

const require = createRequire(import.meta.url);

let cachedRegistry: Map<string, ComponentInfo> | null = null;
let cachedSource: SourceFile | null = null;

const COMPONENT_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

const findMarigoldComponentsDts = (): string => {
  // `@marigold/components` does not expose `package.json` in its `exports`
  // map, so we walk up from the resolved entry point until we find the
  // package directory, then use the canonical dist path.
  let entry: string;
  try {
    entry = require.resolve('@marigold/components');
  } catch {
    throw new Error(
      '@marigold/components is not installed (or not resolvable from here). The validator derives its component schema from its type declarations — install it with `pnpm add @marigold/components`.'
    );
  }
  let dir = path.dirname(entry);
  while (dir !== path.dirname(dir)) {
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      // Only accept the package.json that actually belongs to
      // @marigold/components. Without the name check, a nested package.json on
      // the resolved path (e.g. a bundled sub-package) would be mistaken for
      // the package root and we'd look for dist/ in the wrong place. Mirrors
      // the name-verified walk-up in spatial/renderer.ts::findPackageDir.
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

// Extract string literal values from a type that may be a union like
// 'primary' | 'secondary' | (string & {}) | undefined.
// Returns undefined when there are no string literals in the type at all.
// `open` marks a widened union (see acceptsAnyString): the literals are
// then not a closed contract, so a value outside them is not a type error.
const extractKnownValues = (
  type: Type
): { values: string[]; open: boolean } | undefined => {
  const unionTypes = type.isUnion() ? type.getUnionTypes() : [type];
  const literals = unionTypes
    .filter(t => t.isStringLiteral())
    .map(t => t.getLiteralValue())
    // getLiteralValue() is typed string | number | PseudoBigInt; the
    // isStringLiteral() filter guarantees string, this narrows it soundly
    // (no cast) and drops any non-string defensively.
    .filter((v): v is string => typeof v === 'string');
  if (literals.length === 0) return undefined;
  return { values: literals, open: unionTypes.some(acceptsAnyString) };
};

const propertiesFromType = (type: Type): ComponentPropInfo[] => {
  // `getProperties()` includes inherited members from `extends` and `Omit`,
  // so a Button declared as `interface ButtonProps extends Omit<RAC.ButtonProps, X>`
  // returns the merged surface area we actually want to validate against.
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

// Resolve the `${componentName}Props` type via the module's exported
// declarations, which follow re-exports to the real interface/alias wherever it
// lives. The build ships dist/index.d.mts as a thin re-export barrel (no inlined
// type bodies), so searching only that file with getInterface/getTypeAlias
// finds nothing; getExportedDeclarations resolves through the barrel to the
// definition in its source module. Falls back to a direct lookup on the file
// for a fully-inlined rollup.
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

  // No separately-exported `${componentName}Props` — some components (e.g.
  // CloseButton, IconButton, Split, VisuallyHidden) declare their prop type
  // inline as the component function's own parameter type instead of a named
  // export. Fall back to the call signature's first parameter, mirroring
  // extractSubComponentData's identical fallback below for sub-components.
  // Without this, these components silently resolved to `props: []`, and
  // props.ts's `props.length > 0` guard then skipped prop validation for
  // them entirely — a silent false negative on real, checkable components.
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

      // {Parent}{Sub} → {Parent}.{Sub}
      // e.g. TableHeader → Table.Header, DialogTrigger → Dialog.Trigger
      addEntry(parentName + sub, dotForm);

      // Standalone sub-component name → {Parent}.{Sub}
      // e.g. Row → Table.Row, TabPanel → Tabs.TabPanel
      addEntry(sub, dotForm);
    }
  }

  cachedSubComponentLookup = lookup;
  return lookup;
};

export const findSubComponentSuggestion = (
  tagName: string
): string[] | undefined => buildSubComponentLookup().get(tagName);

export const __resetRegistryCacheForTests = (): void => {
  cachedRegistry = null;
  cachedSource = null;
  cachedSubComponentLookup = null;
};

/**
 * Build a resolver that maps a JSX tag identifier *as written in the source*
 * to the real `@marigold/components` symbol it refers to.
 *
 * It walks the source's import declarations once and records ONLY bindings
 * imported from the exact module specifier `@marigold/components` whose
 * original (pre-alias) name is a real registry component:
 *   `import { Button }            from '@marigold/components'`  → Button → Button
 *   `import { Button as Btn }     from '@marigold/components'`  → Btn    → Button
 *
 * Local shadows (`import { Button } from './ui/Button'`, `function Button(){}`)
 * and third-party imports are NOT recorded, so callers can early-return for any
 * tag the resolver does not know — eliminating the false "Prop X does not
 * exist" errors that arise from validating a non-Marigold tag against the
 * Marigold prop schema purely by name.
 *
 * Note: this reads import statements directly via the TS AST rather than via
 * `collectImports` (helpers/jsx.ts), because the latter discards the alias
 * original name (it pushes `el.name.text`), which we need here.
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
      // `propertyName` is set only for aliased imports (`{ Name as Alias }`),
      // in which case `el.name` is the local alias and `propertyName` the
      // original imported name. For non-aliased imports, `el.name` is both.
      const originalName = (el.propertyName ?? el.name).text;
      const localName = el.name.text;
      if (!isMarigoldComponent(originalName)) continue;
      resolver.set(localName, originalName);
    }
  }

  return resolver;
};

// HTML event handlers that should be replaced by their React Aria equivalent.
// Curated, doc-justified allowlist — NOT auto-derived from "both names exist on
// the type" (that over-fires, mirroring the boolean-shadow problem).
// `onClick`→`onPress`/`onAction` is a genuine React Aria anti-pattern: Marigold
// pressables expose `onPress`, never `onClick`.
//
// `onChange` is deliberately NOT a shadow source: Marigold *renames* React Aria
// handlers to `onChange` as its public API (e.g. ComboBox exposes `onChange` ≙
// `onInputChange`; Autocomplete/DatePicker likewise expose `onChange`), and
// `onChange` vs `onSelectionChange`/`onOpenChange`/`onInputChange` are DIFFERENT
// interactions, not synonyms — so flagging `onChange` was a false positive on
// idiomatic usage. If a component does NOT expose `onChange`, the prop-validator
// already reports it as an unknown prop, so nothing real is lost here.
const HANDLER_PREFERRED_ALTERNATIVES: ReadonlyArray<[string, string]> = [
  ['onClick', 'onPress'],
  ['onClick', 'onAction'],
  ['onSubmit', 'onAction'],
];

/**
 * For a component, find event handler pairs where an HTML handler
 * coexists with a more-specific React Aria handler for the same
 * interaction.  Returns a map of htmlHandler → reactAriaHandler.
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

// Boolean prop pairs where the non-prefixed HTML-ism should be replaced by the
// is-prefixed React Aria prop. This is a doc-justified ALLOWLIST, not an
// auto-derived `x`/`isX` pair list: auto-derivation over-fires on legitimate
// alias props. Probing the real @marigold/components .d.mts, the only auto-pairs
// the old loop produced were `open`/`isOpen` and `dismissable`/`isDismissable`
// (Modal — both are genuine Marigold convenience aliases, so warning was a false
// positive) and `readOnly`/`isReadOnly` (the documented React Aria naming
// convention). Only the latter is a real shadow. Add new pairs here only when
// backed by docs; when unsure, leave them out (these are warnings — err fewer).
const BOOLEAN_PREFERRED_ALTERNATIVES: ReadonlyArray<[string, string]> = [
  ['readOnly', 'isReadOnly'],
];

/**
 * For a component, find boolean prop pairs from the doc-justified allowlist
 * where BOTH the HTML-ism and its is-prefixed React Aria equivalent exist.
 * Returns a map of htmlProp → reactAriaProp (e.g. readOnly → isReadOnly).
 */
export const getBooleanShadows = (
  componentName: string
): Map<string, string> => {
  const info = loadMarigoldRegistry().get(componentName);
  if (!info) return new Map();

  const propNames = new Set(info.props.map(p => p.name));
  const shadows = new Map<string, string>();

  for (const [htmlProp, ariaProp] of BOOLEAN_PREFERRED_ALTERNATIVES) {
    if (propNames.has(htmlProp) && propNames.has(ariaProp)) {
      if (!shadows.has(htmlProp)) {
        shadows.set(htmlProp, ariaProp);
      }
    }
  }

  return shadows;
};
