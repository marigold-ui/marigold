import { Children, isValidElement } from 'react';
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
 * Extract a text value from children. If any child is a string,
 * concatenate them. Otherwise return empty string (user should
 * provide textValue explicitly).
 */
const extractTextValue = (children: readonly ReactNode[]): string => {
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

  const flat = Children.toArray(children);
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

const firstLeafHref = (nodes: SidebarNode[]): string | undefined => {
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
  const trimmed = noQuery.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const collectLeaves = (nodes: SidebarNode[]): SidebarItemNode[] => {
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
 * Resolve the set of active leaf keys for a given `current` value.
 *
 * String mode rules:
 *   1. Normalize the input (strip query/hash, trim trailing slash).
 *   2. Walk leaves only — branches participate via `findActiveBranch`.
 *   3. Exact match wins first.
 *   4. Otherwise, longest segment-prefix match (`current` starts with `href + '/'`).
 *   5. Root (`/`) is exact-only — never acts as a prefix.
 *   6. Equal-length matches: first in document order wins.
 *
 * Function mode: predicate is called per leaf with `(href, key)`.
 */
export const resolveCurrent = (
  collection: SidebarCollection,
  current: SidebarCurrent | undefined
): Set<string> => {
  if (current === undefined) return new Set();

  const leaves = collectLeaves(collection.rootNodes);

  if (typeof current === 'function') {
    const set = new Set<string>();
    for (const leaf of leaves) {
      if (current(leaf.href, leaf.key)) set.add(leaf.key);
    }
    return set;
  }

  const target = normalizePath(current);

  if (process.env.NODE_ENV !== 'production') {
    const seen = new Map<string, string>();
    for (const leaf of leaves) {
      if (!leaf.href) continue;
      const href = normalizePath(leaf.href);
      const existing = seen.get(href);
      if (existing !== undefined) {
        // eslint-disable-next-line no-console
        console.error(
          `[Sidebar] Multiple leaf items share the same href "${href}" ` +
            `(keys: "${existing}", "${leaf.key}"). Active state matching ` +
            `will pick the first item in document order. Each leaf nav ` +
            `item should have a unique href.`
        );
      } else {
        seen.set(href, leaf.key);
      }
    }
  }

  // 1. Exact match (first in document order wins).
  for (const leaf of leaves) {
    if (!leaf.href) continue;
    if (normalizePath(leaf.href) === target) return new Set([leaf.key]);
  }

  // 2. Longest segment-prefix match (root '/' excluded — exact-only).
  let best: { key: string; len: number } | null = null;
  for (const leaf of leaves) {
    if (!leaf.href) continue;
    const href = normalizePath(leaf.href);
    if (href === '/') continue;
    if (target.startsWith(href + '/')) {
      if (!best || href.length > best.len) {
        best = { key: leaf.key, len: href.length };
      }
    }
  }
  return best ? new Set([best.key]) : new Set();
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
  const rootNodes = buildNodes(Children.toArray(children), counter, index);

  return {
    rootNodes,
    getItem: (key: string) => index.get(key),
  };
};
