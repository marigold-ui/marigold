import type { ReactNode } from 'react';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import type { TopNavigationProps } from '../TopNavigation/TopNavigation';

export interface AppLayoutHeaderProps {
  /**
   * The visual style variant of the top navigation.
   */
  variant?: TopNavigationProps['variant'];
  /**
   * The size of the top navigation.
   */
  size?: TopNavigationProps['size'];
  /**
   * If `true`, the navigation sticks to the top of the viewport on scroll.
   * @default true
   */
  sticky?: TopNavigationProps['sticky'];
  /**
   * The children of the component, typically `TopNavigation.Start`, `TopNavigation.Middle`, and `TopNavigation.End`.
   */
  children?: ReactNode;
}

export const AppLayoutHeader = ({
  variant,
  size,
  sticky,
  children,
}: AppLayoutHeaderProps) => (
  <TopNavigation variant={variant} size={size} sticky={sticky}>
    {children}
  </TopNavigation>
);
