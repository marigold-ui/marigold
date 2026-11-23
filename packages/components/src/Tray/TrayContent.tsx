import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { pinSheetContent } from '../Overlay/Sheet';
import { useTrayContext } from './Context';

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
      data-slot="content"
      // Re-runs each render until the content first has a height, then pins once.
      ref={node => {
        if (!node || node.style.minHeight || !node.offsetHeight) {
          return;
        }
        pinSheetContent(node, node.offsetHeight);
      }}
      className={cn('[grid-area:content]', classNames.content, className)}
    >
      {children}
    </div>
  );
};
