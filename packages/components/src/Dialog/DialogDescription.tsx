import type { ReactNode } from 'react';
import { Description } from '../Description/Description';

export interface DialogDescriptionProps {
  /** Children of the component. */
  children?: ReactNode;
}

/**
 * Thin wrapper over the slot-aware `<Description>`. Renders as a `<p>` styled
 * by the `TextContext` published by `<Dialog>` (or `<Dialog.Header>`),
 * equivalent to a `<Description slot="description">` inside the dialog.
 */
export const DialogDescription = ({ children }: DialogDescriptionProps) => (
  <Description slot="description">{children}</Description>
);
