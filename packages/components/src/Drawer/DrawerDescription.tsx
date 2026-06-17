import type { ReactNode } from 'react';
import { Description } from '../Description/Description';

export interface DrawerDescriptionProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

/**
 * Thin wrapper over the slot-aware `<Description>`. Renders as a `<p>` styled
 * by the `TextContext` published by `<Drawer>` (or `<Drawer.Header>`),
 * equivalent to a `<Description slot="description">` inside the drawer.
 *
 * **Important:** When used outside of `<Drawer.Header>`, this component is
 * placed in the `content` grid area — the same area as `<Drawer.Content>`.
 * Using both at the root level will cause them to overlap. Prefer wrapping
 * title and description together in `<Drawer.Header>`.
 */
export const DrawerDescription = ({ children }: DrawerDescriptionProps) => (
  <Description slot="description">{children}</Description>
);
