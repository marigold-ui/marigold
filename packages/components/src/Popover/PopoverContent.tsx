import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { pinTrayContentHeight } from '../Tray/Context';
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
 * Pins the content's height so the tray does not shrink while the user
 * filters a list inside it. Same measurement as `Tray.Content`, but against
 * the tray dialog, since this content sits one level deeper. It follows the
 * height instead of measuring once: a React Aria collection renders its items
 * in a second pass, so the first layout only holds the padding. The pin only
 * grows, so filtering never shrinks the tray.
 */
const pinTrayHeight = (node: HTMLDivElement | null) => {
  const tray = node?.closest<HTMLElement>('[role=dialog]');
  if (!node || !tray) {
    return;
  }
  let pinned = 0;
  const observer = new ResizeObserver(() => {
    const height = node.offsetHeight;
    if (height <= pinned) {
      return;
    }
    pinned = height;
    pinTrayContentHeight(node, pinned, tray.offsetHeight - height);
  });
  observer.observe(node);

  return () => observer.disconnect();
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
