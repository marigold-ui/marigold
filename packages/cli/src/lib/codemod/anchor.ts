import { type AnyNode, collectImports, walk } from '../tsx-ast.js';

// Locating theme definitions in consumer code. The stable anchor is the
// `ThemeComponent<'X'>` type from @marigold/system — not file names or
// directory layout — so the codemods work regardless of how a consumer
// organizes their theme. Anything we cannot find this way is reported as a
// warning, never guessed at.

export const MARIGOLD_SYSTEM = '@marigold/system';
export const MARIGOLD_COMPONENTS = '@marigold/components';

/**
 * Local name under which `exported` is imported from a Marigold package in
 * this file (handles aliased imports), or null if not imported.
 */
export const marigoldLocalName = (
  file: AnyNode,
  exported: string,
  pkg: string = MARIGOLD_SYSTEM
): string | null => {
  for (const imp of collectImports(file)) {
    const src = (imp.source as { value?: string } | undefined)?.value;
    if (src !== pkg) continue;
    for (const s of (imp.specifiers as AnyNode[] | undefined) ?? []) {
      if (s.type !== 'ImportSpecifier') continue;
      const imported = (s.imported as { name?: string } | undefined)?.name;
      const local = (s.local as { name?: string } | undefined)?.name;
      if (imported === exported && local) return local;
    }
  }
  return null;
};

export interface ThemeComponentDecl {
  /** the component name, e.g. 'Checkbox' from ThemeComponent<'Checkbox'> */
  component: string;
  /** the initializer (object literal of slots, or a single cva call) */
  init: AnyNode;
}

// Babel 8 stores type arguments as `typeArguments`; Babel 7 used
// `typeParameters`. Accept both so a parser bump can't silently break us.
const typeArgs = (ref: AnyNode): AnyNode[] =>
  (
    (ref.typeArguments ?? ref.typeParameters) as
      | { params?: AnyNode[] }
      | undefined
  )?.params ?? [];

/**
 * All `const X: ThemeComponent<'Name'> = ...` declarations in a file whose
 * `ThemeComponent` verifiably comes from @marigold/system.
 */
export const findThemeComponents = (file: AnyNode): ThemeComponentDecl[] => {
  const localName = marigoldLocalName(file, 'ThemeComponent');
  if (!localName) return [];

  const decls: ThemeComponentDecl[] = [];
  walk(file, n => {
    if (n.type !== 'VariableDeclarator') return;
    const id = n.id as AnyNode | undefined;
    const annotation = (id?.typeAnnotation as AnyNode | undefined)
      ?.typeAnnotation as AnyNode | undefined;
    if (!annotation || annotation.type !== 'TSTypeReference') return;
    if ((annotation.typeName as { name?: string })?.name !== localName) return;
    const [arg] = typeArgs(annotation);
    const literal = arg?.literal as AnyNode | undefined;
    if (arg?.type !== 'TSLiteralType' || literal?.type !== 'StringLiteral') {
      return;
    }
    const init = n.init as AnyNode | undefined;
    if (!init) return;
    decls.push({ component: literal.value as string, init });
  });
  return decls;
};

export const objectProperties = (obj: AnyNode): AnyNode[] =>
  obj.type === 'ObjectExpression' ? ((obj.properties as AnyNode[]) ?? []) : [];

/** key name of an ObjectProperty (identifier or string-literal key) */
export const propertyName = (prop: AnyNode): string | null => {
  if (prop.type !== 'ObjectProperty') return null;
  const key = prop.key as AnyNode | undefined;
  if (key?.type === 'Identifier')
    return (key as { name?: string }).name ?? null;
  if (key?.type === 'StringLiteral') {
    return (key as { value?: string }).value ?? null;
  }
  return null;
};

/** render a slot name as an object key, quoting when not an identifier */
export const asPropertyKey = (name: string): string =>
  /^[A-Za-z_$][\w$]*$/.test(name) ? name : `'${name}'`;

export const isCvaCall = (node: AnyNode, cvaLocal: string | null): boolean =>
  node.type === 'CallExpression' &&
  (node.callee as AnyNode | undefined)?.type === 'Identifier' &&
  ((node.callee as { name?: string }).name ?? '') === cvaLocal;
