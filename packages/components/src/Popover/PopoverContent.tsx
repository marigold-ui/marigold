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
export const PopoverContent = ({ children }: PopoverContentProps) => {
  const { classNames, isTray } = usePopoverContext();

  return (
    <div
      data-slot="content"
      ref={isTray ? pinTrayHeight : undefined}
      className={cn('min-h-0 flex-1 overflow-y-auto', classNames.content)}
    >
      {children}
    </div>
  );
};
