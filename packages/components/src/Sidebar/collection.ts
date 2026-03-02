import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';
import { SidebarItem } from './SidebarItem';
import { SidebarSeparator } from './SidebarItem';

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

  Children.forEach(children, child => {
    if (
      isValidElement(child) &&
      (child.type === SidebarItem || child.type === SidebarSeparator)
    ) {
      itemChildren.push(child);
    } else {
      triggerContent.push(child);
    }
  });

  return { itemChildren, triggerContent };
};

let autoId = 0;

// Build collection
// ---------------
const buildNodes = (children: ReactNode): SidebarNode[] => {
  const nodes: SidebarNode[] = [];

  Children.forEach(children, child => {
    if (!isValidElement(child)) return;

    if (child.type === SidebarSeparator) {
      nodes.push({
        type: 'separator',
        key: `sep-${autoId++}`,
        textValue: '',
        triggerContent: null,
        children: [],
      });
      return;
    }

    if (child.type === SidebarItem) {
      const props = child.props as {
        id?: string;
        textValue?: string;
        href?: string;
        onPress?: () => void;
        active?: boolean;
        children?: ReactNode;
      };

      const { itemChildren, triggerContent } = separateChildren(props.children);

      const key = props.id || `item-${autoId++}`;
      const textValue =
        props.textValue || extractTextValue(triggerContent as ReactNode);

      if (itemChildren.length > 0) {
        // Branch node — has sub-items
        nodes.push({
          type: 'item',
          key,
          textValue,
          triggerContent:
            triggerContent.length === 1 ? triggerContent[0] : triggerContent,
          children: buildNodes(itemChildren),
          href: props.href,
          onPress: props.onPress,
          active: props.active,
        });
      } else {
        // Leaf node
        nodes.push({
          type: 'item',
          key,
          textValue,
          triggerContent:
            triggerContent.length === 1 ? triggerContent[0] : triggerContent,
          children: [],
          href: props.href,
          onPress: props.onPress,
          active: props.active,
        });
      }
    }
  });

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
  autoId = 0;
  const rootNodes = buildNodes(children);
  const index = new Map<string, SidebarNode>();
  indexNodes(rootNodes, index);

  return {
    rootNodes,
    getItem: (key: string) => index.get(key),
  };
};
