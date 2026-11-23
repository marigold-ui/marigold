import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

export interface DialogContentProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: string;
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
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
      data-slot="content"
    >
      {children}
    </div>
  );
};
