import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { buildCollection, findActiveBranch } from './collection';
import type {
  SidebarCollection,
  SidebarItemNode,
  SidebarNode,
} from './collection';

// Recursively collect all branch nodes (items with children) at every depth
const collectBranches = (nodes: SidebarNode[]): SidebarItemNode[] => {
  const result: SidebarItemNode[] = [];
  for (const node of nodes) {
    if (node.type === 'item' && node.children.length > 0) {
      result.push(node);
      result.push(...collectBranches(node.children));
    }
  }
  return result;
};

export interface SidebarNavStateResult {
  readonly collection: SidebarCollection;
  readonly branchNodes: SidebarItemNode[];
  readonly stack: string[];
  setOpenBranch: (key: string | null) => void;
}

export interface UseSidebarNavStateProps {
  children: ReactNode;
}

export const useSidebarNavState = ({
  children,
}: UseSidebarNavStateProps): SidebarNavStateResult => {
  const collection = useMemo(() => buildCollection(children), [children]);

  // Derive which branch contains the active item
  const activeBranch = useMemo(
    () => findActiveBranch(collection),
    [collection]
  );

  // Explicit panel state — which branch panel is shown (null = root).
  // Syncs when the URL-derived activeBranch changes.
  const [openBranch, setOpenBranch] = useState<string | null>(activeBranch);
  const [prevActiveBranch, setPrevActiveBranch] = useState(activeBranch);

  if (activeBranch !== prevActiveBranch) {
    setPrevActiveBranch(activeBranch);
    setOpenBranch(activeBranch);
  }

  const stack = openBranch ? [openBranch] : [];

  const branchNodes = useMemo(
    () => collectBranches(collection.rootNodes),
    [collection]
  );

  return { collection, branchNodes, stack, setOpenBranch };
};
