import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

// Below `sm` the row turns into a segmented track above a counter and the
// current label. Only `currentIndicator` moves in the DOM, into the segment.
export const Stepper: ThemeComponent<'Stepper'> = {
  root: cva({
    base: 'max-sm:flex-col max-sm:items-stretch max-sm:gap-1',
  }),
  summary: cva({
    // Desktop shows it only as the `hideLabels` counter.
    base: [
      // Baselines, not boxes: the two sizes only line up on their text.
      'items-baseline gap-x-2',
      'in-data-hide-labels:flex max-sm:flex',
      // Under the track, so the label sits next to the content it names.
      'max-sm:order-1',
    ],
  }),
  count: cva({
    base: 'text-secondary shrink-0 text-sm font-medium tabular-nums',
  }),
  currentLabel: cva({
    base: [
      'min-w-0 flex-1 items-start gap-1.5 font-medium text-foreground max-sm:flex',
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
      '[&:not(a,button)]:cursor-not-allowed',
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
      'in-data-[state=disabled]:text-disabled in-data-[state=disabled]:border-control-edge-disabled in-data-[state=disabled]:border-dashed',
      'in-data-[state=completed]:bg-primary in-data-[state=completed]:text-primary-foreground in-data-[state=completed]:border-transparent',
      'in-data-[state=current]:text-foreground',
      // The outline comes from `currentIndicator`, which glides between steps.
      // A disabled step keeps its dashed look, even when current.
      'in-data-current:not-in-data-[state=disabled]:border-transparent',
      // A failed step that is current keeps the current outline.
      'in-data-[state=error]:text-destructive-accent',
      'in-data-[state=error]:not-in-data-current:border-destructive-accent',
      '[&_svg]:size-4',
      'max-sm:hidden',
    ],
  }),
  label: cva({
    base: [
      'text-sm',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      'in-data-[state=disabled]:text-disabled',
      'in-data-[state=current]:text-foreground',
      'in-data-current:font-semibold',
      'in-data-[state=completed]:text-foreground',
      'in-data-[state=error]:text-destructive-accent',
      'max-sm:sr-only',
    ],
  }),
  connector: cva({
    base: ['bg-border h-1 min-w-4 flex-1 rounded-full', 'max-sm:hidden'],
  }),
  segment: cva({
    base: [
      'bg-border h-1 w-full rounded-full',
      'max-sm:block',
      'in-data-[state=error]:bg-destructive-accent',
      // The warning icon above a failed segment.
      'text-destructive-accent [&_svg]:size-4',
      'in-data-[state=disabled]:bg-transparent in-data-[state=disabled]:border in-data-[state=disabled]:border-dashed in-data-[state=disabled]:border-control-edge-disabled',
    ],
  }),
  progressFill: cva({
    base: [
      'bg-primary scale-x-0',
      'transition-transform duration-250 ease-out-quart motion-reduce:transition-none',
      'in-data-completed:scale-x-100',
    ],
  }),
  currentIndicator: cva({
    base: [
      'data-[placement=marker]:border-2 data-[placement=marker]:border-primary',
      'data-[placement=segment]:bg-primary',
    ],
  }),
};
