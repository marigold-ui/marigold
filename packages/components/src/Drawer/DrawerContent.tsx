import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useDrawerContext } from './Context';

// Props
// ---------------
export interface DrawerContentProps {
  variant?: string;
  size?: string;
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const DrawerContent = ({
  variant,
  size,
  children,
}: DrawerContentProps) => {
  const ctx = useDrawerContext();
  const classNames = useClassNames({
    component: 'Drawer',
    variant: variant ?? ctx.variant,
    size: size ?? ctx.size,
  });

  return (
    <div className={cn('[grid-area:content]', classNames.content)}>
      {children}
    </div>
  );
};
