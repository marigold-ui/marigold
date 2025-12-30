import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

export interface DialogContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export const DialogContent = ({
  variant,
  size,
  children,
}: DialogContentProps) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  return (
    <div
      className={cn(
        'min-h-0 overflow-y-auto [grid-area:content]',
        classNames.content
      )}
      data-testid="dialog-content"
    >
      {children}
    </div>
  );
};
