import React, { HTMLAttributes } from 'react';
import { useComponentStylesFromTV } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

// Props
// ---------------
export interface UnderlayProps extends HTMLAttributes<HTMLElement> {
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Underlay = ({ size, variant, ...props }: UnderlayProps) => {
  const styledUnderlay = tv({
    base: ['fixed inset-0 z-[1]'],
  });
  const classNames = useComponentStylesFromTV('Underlay', { size, variant });
  return <div className={twMerge(styledUnderlay(), classNames)} {...props} />;
};
