import React from 'react';

import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface BadgeProps extends HtmlProps<'div'> {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });

  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};
