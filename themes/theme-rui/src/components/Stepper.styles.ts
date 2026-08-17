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
      'focus-visible:ui-state-focus outline-none',
      'transition-colors motion-reduce:transition-none',
    ],
  }),
  marker: cva({
    base: [
      'flex size-8 shrink-0 items-center justify-center rounded-full',
      // `control-border` (26% alpha, 1.81:1) rather than `surface-border` (13%,
      // 1.33:1): the marker is the visible boundary of a control, not a surface
      // rim. Both sit under 3:1, which is true of every alpha border token in
      // this theme, so the step number carries the meaning and the ring is
      // support.
      'border-control-border border text-sm font-medium tabular-nums',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=upcoming]:text-secondary',
      // A disabled step is inert *text*, not an inactive control (it renders as
      // a <span>), so WCAG 1.4.3's exemption for disabled widgets does not
      // apply and `text-disabled` would fail contrast. It reads as secondary
      // like an upcoming step, and a dashed ring carries the "not available"
      // difference as shape rather than colour.
      'in-data-[state=disabled]:text-secondary in-data-[state=disabled]:border-dashed',
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
      // See the marker slot: an inert <span> is text, so it owes the full 4.5:1.
      'in-data-[state=disabled]:text-secondary',
      'in-data-[state=current]:text-foreground in-data-[state=current]:font-medium',
      'in-data-[state=completed]:text-foreground',
      'in-data-[state=error]:text-destructive-accent',
    ],
  }),
  /**
   * Decorative and `aria-hidden`: completion is carried by the marker icon, the
   * label and the visually hidden state text, so this line only has to be
   * *perceivable*, not to clear 1.4.11 on its own.
   *
   * Two things matter here. The done colour is `success-accent` (green-600,
   * 2.90:1), not `success` (green-100, 1.01:1) -- `success` is a surface fill
   * meant to sit behind dark text, and as a hairline it is invisible against
   * the page and indistinguishable from the undone connector, which defeats the
   * entire point of the connector. And the line is 2px, because 1px of a 13%
   * alpha rim reads as nothing at all.
   */
  connector: cva({
    base: [
      'bg-surface-border h-0.5 min-w-4 flex-1',
      'transition-colors motion-reduce:transition-none',
      'in-data-[state=completed]:bg-success-accent',
    ],
  }),
};
