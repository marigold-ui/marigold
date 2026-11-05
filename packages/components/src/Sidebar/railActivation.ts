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
 * testable —
 * `SidebarRail` only maps the result onto its state and refs. Desktop-only:
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

  if (node.key === selectedKey) {
    // Re-click goes to the section's page and only reopens a collapsed panel;
    // collapsing is left to `Sidebar.Toggle` and Cmd/Ctrl+B.
    const collapsed = state === 'collapsed';
    return {
      select: false,
      toggle: collapsed,
      focusPanel: collapsed,
    };
  }

  // Switch section: swap the panel, open it if collapsed, focus it.
  return {
    select: true,
    toggle: state === 'collapsed',
    focusPanel: true,
  };
};
