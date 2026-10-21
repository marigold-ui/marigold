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
      ref={isTray ? pinTrayHeight : undefined}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto',
        classNames.content,
        // Bled: drop the horizontal padding and re-publish it as `--bleed-px`
        // so edge-aware children inset to align with the title. Non-bled
        // clears it, as in `Drawer.Content` and `Panel.Content`.
        bleed ? 'px-0 [--bleed-px:var(--popover-px)]' : '[--bleed-px:initial]'
      )}
    >
      {children}
    </div>
  );
};
