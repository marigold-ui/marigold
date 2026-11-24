import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

export interface ContextualHelpContentProps {
  /** Children of the component. */
  children: ReactNode;
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

export const ContextualHelpContent = ({
  children,
  variant,
  size,
}: ContextualHelpContentProps) => {
  const classNames = useClassNames({
    component: 'ContextualHelp',
    variant,
    size,
  });

  return (
    <div
      className={cn(
        'min-h-0 overflow-y-auto [grid-area:content]',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
