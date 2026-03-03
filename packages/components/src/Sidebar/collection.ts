import { Children, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { SidebarItemProps } from './SidebarItem';

// Types
// ---------------
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

export type SidebarNode = SidebarItemNode | SidebarSeparatorNode;

export interface SidebarCollection {
  rootNodes: SidebarNode[];
  getItem(key: string): SidebarNode | undefined;
}

// Type guards (brand-based, safe across HOCs and bundles)
// ---------------
const isSidebarItem = (
  child: ReactNode
): child is ReactElement<SidebarItemProps> =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_ITEM__?: boolean }).__SIDEBAR_ITEM__ === true;

const isSidebarSeparator = (child: ReactNode): child is ReactElement =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_SEPARATOR__?: boolean }).__SIDEBAR_SEPARATOR__ ===
    true;

// Helpers
// ---------------

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
    if (isSidebarItem(child) || isSidebarSeparator(child)) {
      itemChildren.push(child);
    } else {
      triggerContent.push(child);
    }
  }

  return { itemChildren, triggerContent };
};

// Find the first leaf descendant's href (for branch items without explicit href)
// ---------------
const firstLeafHref = (nodes: SidebarNode[]): string | undefined => {
  for (const node of nodes) {
    if (node.type !== 'item') continue;
    if (node.children.length === 0) return node.href;
    const found = firstLeafHref(node.children);
    if (found) return found;
  }
  return undefined;
};

// Find which root-level branch contains an active item
// ---------------
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
// ---------------
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
