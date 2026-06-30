import type { ReactNode } from 'react';
import { useIsInsideOverlayHeader } from '../utils/OverlayHeaderContext';
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
export const DialogDescription = ({ children }: DialogDescriptionProps) => {
  const insideHeader = useIsInsideOverlayHeader();
  if (process.env.NODE_ENV !== 'production' && !insideHeader) {
    console.warn(
      '[Dialog.Description] is rendered outside of <Dialog.Header>. ' +
        'It will land in the same grid area as <Dialog.Content> and the two will overlap. ' +
        'Wrap your title and description in <Dialog.Header> to avoid this.'
    );
  }
  return <Description slot="description">{children}</Description>;
};
