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

      const node: SidebarItemNode = {
        type: 'item',
        key,
        textValue,
        triggerContent,
        children:
          itemChildren.length > 0
            ? buildNodes(itemChildren, counter, index)
            : [],
        href: child.props.href,
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
