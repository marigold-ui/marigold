import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarFooterProps {
  children?: ReactNode;
}

export const SidebarFooter = ({ children }: SidebarFooterProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <div className={cn('[grid-area:footer]', classNames.footer)}>
      {children}
    </div>
  );
};
