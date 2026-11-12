/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactElement, ReactNode } from 'react';

// Data carrier — renders null, consumed by collection builder
export interface SidebarItemProps {
  /** Unique key for branch items (auto-generated if omitted). */
  id?: string;
  /** Label used for back button + a11y. Auto-extracted from string children if omitted. */
  textValue?: string;
  /** Renders the item as a link. */
  href?: string;
  /** Click handler. */
  onPress?: () => void;
  /** Whether this item represents the current page. */
  active?: boolean;
  /** Row content + nested SidebarItems for branch nodes. */
  children?: ReactNode;
}

export const SidebarItem = (_props: SidebarItemProps): ReactElement | null =>
  null;
SidebarItem.__SIDEBAR_ITEM__ = true as const;

// Internal icon marker, consumed by collection builder. Lets the mobile rail
// drawer carry each RailItem's icon into its rows without a public `icon`
// prop on `Sidebar.Item`. Not part of the `Sidebar` compound.
export interface SidebarItemIconProps {
  children?: ReactNode;
}

export const SidebarItemIcon = (
  _props: SidebarItemIconProps
): ReactElement | null => null;
SidebarItemIcon.__SIDEBAR_ITEM_ICON__ = true as const;

// Divider marker, consumed by collection builder
export const SidebarSeparator = (): ReactElement | null => null;
SidebarSeparator.__SIDEBAR_SEPARATOR__ = true as const;

// Label marker, consumed by collection builder
export interface SidebarGroupLabelProps {
  /** The label content for the group. */
  children?: ReactNode;
}

export const SidebarGroupLabel = (
  _props: SidebarGroupLabelProps
): ReactElement | null => null;
SidebarGroupLabel.__SIDEBAR_GROUP_LABEL__ = true as const;
