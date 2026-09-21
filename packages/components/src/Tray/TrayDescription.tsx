import type { ReactNode } from 'react';
import { Description } from '../Description/Description';
import { useIsInsideOverlayHeader } from '../utils/OverlayHeaderContext';

// Props
// ---------------
export interface TrayDescriptionProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
/**
 * Thin wrapper over the slot-aware `<Description>`. Renders as a `<p>` styled
 * by the `TextContext` published by `<Tray>` (or `<Tray.Header>`), equivalent
 * to a `<Description slot="description">` inside the tray.
 *
 * **Important:** outside `<Tray.Header>` this lands in the `content` grid area,
 * the same one as `<Tray.Content>`, and the two overlap. Wrap title and
 * description together in `<Tray.Header>`.
 */
export const TrayDescription = ({ children }: TrayDescriptionProps) => {
  const insideHeader = useIsInsideOverlayHeader();
  if (process.env.NODE_ENV !== 'production' && !insideHeader) {
    console.warn(
      '[Tray.Description] is rendered outside of <Tray.Header>. ' +
        'It will land in the same grid area as <Tray.Content> and the two will overlap. ' +
        'Wrap your title and description in <Tray.Header> to avoid this.'
    );
  }
  return <Description slot="description">{children}</Description>;
};
