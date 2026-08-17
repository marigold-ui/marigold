import type { Key, ReactNode } from 'react';

export interface StepperItemProps {
  /**
   * Identifies the step. Required, and must be unique within the Stepper.
   */
  id: Key;

  /**
   * The visible label of the step. Always authored, even when the Stepper sets
   * `hideLabels`, because it is the step's accessible name.
   */
  children: ReactNode;

  /**
   * Turns the step into a real link. Without it the step renders as a button.
   */
  href?: string;
}

/**
 * Declares a step. Renders nothing itself: `<Stepper>` reads these props while
 * walking its children, because it needs each step's index and the total to
 * build the position text and to suppress the last connector. Same pattern as
 * `Breadcrumbs.Item`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StepperItem = (_: StepperItemProps) => null;
