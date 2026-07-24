import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components/Heading';
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
    // `slot="title"` lets the surrounding RAC `<Dialog>` wire its
    // `aria-labelledby` to this heading (same pattern as `DialogTitle`).
    <Heading slot="title" className={cn('[grid-area:title]', classNames.title)}>
      {children}
    </Heading>
  );
};
