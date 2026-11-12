import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

// Below `sm` the row turns into a counter, the current label and a segmented
// track. The DOM stays the same, only these styles switch.
export const Stepper: ThemeComponent<'Stepper'> = {
  root: cva({
    base: 'max-sm:flex-col max-sm:items-stretch max-sm:gap-1',
  }),
  summary: cva({
    // Desktop shows it only as the `hideLabels` counter.
    base: [
      'flex-wrap items-center gap-x-2',
      'in-data-hide-labels:flex max-sm:flex',
    ],
  }),
  count: cva({
    base: 'text-secondary shrink-0 text-sm font-medium tabular-nums',
  }),
  errorCount: cva({
    base: [
      'items-center gap-1 text-sm text-destructive-accent max-sm:inline-flex',
      '[&_svg]:size-4 [&_svg]:shrink-0',
    ],
  }),
  currentLabel: cva({
    base: [
      'basis-full items-start gap-1.5 font-medium text-foreground max-sm:flex',
      'data-[state=error]:text-destructive-accent',
      '[&_svg]:size-4',
    ],
  }),
  container: cva({
    base: [
      'm-0 flex grow list-none items-start gap-2 p-0',
      'max-sm:items-stretch max-sm:gap-0',
    ],
  }),
  item: cva({
    base: [
      'flex grow items-center gap-2 last:grow-0',
      // Equal share of the width, so many steps never overflow.
      'max-sm:basis-0 max-sm:last:grow',
    ],
  }),
  link: cva({
    base: [
      'flex min-h-11 items-center gap-2 rounded-sm bg-transparent',
      'text-left no-underline',
      '[&:is(a,button)]:ui-interactive',
      // Room for the focus ring, layout unchanged.
      'px-1 -mx-1',
      'transition-colors motion-reduce:transition-none',
      // The whole cell is the touch target, the gap between bars sits inside it.
      'max-sm:mx-0 max-sm:w-full max-sm:px-px',
    ],
  }),
  marker: cva({
    base: [
      'flex size-8 shrink-0 items-center justify-center rounded-full',
      'border-control-border border text-sm font-medium tabular-nums',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      'in-data-[state=disabled]:text-secondary in-data-[state=disabled]:border-dashed',
      'in-data-[state=completed]:bg-success-accent in-data-[state=completed]:text-success-foreground in-data-[state=completed]:border-transparent',
      // The fill comes from `currentIndicator`, which glides between steps.
      'in-data-current:text-primary-foreground in-data-current:border-transparent',
      // A failed step that is current keeps the current fill.
      'in-data-[state=error]:not-in-data-current:text-destructive-accent in-data-[state=error]:not-in-data-current:border-destructive-accent',
      '[&_svg]:size-4',
      'max-sm:hidden',
    ],
  }),
  label: cva({
    base: [
      'text-sm',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      'in-data-[state=disabled]:text-secondary',
      'in-data-[state=current]:text-foreground',
      'in-data-current:font-medium',
      'in-data-[state=completed]:text-foreground',
      'in-data-[state=error]:text-destructive-accent',
      'max-sm:sr-only',
    ],
  }),
  connector: cva({
    base: ['bg-surface-border h-0.5 min-w-4 flex-1', 'max-sm:hidden'],
  }),
  segment: cva({
    base: [
      'bg-border h-1 w-full rounded-full',
      'max-sm:block',
      'in-data-[state=error]:bg-destructive-accent',
      'in-data-[state=disabled]:bg-transparent in-data-[state=disabled]:border in-data-[state=disabled]:border-dashed in-data-[state=disabled]:border-control-border',
    ],
  }),
  progressFill: cva({
    base: [
      'bg-success-accent scale-x-0',
      'transition-transform duration-250 ease-out-quart motion-reduce:transition-none',
      'in-data-completed:scale-x-100',
    ],
  }),
  currentIndicator: cva({
    base: 'bg-primary',
  }),
};
