import { ReactNode } from 'react';

import { cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface HeaderProps extends Omit<HtmlProps<'header'>, 'className'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Header = ({ children, variant, size, ...props }: HeaderProps) => {
  const classNames = useClassNames({
    component: 'Header',
    variant,
    size,
  });
  return (
    <header {...props} className={cn(classNames)}>
      {children}
    </header>
  );
};
