import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePopoverContext } from './Context';

// Props
// ---------------
export interface PopoverContentProps {
  /**
   * The body of the popover. It scrolls when the popover runs out of room,
   * while a `<Title>`, `<Description>` and `<Popover.Search>` above it stay
   * in place.
   */
  children?: ReactNode;

  /**
   * Render the content edge-to-edge horizontally, skipping the popover's
   * horizontal padding. Publishes `--bleed-px` so edge-aware children
   * (`ListView`, `Accordion`, `Table`) inset their own content to stay aligned
   * with the title while their dividers reach the popover's edge. Mirrors
   * `Drawer.Content`'s and `Panel.Content`'s `bleed`.
   *
   * A `ListView` or `Table` placed directly in the content needs no `bleed`:
   * it reaches the popover's edges on its own, and drops the content's
   * vertical padding on the side where it is the first or last child.
   * @default false
   */
  bleed?: boolean;
}

// Helpers
// ---------------
/**
 * Pins the content's height on first layout so the tray does not shrink
 * while the user filters a list inside it. Same measurement as
 * `Tray.Content`, but against the tray dialog, since this content sits one
 * level deeper.
 */
const pinTrayHeight = (node: HTMLDivElement | null) => {
  const tray = node?.closest<HTMLElement>('[role=dialog]');
  if (!node || !tray || node.style.minHeight || !node.offsetHeight) {
    return;
  }
  const pinned = node.offsetHeight;
  const chrome = tray.offsetHeight - pinned;

  node.style.minHeight = `min(${pinned}px, calc(var(--tray-available) - ${chrome}px))`;
};

// Component
// ---------------
export const PopoverContent = ({ children, bleed }: PopoverContentProps) => {
  const { classNames, isTray } = usePopoverContext();

  return (
    <div
      data-slot="content"
      data-bleed={bleed || undefined}
      ref={isTray ? pinTrayHeight : undefined}
      className={cn('min-h-0 flex-1 overflow-y-auto', classNames.content)}
    >
      {children}
    </div>
  );
};
