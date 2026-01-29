import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarGroupLabelProps {
  children?: ReactNode;
}

export const SidebarGroupLabel = ({ children }: SidebarGroupLabelProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return <div className={classNames.groupLabel}>{children}</div>;
};

export interface SidebarGroupProps {
  children?: ReactNode;
}

export const SidebarGroup = ({ children }: SidebarGroupProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <div role="group" className={cn(classNames.group)}>
      {children}
    </div>
  );
};
