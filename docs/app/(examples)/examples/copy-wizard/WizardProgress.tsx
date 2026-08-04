'use client';

import { Check } from 'lucide-react';
import { cn } from '@marigold/system';

export interface WizardStep {
  id: number;
  label: string;
}

export interface WizardProgressProps {
  steps: WizardStep[];
  current: number;
  /** Steps the user already completed, so they may jump back to them. */
  completed: number[];
  onStepPress: (id: number) => void;
}

/**
 * Step indicator for a multi-step flow.
 *
 * Marigold has no Stepper component, so this is app-owned chrome — but it is
 * built from theme tokens rather than raw palette classes, so it follows the
 * theme like every Marigold component does. The three decisions worth copying:
 *
 * 1. It is a plain `<nav>`, not a `<Panel>`. A Panel is a *content* region of
 *    the page; progress chrome describes the page instead of holding part of
 *    it, so wrapping it in a surface adds a landmark that says nothing.
 * 2. It carries no background of its own. It sits on the page background, the
 *    Panels below it are the raised surfaces, and that contrast is what makes
 *    the page read as layered.
 * 3. Only the *circles* carry step state; the rail between them stays one
 *    neutral colour the whole way across. A rail that changes colour behind
 *    the completed steps says the same thing the checkmarks already say, and
 *    a rail that disappears reads as a broken layout.
 *
 * A constraint to know about when writing classes like these: only the token
 * utilities `@marigold/theme-rui` *itself* uses are available to you. Its
 * `styles.css` is pre-compiled Tailwind, so the tokens arrive as plain `:root`
 * custom properties and your own Tailwind build cannot generate new utilities
 * from them. `bg-success` and `text-secondary` work because the theme's own
 * component styles use them; `bg-success-accent` and `text-disabled` compile to
 * nothing at all. There is no error — the rule is simply absent. Check that a
 * semantic class actually paints before relying on it, and prefer a component
 * over a hand-written class wherever one exists.
 */
export const WizardProgress = ({
  steps,
  current,
  completed,
  onStepPress,
}: WizardProgressProps) => (
  <nav aria-label="Progress">
    <ol className="flex items-start">
      {steps.map((step, index) => {
        const isCurrent = step.id === current;
        const isDone = completed.includes(step.id);
        const canJump = !isCurrent && isDone;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="flex flex-1 items-start">
            <div className="flex w-20 shrink-0 flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => canJump && onStepPress(step.id)}
                disabled={!canJump}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full',
                  'text-sm font-semibold',
                  'focus-visible:ui-state-focus outline-none',
                  isCurrent && 'bg-primary text-primary-foreground',
                  isDone && 'bg-success text-success-foreground cursor-pointer',
                  !isCurrent &&
                    !isDone &&
                    'bg-control text-secondary border-control-border cursor-not-allowed border'
                )}
              >
                {isDone ? <Check className="size-4" aria-hidden /> : step.id}
                <span className="sr-only">{`Step ${step.id}: ${step.label}`}</span>
              </button>
              <span
                aria-hidden
                className={cn(
                  'text-center text-xs leading-tight',
                  isCurrent && 'text-foreground font-semibold',
                  !isCurrent && 'text-secondary'
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div aria-hidden className="bg-border mt-4 h-px flex-1" />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
