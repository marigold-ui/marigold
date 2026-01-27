import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface TrayContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  className?: string;
}

// Component
// ---------------
export const TrayContent = ({ children, className }: TrayContentProps) => {
  const classNames = useClassNames({
    component: 'Tray',
  });

  return (
    <div className={cn('[grid-area:content]', classNames.content, className)}>
      {children}
    </div>
  );
};
