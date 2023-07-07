import React, { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface HeaderProps extends HtmlProps<'header'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Header = ({
  children,
  variant,
  size,
  className,
  ...props
}: HeaderProps) => {
  const classNames = useClassNames({
    component: 'Header',
    variant,
    size,
    className,
  });
  return (
    <header {...props} className={cn(classNames)}>
      {children}
    </header>
  );
};
