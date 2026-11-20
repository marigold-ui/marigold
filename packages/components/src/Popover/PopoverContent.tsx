import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { followSheetContent } from '../Overlay/Sheet';
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

// Component
// ---------------
export const PopoverContent = ({ children, bleed }: PopoverContentProps) => {
  const { classNames, isTray } = usePopoverContext();

  return (
    <div
      data-slot="content"
      data-bleed={bleed || undefined}
      // A collection renders late, so the pin follows the height as it grows.
      ref={isTray ? followSheetContent : undefined}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto',
        // Bled: drop the padding and publish `--bleed-px` so edge-aware
        // children inset their own content to align with the title.
        // Non-bled clears it, as in `Panel.Content` and `Drawer.Content`.
        bleed
          ? '[--bleed-px:var(--popover-px)]'
          : 'px-(--popover-px) [--bleed-px:initial]',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
