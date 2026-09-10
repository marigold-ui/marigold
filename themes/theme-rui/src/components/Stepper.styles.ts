import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Stepper: ThemeComponent<'Stepper'> = {
  container: cva({
    base: 'm-0 flex grow list-none items-start gap-2 p-0',
  }),
  item: cva({
    base: 'flex grow items-center gap-2 last:grow-0',
  }),
  link: cva({
    base: [
      'flex min-h-11 items-center gap-2 rounded-sm bg-transparent',
      'text-left no-underline',
      '[&:is(a,button)]:ui-interactive',
      'transition-colors motion-reduce:transition-none',
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
      'in-data-[state=current]:bg-primary in-data-[state=current]:text-primary-foreground in-data-[state=current]:border-transparent',
      'in-data-[state=error]:text-destructive-accent in-data-[state=error]:border-destructive-accent',
      '[&_svg]:size-4',
    ],
  }),
  count: cva({
    base: 'text-secondary shrink-0 text-sm font-medium tabular-nums',
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
    ],
  }),
  connector: cva({
    base: [
      'bg-surface-border h-0.5 min-w-4 flex-1',
      'transition-colors motion-reduce:transition-none',
      'in-data-completed:bg-success-accent',
    ],
  }),
};
