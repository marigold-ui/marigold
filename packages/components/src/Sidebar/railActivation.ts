import type { SidebarRailNode } from './railCollection';
import type { SidebarState } from './useSidebarState';

export interface RailActivationContext {
  isMobile: boolean;
  /** Key of the currently selected rail item (whose panel is showing). */
  selectedKey: string | null;
  /** Shared sidebar state: panel visibility on desktop, drawer on mobile. */
  state: SidebarState;
}

export interface RailActivation {
  /** Select the clicked rail item (swap the highlight and panel). */
  select: boolean;
  /** Toggle the shared sidebar state (panel on desktop, drawer on mobile). */
  toggle: boolean;
  /** Move focus to the panel heading once the panel is shown. */
  focusPanel: boolean;
  /** Let the anchor navigate (false = the click only re-targets the panel). */
  navigate: boolean;
}

/**
 * Decide what activating a rail item does. Pure, so every branch of the
 * section/direct-link × mobile/desktop × re-click/switch matrix is directly
 * testable — `SidebarRail` only maps the result onto its state and refs.
 */
export const resolveRailActivation = (
  node: Pick<SidebarRailNode, 'key' | 'isSection'>,
  { isMobile, selectedKey, state }: RailActivationContext
): RailActivation => {
  if (!node.isSection) {
    // Direct link: navigate. On mobile the link leaves the page, so the
    // drawer leaves with it.
    return {
      select: true,
      toggle: isMobile,
      focusPanel: false,
      navigate: true,
    };
  }

  if (isMobile) {
    // The drawer shows rail and panel side by side, so a section tap only
    // retargets the panel — navigating would close the drawer before the
    // user picks a leaf. Re-tapping the active section is a no-op (there
    // is no hidden panel to toggle).
    const isSwitch = node.key !== selectedKey;
    return {
      select: isSwitch,
      toggle: false,
      focusPanel: isSwitch,
      navigate: false,
    };
  }

  if (node.key === selectedKey) {
    // Re-click the active section: toggle the panel (VS Code model); when
    // expanding, move focus into the revealed panel.
    return {
      select: false,
      toggle: true,
      focusPanel: state === 'collapsed',
      navigate: false,
    };
  }

  // Switch section: swap the panel, ensure it is open, move focus to it.
  return {
    select: true,
    toggle: state === 'collapsed',
    focusPanel: true,
    navigate: true,
  };
};
