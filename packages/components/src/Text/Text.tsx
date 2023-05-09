import React from 'react';
import { cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface TextProps extends HtmlProps<'p'> {
  children?: React.ReactNode;
  variant?: string;
  align?: string;
  color?: string;
  size?: string;
}

// Component
// ---------------
export const Text = ({
  variant,
  size,
  color,
  align,
  className,
  children,
  ...props
}: TextProps) => {
  const classNames = useClassNames({
    component: 'Text',
    variant,
    size,
    className: cn([color, align]),
  });

  return (
    <p {...props} className={classNames}>
      {children}
    </p>
  );
};
