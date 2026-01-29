import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarHeaderProps {
  children?: ReactNode;
}

export const SidebarHeader = ({ children }: SidebarHeaderProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <div className={cn('[grid-area:header]', classNames.header)}>
      {children}
    </div>
  );
};
