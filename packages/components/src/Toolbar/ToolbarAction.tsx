import type { ReactNode } from 'react';

export interface ToolbarActionProps {
  /**
   * Stable identifier for the action. Also the key used when it collapses into
   * the toolbar's "More" menu.
   */
  id: string;
  /**
   * Accessible name of the action. Required for an icon-only action — it becomes
   * the button's `aria-label`, its tooltip, and the overflow menu-item label.
   * For a text action you can omit it and pass the label as children instead.
   */
  label?: string;
  /**
   * An icon. When set, the in-bar control is an icon-only button paired with a
   * tooltip; the action still shows its `label` once it collapses into "More".
   */
  icon?: ReactNode;
  /**
   * Handler called when the action is triggered, whether from the bar or the
   * overflow menu.
   */
  onAction?: () => void;
  /**
   * Disables the action in both the bar and the menu.
   * @default false
   */
  disabled?: boolean;
  /**
   * Visible text of a text action — the in-bar button's label, and its label in
   * the overflow menu. Provide either this or `label`.
   */
  children?: ReactNode;
}

/**
 * Describes a single action inside a `<Toolbar>`. It is a descriptor, not a
 * rendered control: the toolbar reads its props and renders it as a button in
 * the bar or, when space runs short, as an item in the "More" menu. It renders
 * nothing on its own.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ToolbarAction = (_: ToolbarActionProps): null => null;
