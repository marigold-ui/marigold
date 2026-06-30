import type { ReactNode } from 'react';
import { useIsInsideOverlayHeader } from '../utils/OverlayHeaderContext';
import { Description } from '../Description/Description';

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
 * **Important:** When used outside of `<Tray.Header>`, this component is
 * placed in the `content` grid area — the same area as `<Tray.Content>`.
 * Using both at the root level will cause them to overlap. Prefer wrapping
 * title and description together in `<Tray.Header>`.
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
