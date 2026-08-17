import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Stepper: ThemeComponent<'Stepper'> = {
  container: cva({
    base: 'm-0 flex list-none items-start p-0',
  }),
  /**
   * Every step but the last stretches so its connector fills the gap to the
   * next marker. The last one shrinks to its content, otherwise it drags a stub
   * of empty space behind it.
   */
  item: cva({
    base: 'flex flex-1 items-center gap-2 last:flex-none',
  }),
  /**
   * Only the interactive elements (Link/Button) ever receive focus, so the ring
   * simply never applies to an inert `<span>` step. `min-h-11` keeps the pointer
   * target at 44px, well above WCAG 2.5.8's 24px floor.
   */
  link: cva({
    base: [
      'flex min-h-11 items-center gap-2 rounded-sm bg-transparent',
      'text-left no-underline',
      'ui-state-focus',
      'transition-colors motion-reduce:transition-none',
    ],
  }),
  marker: cva({
    base: [
      'flex size-8 shrink-0 items-center justify-center rounded-full',
      'border-surface-border border text-sm font-medium tabular-nums',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      'in-data-[state=disabled]:text-disabled in-data-[state=disabled]:border-disabled',
      'in-data-[state=completed]:bg-success in-data-[state=completed]:text-success-foreground in-data-[state=completed]:border-transparent',
      'in-data-[state=current]:ui-control in-data-[state=current]:border-transparent',
      'in-data-[state=error]:text-destructive-accent in-data-[state=error]:border-destructive-accent',
      '[&_svg]:size-4',
    ],
  }),
  label: cva({
    base: [
      'text-sm',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      'in-data-[state=disabled]:text-disabled',
      'in-data-[state=current]:text-foreground in-data-[state=current]:font-medium',
      'in-data-[state=completed]:text-foreground',
      'in-data-[state=error]:text-destructive-accent',
    ],
  }),
  /**
   * Decorative and `aria-hidden`, so it carries colour only. It reads the state
   * of the step it trails, which is why a completed step's connector is filled
   * and an upcoming step's is not.
   */
  connector: cva({
    base: [
      'bg-surface-border h-px min-w-4 flex-1',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=completed]:bg-success',
    ],
  }),
};
