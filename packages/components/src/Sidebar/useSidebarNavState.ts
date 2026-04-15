import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  applyCurrent,
  buildCollection,
  findActiveBranch,
  resolveCurrent,
} from './collection';
import type {
  SidebarCollection,
  SidebarCurrent,
  SidebarItemNode,
  SidebarNode,
} from './collection';

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
  current?: SidebarCurrent;
}

export const useSidebarNavState = ({
  children,
  current,
}: UseSidebarNavStateProps): SidebarNavStateResult => {
  const { collection, activeBranch, branchNodes } = useMemo(() => {
    const col = buildCollection(children);
    if (current !== undefined) {
      applyCurrent(col, resolveCurrent(col, current));
    }
    return {
      collection: col,
      activeBranch: findActiveBranch(col),
      branchNodes: collectBranches(col.rootNodes),
    };
  }, [children, current]);

  // Explicit panel state — which branch panel is shown (null = root).
  // Syncs when the URL-derived activeBranch changes.
  const [openBranch, setOpenBranch] = useState<string | null>(activeBranch);
  const [prevActiveBranch, setPrevActiveBranch] = useState(activeBranch);

  if (activeBranch !== prevActiveBranch) {
    setPrevActiveBranch(activeBranch);
    setOpenBranch(activeBranch);
  }

  const stack = openBranch ? [openBranch] : [];

  return { collection, branchNodes, stack, setOpenBranch };
};
