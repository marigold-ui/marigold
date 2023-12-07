import { forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  OverlayTriggerStateContext,
  Popover,
  PopoverContext,
} from 'react-aria-components';

import { cn, useClassNames, useSmallScreen } from '@marigold/system';

import { Dialog } from '../Dialog';
import { Modal } from './Modal';
import { Underlay } from './Underlay';

// Props
// ---------------
export interface PopoverProps
  extends Omit<
    RAC.PopoverProps,
    'isOpen' | 'isKeyboardDismissDisabled' | 'style' | 'className'
  > {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ keyboardDismissDisabled, placement, open, children, ...rest }, ref) => {
    const props: RAC.PopoverProps = {
      isKeyboardDismissDisabled: keyboardDismissDisabled,
      isOpen: open,
      placement,
      ...rest,
    };
    const classNames = useClassNames({
      component: 'Popover',
      variant: placement,
      // Make Popover as wide as trigger element
      className: 'min-w-[--trigger-width]',
    });

    const ctx = useContext(OverlayTriggerStateContext);
    console.log(ctx && ctx.isOpen);

    const isSmallScreen = useSmallScreen();
    return (
      <>
        {isSmallScreen ? (
          <>
            {/* <Underlay variant="modal" /> */}
            {/* {ctx?.isOpen && <div className="fixed inset-0">test</div>} */}
            <Popover
              ref={ref}
              className={cn(
                '!left-0 bottom-0 !mt-auto flex !max-h-fit w-full flex-col'
              )}
              {...props}
            >
              {children}
            </Popover>
          </>
        ) : (
          <Popover ref={ref} {...props} className={classNames}>
            {children}
          </Popover>
        )}
      </>
    );
  }
);

export { _Popover as Popover };
