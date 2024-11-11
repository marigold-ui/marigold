import { useContext } from 'react';
import type { ReactNode } from 'react';
import {
  ButtonContext,
  DEFAULT_SLOT,
  OverlayTriggerStateContext,
  Provider,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

export interface DialogActionsRenderProps {
  close: () => void;
}

export interface DialogActions {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export const DialogActions = ({ variant, size, children }: DialogActions) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  const closeButtonClassNames = useClassNames({
    component: 'Button',
    variant: 'secondary',
  });
  const confirmButtonClassNames = useClassNames({
    component: 'Button',
    variant: 'primary',
  });

  const { close } = useContext(OverlayTriggerStateContext)!;
  const closeButtonProps = { className: closeButtonClassNames, onPress: close };
  const confirmButtonProps = { className: confirmButtonClassNames };

  return (
    <div className={cn('[grid-area:actions]', classNames.actions)}>
      <Provider
        values={[
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                close: closeButtonProps,
                confirm: confirmButtonProps,
              },
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
};
