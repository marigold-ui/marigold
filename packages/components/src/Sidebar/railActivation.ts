import type { SidebarRailNode } from './railCollection';
import type { SidebarState } from './useSidebarState';

export interface RailActivationContext {
  /** Key of the currently selected rail item (whose panel is showing). */
  selectedKey: string | null;
  /** Shared sidebar state: panel visibility. */
  state: SidebarState;
}

export interface RailActivation {
  /** Select the clicked rail item (swap the highlight and panel). */
  select: boolean;
  /** Toggle the shared sidebar state (panel visibility). */
  toggle: boolean;
  /** Move focus to the panel heading once the panel is shown. */
  focusPanel: boolean;
}

/**
 * Decide what activating a rail item does to the panel. Every activation also
 * navigates to the item's href, so that is not part of the decision. Pure, so
 * every branch of the section/direct-link × re-click/switch matrix is directly
 * testable — `SidebarRail` only maps the result onto its state and refs.
 * Desktop-only:
 * the mobile drawer renders a `SidebarNav` drill-down, which owns its own
 * activation semantics.
 */
export const resolveRailActivation = (
  node: Pick<SidebarRailNode, 'key' | 'isSection'>,
  { selectedKey, state }: RailActivationContext
): RailActivation => {
  if (!node.isSection) {
    // Direct link just navigates.
    return {
      select: true,
      toggle: false,
      focusPanel: false,
    };
  }

  // A section only ever opens the panel (collapsing is left to
  // `Sidebar.Toggle` and Cmd/Ctrl+B). Switching swaps and focuses the panel;
  // re-clicking the active one focuses it only when it had to reopen.
  const switching = node.key !== selectedKey;
  const collapsed = state === 'collapsed';
  return {
    select: switching,
    toggle: collapsed,
    focusPanel: switching || collapsed,
  };
};
