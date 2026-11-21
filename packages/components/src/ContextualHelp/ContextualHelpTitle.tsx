import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components/Heading';
import { cn, useClassNames } from '@marigold/system';

export interface ContextualHelpTitleProps {
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
