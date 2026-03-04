import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useSidebar } from './Context';

// Shared props for all sidebar layout slots
// ---------------
export interface SidebarSlotProps {
  children?: ReactNode;
}

// SidebarHeader
// ---------------
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarSlotProps>(
  ({ children }, ref) => {
    const { classNames } = useSidebar();
    return (
      <div ref={ref} className={cn('[grid-area:header]', classNames.header)}>
        {children}
      </div>
    );
  }
);

// SidebarFooter
// ---------------
export const SidebarFooter = forwardRef<HTMLDivElement, SidebarSlotProps>(
  ({ children }, ref) => {
    const { classNames } = useSidebar();
    return (
      <div ref={ref} className={cn('[grid-area:footer]', classNames.footer)}>
        {children}
      </div>
    );
  }
);
