import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SidebarCurrent } from './collection';
import { buildRailCollection, resolveActiveRail } from './railCollection';
import type { SidebarRailNode } from './railCollection';

export interface SidebarRailStateResult {
  readonly nodes: SidebarRailNode[];
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  /** Rail item matching the current page — drives `aria-current`. `null` if none. */
  readonly matchedKey: string | null;
  /** Currently selected rail item (user selection, synced to `matchedKey`). */
  readonly selectedKey: string | null;
  /** The selected node — the section whose nav fills the panel, or a direct link. */
  readonly selectedNode: SidebarRailNode | null;
  selectRail: (key: string) => void;
}

export interface UseSidebarRailStateProps {
  children: ReactNode;
  current?: SidebarCurrent;
}

export const useSidebarRailState = ({
  children,
  current,
}: UseSidebarRailStateProps): SidebarRailStateResult => {
  const { collection, matchedKey } = useMemo(() => {
    const col = buildRailCollection(children);
    return { collection: col, matchedKey: resolveActiveRail(col, current) };
  }, [children, current]);

  // No match → fall back to the first section so the panel is never empty; if
  // there are no sections at all, the first rail item.
  const fallbackKey = useMemo(() => {
    const firstSection = collection.nodes.find(node => node.isSection);
    return firstSection?.key ?? collection.nodes[0]?.key ?? null;
  }, [collection]);

  // Selected rail (drives the panel + highlight), synced when the URL-derived
  // match changes. Mirrors the openBranch/activeBranch sync in useSidebarNavState.
  const [selectedKey, setSelectedKey] = useState<string | null>(
    matchedKey ?? fallbackKey
  );
  const [prevMatched, setPrevMatched] = useState(matchedKey);

  if (matchedKey !== prevMatched) {
    setPrevMatched(matchedKey);
    if (matchedKey) setSelectedKey(matchedKey);
  }

  const selectedNode =
    collection.nodes.find(node => node.key === selectedKey) ?? null;

  return {
    nodes: collection.nodes,
    header: collection.header,
    footer: collection.footer,
    matchedKey,
    selectedKey,
    selectedNode,
    selectRail: setSelectedKey,
  };
};
