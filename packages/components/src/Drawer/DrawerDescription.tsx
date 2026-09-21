import type { ReactNode } from 'react';
import { Description } from '../Description/Description';
import { useIsInsideOverlayHeader } from '../utils/OverlayHeaderContext';

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
 * **Important:** outside `<Drawer.Header>` this lands in the `content` grid
 * area, the same one as `<Drawer.Content>`, and the two overlap. Wrap title and
 * description together in `<Drawer.Header>`.
 */
export const DrawerDescription = ({ children }: DrawerDescriptionProps) => {
  const insideHeader = useIsInsideOverlayHeader();
  if (process.env.NODE_ENV !== 'production' && !insideHeader) {
    console.warn(
      '[Drawer.Description] is rendered outside of <Drawer.Header>. ' +
        'It will land in the same grid area as <Drawer.Content> and the two will overlap. ' +
        'Wrap your title and description in <Drawer.Header> to avoid this.'
    );
  }
  return <Description slot="description">{children}</Description>;
};
