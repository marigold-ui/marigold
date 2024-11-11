import { useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

export interface DialogActionsRenderProps {
  close: () => void;
}

export interface DialogActions {
  /**
   * Children of the component.
   */
  children?: ReactNode | ((opts: DialogActionsRenderProps) => ReactNode);
  variant?: string;
  size?: string;
}

export const DialogActions = ({ variant, size, children }: DialogActions) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  const { close } = useContext(OverlayTriggerStateContext)!;
  const computedChildren = useMemo(() => {
    return typeof children === 'function' ? children({ close }) : children;
  }, [children]);

  return (
    <div className={cn('[grid-area:actions]', classNames.actions)}>
      {computedChildren}
    </div>
  );
};
