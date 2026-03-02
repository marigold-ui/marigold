import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';

// Types
// ---------------
export interface SidebarNode {
  type: 'item' | 'separator' | 'group-label';
  key: string;
  textValue: string;
  triggerContent: ReactNode;
  children: SidebarNode[];
  href?: string;
  onPress?: () => void;
  active?: boolean;
}

export interface SidebarCollection {
  rootNodes: SidebarNode[];
  getItem(key: string): SidebarNode | undefined;
}

// Type guards (brand-based, safe across HOCs and bundles)
// ---------------
const isSidebarItem = (child: ReactNode): boolean =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_ITEM__?: boolean }).__SIDEBAR_ITEM__ === true;

const isSidebarSeparator = (child: ReactNode): boolean =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_SEPARATOR__?: boolean }).__SIDEBAR_SEPARATOR__ ===
    true;

// Helpers
// ---------------

/**
 * Extract a text value from children. If children is a string,
 * return it directly. Otherwise return empty string (user should
 * provide textValue explicitly).
 */
const extractTextValue = (children: ReactNode): string => {
  if (typeof children === 'string') return children;

  let text = '';
  Children.forEach(children, child => {
    if (typeof child === 'string') {
      text += child;
    }
  });
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

// Build collection
// ---------------
const buildNodes = (
  children: ReactNode,
  counter: { value: number }
): SidebarNode[] => {
  const nodes: SidebarNode[] = [];
  const flat = Children.toArray(children);

  for (const child of flat) {
    if (!isValidElement(child)) continue;

    if (isSidebarSeparator(child)) {
      nodes.push({
        type: 'separator',
        key: `sep-${counter.value++}`,
        textValue: '',
        triggerContent: null,
        children: [],
      });
      continue;
    }

    if (isSidebarItem(child)) {
      const props = child.props as {
        id?: string;
        textValue?: string;
        href?: string;
        onPress?: () => void;
        active?: boolean;
        children?: ReactNode;
      };

      const { itemChildren, triggerContent } = separateChildren(props.children);

      const key = props.id || `item-${counter.value++}`;
      const textValue =
        props.textValue || extractTextValue(triggerContent as ReactNode);

      nodes.push({
        type: 'item',
        key,
        textValue,
        triggerContent:
          triggerContent.length === 1 ? triggerContent[0] : triggerContent,
        children:
          itemChildren.length > 0 ? buildNodes(itemChildren, counter) : [],
        href: props.href,
        onPress: props.onPress,
        active: props.active,
      });
    }
  }

  return nodes;
};

const indexNodes = (
  nodes: SidebarNode[],
  map: Map<string, SidebarNode>
): void => {
  for (const node of nodes) {
    map.set(node.key, node);
    if (node.children.length > 0) {
      indexNodes(node.children, map);
    }
  }
};

export const buildCollection = (children: ReactNode): SidebarCollection => {
  const counter = { value: 0 };
  const rootNodes = buildNodes(children, counter);
  const index = new Map<string, SidebarNode>();
  indexNodes(rootNodes, index);

  return {
    rootNodes,
    getItem: (key: string) => index.get(key),
  };
};
