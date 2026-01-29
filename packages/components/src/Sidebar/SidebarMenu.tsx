import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useSidebar } from './Context';

export interface SidebarMenuProps {
  children?: ReactNode;
}

export const SidebarMenu = ({ children }: SidebarMenuProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return <ul className={cn(classNames.menu)}>{children}</ul>;
};

export interface SidebarMenuItemProps {
  children?: ReactNode;
}

export const SidebarMenuItem = ({ children }: SidebarMenuItemProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return <li className={cn(classNames.menuItem)}>{children}</li>;
};

export interface SidebarMenuButtonProps {
  children?: ReactNode;
  /** Whether this menu button represents the current page. */
  active?: boolean;
  /** Optional href to render as link. */
  href?: string;
  /** Click handler. */
  onPress?: () => void;
}

export const SidebarMenuButton = ({
  children,
  active,
  href,
  onPress,
}: SidebarMenuButtonProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  const Element = href ? 'a' : 'button';
  const elementProps = href
    ? { href }
    : { type: 'button' as const, onClick: onPress };

  return (
    <Element
      {...elementProps}
      aria-current={active ? 'page' : undefined}
      className={cn(classNames.menuButton)}
      data-active={active || undefined}
    >
      {children}
    </Element>
  );
};
