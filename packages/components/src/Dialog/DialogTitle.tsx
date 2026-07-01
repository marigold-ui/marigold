import type { ReactNode } from 'react';
import { Title } from '../Title/Title';

export interface DialogTitleProps {
  /** Children of the component. */
  children?: ReactNode;
}

/**
 * Thin wrapper over the slot-aware `<Title>`. The heading level, id,
 * `aria-labelledby` wiring, and theme classes come from the `HeadingContext`
 * published by `<Dialog>` (or `<Dialog.Header>`), so this is equivalent to
 * dropping a `<Title slot="title">` directly inside the dialog.
 */
export const DialogTitle = ({ children }: DialogTitleProps) => (
  <Title slot="title">{children}</Title>
);
