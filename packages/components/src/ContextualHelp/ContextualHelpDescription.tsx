import type { ReactNode } from 'react';
import { Description } from '../Description/Description';

export interface ContextualHelpDescriptionProps {
  children?: ReactNode;
}

export const ContextualHelpDescription = ({
  children,
}: ContextualHelpDescriptionProps) => (
  // ClassName and element type come from the `description` slot that the
  // `ContextualHelp` root publishes via `TextContext`.
  <Description>{children}</Description>
);
