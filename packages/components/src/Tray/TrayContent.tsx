import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface TrayContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const TrayContent = ({ children }: TrayContentProps) => {
  const classNames = useClassNames({
    component: 'Tray',
  });

  return (
    <div className={cn('[grid-area:content]', classNames.content)}>
      {children}
    </div>
  );
};
