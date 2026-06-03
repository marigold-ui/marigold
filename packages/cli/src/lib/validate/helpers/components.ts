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
};

export type ComponentInfo = {
  name: string;
  props: ComponentPropInfo[];
  subComponents: string[];
  subComponentProps: Map<string, ComponentPropInfo[]>;
};

const require = createRequire(import.meta.url);

let cachedRegistry: Map<string, ComponentInfo> | null = null;
let cachedSource: SourceFile | null = null;

const COMPONENT_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

const findMarigoldComponentsDts = (): string => {
  // `@marigold/components` does not expose `package.json` in its `exports`
  // map, so we walk up from the resolved entry point until we find the
  // package directory, then use the canonical dist path.
  const entry = require.resolve('@marigold/components');
  let dir = path.dirname(entry);
  while (dir !== path.dirname(dir)) {
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      const candidate = path.join(dir, 'dist', 'index.d.mts');
      if (fs.existsSync(candidate)) return candidate;
      throw new Error(
        `@marigold/components is installed at ${dir} but its dist/index.d.mts is missing. Run \`pnpm --filter @marigold/components build\`.`
      );
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
      moduleResolution: 100, // ts.ModuleResolutionKind.Bundler — works for d.mts
    },
  });
  cachedSource = project.addSourceFileAtPath(dts);
  return cachedSource;
};

// Extract string literal values from a type that may be a union like
// 'primary' | 'secondary' | (string & {}) | undefined.
// Returns undefined when there are no string literals in the type at all.
const extractKnownValues = (type: Type): string[] | undefined => {
  const unionTypes = type.isUnion() ? type.getUnionTypes() : [type];
  const literals = unionTypes
    .filter(t => t.isStringLiteral())
    .map(t => t.getLiteralValue() as string);
  return literals.length > 0 ? literals : undefined;
};

const propertiesFromType = (type: Type): ComponentPropInfo[] => {
  // `getProperties()` includes inherited members from `extends` and `Omit`,
  // so a Button declared as `interface ButtonProps extends Omit<RAC.ButtonProps, X>`
  // returns the merged surface area we actually want to validate against.
  return type.getProperties().map(symbol => {
    const declarations = symbol.getDeclarations();
    const declaration = declarations[0];
    const declaredType = declaration?.getType() ?? symbol.getDeclaredType();
    return {
      name: symbol.getName(),
      type: declaredType.getText().slice(0, 200),
      optional: symbol.isOptional(),
      knownValues: extractKnownValues(declaredType),
    };
  });
};

const extractPropsFor = (
  source: SourceFile,
  componentName: string
): ComponentPropInfo[] => {
  const propsName = `${componentName}Props`;

  const iface = source.getInterface(propsName);
  if (iface) return propertiesFromType(iface.getType());

  const alias = source.getTypeAlias(propsName);
  if (alias) return propertiesFromType(alias.getType());

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

    const props = extractPropsFor(source, exportedName);
    const subData = extractSubComponentData(declarations);
    registry.set(exportedName, {
      name: exportedName,
      props,
      subComponents: subData.names,
      subComponentProps: subData.props,
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

// Maps HTML event handlers to their React Aria equivalents.
// Each entry means: if the component has the React Aria handler,
// prefer it over the HTML one.
const HANDLER_PREFERRED_ALTERNATIVES: ReadonlyArray<[string, string]> = [
  ['onClick', 'onPress'],
  ['onClick', 'onAction'],
  ['onChange', 'onSelectionChange'],
  ['onChange', 'onOpenChange'],
  ['onChange', 'onInputChange'],
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
