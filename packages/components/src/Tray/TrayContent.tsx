import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

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
  const classNames = useClassNames({
    component: 'Tray',
  });

  return (
    <div
      ref={node => {
        if (node && !node.style.minHeight) {
          node.style.minHeight = `${node.offsetHeight}px`;
        }
      }}
      className={cn('[grid-area:content]', classNames.content, className)}
    >
      {children}
    </div>
  );
};
