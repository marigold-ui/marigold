import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarContentProps {
  children?: ReactNode;
}

export const SidebarContent = ({ children }: SidebarContentProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <div
      className={cn('overflow-y-auto [grid-area:content]', classNames.content)}
    >
      {children}
    </div>
  );
};
