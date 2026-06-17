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
 *
 * **Important:** When used outside of `<Dialog.Header>`, this component is
 * placed in the `content` grid area — the same area as `<Dialog.Content>`.
 * Using both at the root level will cause them to overlap. Prefer wrapping
 * title and description together in `<Dialog.Header>`.
 */
export const DialogDescription = ({ children }: DialogDescriptionProps) => (
  <Description slot="description">{children}</Description>
);
