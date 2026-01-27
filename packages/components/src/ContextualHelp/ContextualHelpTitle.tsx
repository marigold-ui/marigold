import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

export interface ContextualHelpTitleProps {
  children: ReactNode;
  variant?: string;
  size?: string;
}

export const ContextualHelpTitle = ({
  children,
  variant,
  size,
}: ContextualHelpTitleProps) => {
  const classNames = useClassNames({
    component: 'ContextualHelp',
    variant,
    size,
  });

  return (
    <Heading className={cn('[grid-area:title]', classNames.title)}>
      {children}
    </Heading>
  );
};
