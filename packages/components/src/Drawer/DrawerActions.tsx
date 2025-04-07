import type { CSSProperties, ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useDrawerContext } from './Context';

export interface DrawerActionsRenderProps {
  close: () => void;
}

export interface DrawerActions {
  variant?: string;
  size?: string;
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

export const DrawerActions = ({ variant, size, children }: DrawerActions) => {
  const ctx = useDrawerContext();
  const classNames = useClassNames({
    component: 'Drawer',
    variant: variant ?? ctx.variant,
    size: size ?? ctx.size,
  });

  return (
    <div
      className={cn('[grid-area:actions]', classNames.actions)}
      style={{ '--i': 2 } as CSSProperties}
    >
      {children}
    </div>
  );
};
