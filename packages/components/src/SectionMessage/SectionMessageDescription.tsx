import type { ReactNode } from 'react';
import { Description } from '../Description/Description';

export interface SectionMessageDescriptionProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const SectionMessageDescription = ({
  children,
}: SectionMessageDescriptionProps) => (
  // ClassName and element type come from the `description` slot that the
  // `SectionMessage` root publishes via `TextContext`.
  <Description>{children}</Description>
);
