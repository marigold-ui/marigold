/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactElement, ReactNode } from 'react';

// Data carrier — renders null, consumed by the rail collection builder.
export interface SidebarRailItemProps {
  /**
   * Icon shown in the rail. Required: the rail is icon-first (an icon sits
   * above the label on every item), so a missing icon is always a bug.
   */
  icon: ReactNode;
  /** Unique key for the rail item. Needed to address a section; auto-generated if omitted. */
  id?: string;
  /**
   * The rail label, shown under the icon (also the accessible name).
   * Auto-extracted from string children if omitted — set it explicitly when
   * the label is not plain text.
   */
  textValue?: string;
  /**
   * Landing destination. A `RailItem` with an `href` and no nested `Sidebar.Nav`
   * is a direct link (no panel). A section may set `href` to override its
   * default landing page (otherwise the first leaf of its nav is used).
   */
  href?: string;
  /** Click handler. */
  onPress?: () => void;
  /** Whether this rail item represents the active section/destination. */
  active?: boolean;
  /**
   * The rail label (plain text) plus, for a section, a nested `Sidebar.Nav`
   * whose items become the panel. Omit the nav to make the item a direct link.
   */
  children?: ReactNode;
}

const _SidebarRailItem = (_props: SidebarRailItemProps): ReactElement | null =>
  null;
_SidebarRailItem.__SIDEBAR_RAIL_ITEM__ = true as const;
export const SidebarRailItem = _SidebarRailItem;
