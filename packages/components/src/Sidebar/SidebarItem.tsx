import type { ReactElement, ReactNode } from 'react';

// SidebarItem — data carrier (renders null, consumed by collection builder)
// ---------------
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

// SidebarSeparator — visual divider marker (renders null)
// ---------------
export const SidebarSeparator = (): ReactElement | null => null;
