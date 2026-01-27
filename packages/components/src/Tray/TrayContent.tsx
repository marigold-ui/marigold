import type { ReactNode } from 'react';
import { FocusScope } from '@react-aria/focus';
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
    <FocusScope autoFocus restoreFocus>
      <div className={cn('[grid-area:content]', classNames.content, className)}>
        {children}
      </div>
    </FocusScope>
  );
};
