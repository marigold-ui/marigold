import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { TRAY_CONTENT_ATTR, useTrayContext } from './Context';

// Props
// ---------------
export interface TrayContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * Additional class names to apply to the content container
   * useful when component specific styles are needed
   */
  className?: string;
}

// Component
// ---------------
export const TrayContent = ({ children, className }: TrayContentProps) => {
  const { classNames } = useTrayContext();

  return (
    <div
      ref={node => {
        const container = node?.parentElement;
        if (!node || !container || node.style.minHeight || !node.offsetHeight) {
          return;
        }
        const pinned = node.offsetHeight;
        const chrome = container.offsetHeight - pinned;

        node.style.minHeight = `min(${pinned}px, calc(var(--tray-available) - ${chrome}px))`;
      }}
      {...{ [TRAY_CONTENT_ATTR]: true }}
      className={cn('[grid-area:content]', classNames.content, className)}
    >
      {children}
    </div>
  );
};
