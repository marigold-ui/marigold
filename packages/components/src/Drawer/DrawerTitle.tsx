import type { ReactNode } from 'react';
import { Title } from '../Title/Title';

export interface DrawerTitleProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

/**
 * Thin wrapper over the slot-aware `<Title>`. The heading level, id,
 * `aria-labelledby` wiring, and theme classes come from the `HeadingContext`
 * published by `<Drawer>` (or `<Drawer.Header>`), so this is equivalent to
 * dropping a `<Title slot="title">` directly inside the drawer.
 */
export const DrawerTitle = ({ children }: DrawerTitleProps) => (
  <Title slot="title">{children}</Title>
);
