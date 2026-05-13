import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { noSlot } from '../utils/noSlot';

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
    <Heading
      slot={noSlot}
      className={cn('[grid-area:title]', classNames.title)}
    >
      {children}
    </Heading>
  );
};
