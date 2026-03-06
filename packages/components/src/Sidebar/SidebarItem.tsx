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

const _SidebarItem = (_props: SidebarItemProps): ReactElement | null => null;
_SidebarItem.__SIDEBAR_ITEM__ = true as const;
export const SidebarItem = _SidebarItem;

// Renders null — visual divider marker consumed by collection builder
const _SidebarSeparator = (): ReactElement | null => null;
_SidebarSeparator.__SIDEBAR_SEPARATOR__ = true as const;
export const SidebarSeparator = _SidebarSeparator;

// Renders null — section label marker consumed by collection builder
export interface SidebarGroupLabelProps {
  children?: ReactNode;
}

const _SidebarGroupLabel = (
  _props: SidebarGroupLabelProps
): ReactElement | null => null;
_SidebarGroupLabel.__SIDEBAR_GROUP_LABEL__ = true as const;
export const SidebarGroupLabel = _SidebarGroupLabel;
