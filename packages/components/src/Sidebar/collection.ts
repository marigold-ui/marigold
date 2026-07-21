import { Children, Fragment, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { SidebarGroupLabelProps, SidebarItemProps } from './SidebarItem';

export interface SidebarItemNode {
  type: 'item';
  key: string;
  textValue: string;
  triggerContent: ReactNode[];
  children: SidebarNode[];
  href?: string;
  onPress?: () => void;
  active?: boolean;
}

export interface SidebarSeparatorNode {
  type: 'separator';
  key: string;
}

export interface SidebarGroupLabelNode {
  type: 'groupLabel';
  key: string;
  content: ReactNode;
}

export type SidebarNode =
  | SidebarItemNode
  | SidebarSeparatorNode
  | SidebarGroupLabelNode;

export interface SidebarCollection {
  rootNodes: SidebarNode[];
  getItem(key: string): SidebarNode | undefined;
}

// Type guards (brand-based, safe across HOCs and bundles)
const isSidebarItem = (
  child: ReactNode
): child is ReactElement<SidebarItemProps> =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_ITEM__?: boolean }).__SIDEBAR_ITEM__ === true;

const isSidebarSeparator = (child: ReactNode): child is ReactElement =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_SEPARATOR__?: boolean }).__SIDEBAR_SEPARATOR__ ===
    true;

const isSidebarGroupLabel = (
  child: ReactNode
): child is ReactElement<SidebarGroupLabelProps> =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_GROUP_LABEL__?: boolean })
    .__SIDEBAR_GROUP_LABEL__ === true;

/**
 * Flatten children like `Children.toArray`, but additionally unwrap
 * `<Fragment>`s: `toArray` treats a fragment as a single opaque element, so
 * nav items wrapped in one (e.g. returned from a helper as `<>…</>`) would
 * silently fall through the type guards and vanish from the collection.
 */
export const flattenChildren = (children: ReactNode): ReactNode[] => {
  const result: ReactNode[] = [];
  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === Fragment) {
      result.push(
        ...flattenChildren((child.props as { children?: ReactNode }).children)
      );
    } else {
      result.push(child);
    }
  }
  return result;
};

/**
 * Extract a text value from children. If any child is a string,
 * concatenate them. Otherwise return empty string (user should
 * provide textValue explicitly).
 */
export const extractTextValue = (children: readonly ReactNode[]): string => {
  let text = '';
  for (const child of children) {
    if (typeof child === 'string') {
      text += child;
    }
  }
  return text.trim();
};

/**
 * Separate children of a SidebarItem into:
 * - itemChildren: nested SidebarItem/SidebarSeparator elements (become sub-panel)
 * - triggerContent: everything else (rendered in parent panel row)
 */
const separateChildren = (
  children: ReactNode
): { itemChildren: ReactNode[]; triggerContent: ReactNode[] } => {
  const itemChildren: ReactNode[] = [];
  const triggerContent: ReactNode[] = [];

  const flat = flattenChildren(children);
  for (const child of flat) {
    if (
      isSidebarItem(child) ||
      isSidebarSeparator(child) ||
      isSidebarGroupLabel(child)
    ) {
      itemChildren.push(child);
    } else {
      triggerContent.push(child);
    }
  }

  return { itemChildren, triggerContent };
};

export const firstLeafHref = (nodes: SidebarNode[]): string | undefined => {
  for (const node of nodes) {
    if (node.type !== 'item') continue;
    if (node.children.length === 0) return node.href;
    const found = firstLeafHref(node.children);
    if (found) return found;
  }
  return undefined;
};

/**
 * Predicate signature for `current` function mode. Receives a leaf item's
 * href and key and returns true if the item should be marked as active.
 */
export type SidebarCurrentMatcher = (
  href: string | undefined,
  key: string
) => boolean;

/**
 * String or predicate accepted by `Sidebar.Nav`'s `current` prop.
 *
 * - Pass a string (e.g. the current pathname) for smart segment-aware matching.
 * - Pass a predicate for full control over which leaf is considered active.
 */
export type SidebarCurrent = string | SidebarCurrentMatcher;

/**
 * Normalize a URL path for matching:
 * - strip query (`?…`) and hash (`#…`)
 * - strip trailing slash, except the root (`/`)
 */
export const normalizePath = (path: string): string => {
  const noQuery = path.split('?')[0].split('#')[0];
  if (noQuery === '' || noQuery === '/') return '/';
  let trimmed = noQuery;
  while (trimmed.length > 1 && trimmed.endsWith('/')) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed === '' ? '/' : trimmed;
};

export const collectLeaves = (nodes: SidebarNode[]): SidebarItemNode[] => {
  const result: SidebarItemNode[] = [];
  for (const node of nodes) {
    if (node.type !== 'item') continue;
    if (node.children.length > 0) {
      result.push(...collectLeaves(node.children));
    } else {
      result.push(node);
    }
  }
  return result;
};

/**
 * Core longest-prefix matcher over a flat list of leaves. Shared by the
 * single-column nav (`resolveCurrent`) and the rail (`resolveActiveRail`), so
 * both resolve active state identically.
 *
 * String mode rules:
 *   1. Exact match wins first.
 *   2. Otherwise, longest segment-prefix match (`current` starts with `href + '/'`).
 *   3. Root (`/`) is exact-only — never acts as a prefix.
 *   4. Equal-length matches: first in document order wins.
 *
 * Function mode: predicate is called per leaf with `(href, key)`.
 */
