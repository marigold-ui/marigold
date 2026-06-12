import type { ReactNode } from 'react';
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
 */
export const TrayDescription = ({ children }: TrayDescriptionProps) => (
  <Description slot="description">{children}</Description>
);
