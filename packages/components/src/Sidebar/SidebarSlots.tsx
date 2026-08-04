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
        // Height comes from the theme's header recipe (h-topbar).
        'flex items-center [grid-area:header]',
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

// Brands so the rail collection builder can pick the brand/footer slots out of a
// `Sidebar.Rail`'s children.
SidebarHeader.__SIDEBAR_HEADER__ = true as const;
SidebarFooter.__SIDEBAR_FOOTER__ = true as const;
