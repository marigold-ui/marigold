import React, { HTMLAttributes } from 'react';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface UnderlayProps extends HTMLAttributes<HTMLElement> {
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Underlay = ({ size, variant, ...props }: UnderlayProps) => {
  const classNames = useClassNames({ component: 'Underlay', size, variant });
  return <div className={cn('fixed inset-0 z-40', classNames)} {...props} />;
};
