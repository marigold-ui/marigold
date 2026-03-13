import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarSlotProps {
  /** Content to render inside the sidebar slot. */
  children?: ReactNode;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarSlotProps>(
  ({ children }, ref) => {
    const { classNames } = useSidebar();
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-(--app-layout-header-height) items-center [grid-area:header]',
          classNames.header
        )}
      >
        {children}
      </div>
    );
  }
);

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
