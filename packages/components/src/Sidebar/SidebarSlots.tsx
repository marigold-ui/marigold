import type { ReactNode, Ref } from 'react';
import { cn } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarSlotProps {
  /** Content to render inside the sidebar slot. */
  children?: ReactNode;
}

export const SidebarHeader = ({
  children,
  ref,
}: SidebarSlotProps & { ref?: Ref<HTMLDivElement> }) => {
  const { classNames } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-14 items-center [grid-area:header]',
        classNames.header
      )}
    >
      {children}
    </div>
  );
};

export const SidebarFooter = ({
  children,
  ref,
}: SidebarSlotProps & { ref?: Ref<HTMLDivElement> }) => {
  const { classNames } = useSidebar();
  return (
    <div ref={ref} className={cn('[grid-area:footer]', classNames.footer)}>
      {children}
    </div>
  );
};
