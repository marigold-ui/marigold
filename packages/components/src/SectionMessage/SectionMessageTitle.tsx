import type { ReactNode } from 'react';
import { Title } from '../Title/Title';

export interface SectionMessageTitleProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const SectionMessageTitle = ({ children }: SectionMessageTitleProps) => (
  // Renders a semantic heading. Level, id, className, and grid area come
  // from the `title` slot that the `SectionMessage` root publishes via
  // `HeadingContext` (configurable through the root's `headingLevel` prop).
  <Title>{children}</Title>
);
