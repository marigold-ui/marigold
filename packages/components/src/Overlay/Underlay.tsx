import React, { HTMLAttributes } from 'react';
import { useClassNames } from '@marigold/system';

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
  return <div className={classNames} {...props} />;
};