export const matchLeaves = (
  leaves: readonly { key: string; href?: string }[],
  current: SidebarCurrent
): Set<string> => {
  if (typeof current === 'function') {
    const set = new Set<string>();
    for (const leaf of leaves) {
      if (current(leaf.href, leaf.key)) set.add(leaf.key);
    }
    return set;
  }

  const target = normalizePath(current);

  let exact: string | null = null;
  let best: { key: string; len: number } | null = null;

  for (const leaf of leaves) {
    if (!leaf.href) continue;
    const href = normalizePath(leaf.href);

    if (href === target) {
      exact = leaf.key;
      break;
    }

    if (href !== '/' && target.startsWith(href + '/')) {
      if (!best || href.length > best.len) {
        best = { key: leaf.key, len: href.length };
      }
    }
  }

  return new Set(exact ? [exact] : best ? [best.key] : []);
};

/**
 * Dev-only guard against leaves that resolve to the same normalized href —
 * `matchLeaves` would silently pick the first in document order. Shared by
 * the single-column nav (`resolveCurrent`) and the rail (`resolveActiveRail`);
 * `format` renders the collision in the caller's vocabulary (leaf keys vs
 * rail items).
 */
export const warnDuplicateHrefs = (
  leaves: readonly { key: string; href?: string }[],
  format: (href: string, firstKey: string, duplicateKey: string) => string
): void => {
  if (process.env.NODE_ENV === 'production') return;

  const seen = new Map<string, string>();
  for (const leaf of leaves) {
    if (!leaf.href) continue;
    const href = normalizePath(leaf.href);
    const existing = seen.get(href);
    if (existing !== undefined) {
      console.error(format(href, existing, leaf.key));
    } else {
      seen.set(href, leaf.key);
    }
  }
};

/**
 * Resolve the set of active leaf keys for a given `current` value. Walks leaves
 * only — branches participate via `findActiveBranch`. See `matchLeaves` for the
 * matching rules.
 */
export const resolveCurrent = (
  collection: SidebarCollection,
  current: SidebarCurrent | undefined
): Set<string> => {
  if (current === undefined) return new Set();

  const leaves = collectLeaves(collection.rootNodes);

  if (typeof current !== 'function') {
    warnDuplicateHrefs(
      leaves,
      (href, first, duplicate) =>
        `[Sidebar] Multiple leaf items share the same href "${href}" ` +
        `(keys: "${first}", "${duplicate}"). Active state matching ` +
        `will pick the first item in document order. Each leaf nav ` +
        `item should have a unique href.`
    );
  }

  return matchLeaves(leaves, current);
};

/**
 * Mutate the collection so each item whose key is in `activeKeys`
 * has `active = true`. Existing explicit `active` flags are preserved
 * (per-item override always wins locally).
 */
export const applyCurrent = (
  collection: SidebarCollection,
  activeKeys: Set<string>
): void => {
  if (activeKeys.size === 0) return;
  const walk = (nodes: SidebarNode[]) => {
    for (const node of nodes) {
      if (node.type !== 'item') continue;
      if (activeKeys.has(node.key)) node.active = true;
      if (node.children.length > 0) walk(node.children);
    }
  };
  walk(collection.rootNodes);
};

export const findActiveBranch = (
  collection: SidebarCollection
): string | null => {
  const hasActive = (nodes: SidebarNode[]): boolean => {
    for (const node of nodes) {
      if (node.type !== 'item') continue;
      if (node.active) return true;
      if (node.children.length > 0 && hasActive(node.children)) return true;
    }
    return false;
  };

  for (const node of collection.rootNodes) {
    if (
      node.type === 'item' &&
      node.children.length > 0 &&
      hasActive(node.children)
    ) {
      return node.key;
    }
  }
  return null;
};

// Build collection (single pass: build + index)
const buildNodes = (
  flatChildren: readonly ReactNode[],
  counter: { value: number },
  index: Map<string, SidebarNode>
): SidebarNode[] => {
  const nodes: SidebarNode[] = [];

  for (const child of flatChildren) {
    if (isSidebarSeparator(child)) {
      const node: SidebarSeparatorNode = {
        type: 'separator',
        key: `sep-${counter.value++}`,
      };
      index.set(node.key, node);
      nodes.push(node);
      continue;
    }

    if (isSidebarGroupLabel(child)) {
      const node: SidebarGroupLabelNode = {
        type: 'groupLabel',
        key: `grouplabel-${counter.value++}`,
        content: child.props.children,
      };
      index.set(node.key, node);
      nodes.push(node);
      continue;
    }

    if (isSidebarItem(child)) {
      const { itemChildren, triggerContent } = separateChildren(
        child.props.children
      );

      const key = child.props.id || `item-${counter.value++}`;
      const textValue =
        child.props.textValue || extractTextValue(triggerContent);

      const childNodes =
        itemChildren.length > 0 ? buildNodes(itemChildren, counter, index) : [];

      const node: SidebarItemNode = {
        type: 'item',
        key,
        textValue,
        triggerContent,
        children: childNodes,
        href: child.props.href ?? firstLeafHref(childNodes),
        onPress: child.props.onPress,
        active: child.props.active,
      };
      index.set(node.key, node);
      nodes.push(node);
    }
  }

  return nodes;
};

export const buildCollection = (children: ReactNode): SidebarCollection => {
  const counter = { value: 0 };
  const index = new Map<string, SidebarNode>();
  const rootNodes = buildNodes(flattenChildren(children), counter, index);

  return {
    rootNodes,
    getItem: (key: string) => index.get(key),
  };
};
