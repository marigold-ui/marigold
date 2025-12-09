import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

export interface ContextualHelpContentProps {
  children: ReactNode;
  variant?: string;
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
