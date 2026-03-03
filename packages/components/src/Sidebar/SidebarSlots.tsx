import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

// Shared props for all sidebar layout slots
// ---------------
export interface SidebarSlotProps {
  children?: ReactNode;
}

// SidebarHeader
// ---------------
export const SidebarHeader = ({ children }: SidebarSlotProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });
  return (
    <div className={cn('[grid-area:header]', classNames.header)}>
      {children}
    </div>
  );
};

// SidebarContent
// ---------------
export const SidebarContent = ({ children }: SidebarSlotProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });
  return (
    <div
      className={cn('overflow-y-auto [grid-area:content]', classNames.content)}
    >
      {children}
    </div>
  );
};

// SidebarFooter
// ---------------
export const SidebarFooter = ({ children }: SidebarSlotProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });
  return (
    <div className={cn('[grid-area:footer]', classNames.footer)}>
      {children}
    </div>
  );
};
