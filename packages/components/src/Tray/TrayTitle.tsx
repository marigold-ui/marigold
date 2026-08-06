import type { ReactNode } from 'react';
import { Title } from '../Title/Title';

// Props
// ---------------
export interface TrayTitleProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
/**
 * Thin wrapper over the slot-aware `<Title>`. The heading level, id,
 * `aria-labelledby` wiring, and theme classes come from the `HeadingContext`
 * published by `<Tray>` (or `<Tray.Header>`), so this is equivalent to
 * dropping a `<Title slot="title">` directly inside the tray.
 */
export const TrayTitle = ({ children }: TrayTitleProps) => (
  <Title slot="title">{children}</Title>
);
