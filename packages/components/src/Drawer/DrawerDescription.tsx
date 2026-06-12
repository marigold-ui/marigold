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
 */
export const DrawerDescription = ({ children }: DrawerDescriptionProps) => (
  <Description slot="description">{children}</Description>
);
