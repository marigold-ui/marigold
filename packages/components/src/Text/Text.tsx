import React from 'react';
import { useComponentStylesFromTV } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { twMerge } from 'tailwind-merge';

// Props
// ---------------
export interface TextProps extends HtmlProps<'p'> {
  display?: string;
  align?: string;
  color?: string;
  cursor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  outline?: string;
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
}

// Component
// ---------------
export const Text = ({
  variant,
  size,
  display,
  align,
  color,
  fontSize,
  fontStyle,
  fontWeight,
  cursor,
  outline,
  className,
  children,
  ...props
}: TextProps) => {
  const classNames = useComponentStylesFromTV('Text', {
    variant,
    size,
  });

  return (
    <p {...props} className={twMerge(classNames, className)}>
      {children}
    </p>
  );
};
