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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StepperItem = (_: StepperItemProps) => null;
