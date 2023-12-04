import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';

import { cn, useClassNames, useSmallScreen } from '@marigold/system';

import { Underlay } from './Underlay';

// Props
// ---------------
export interface PopoverProps
  extends Omit<
    RAC.PopoverProps,
    'isOpen' | 'isKeyboardDismissDisabled' | 'className'
  > {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
  variant?: string;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { keyboardDismissDisabled, placement, open, children, variant, ...rest },
    ref
  ) => {
    const props: RAC.PopoverProps = {
      isKeyboardDismissDisabled: keyboardDismissDisabled,
      isOpen: open,
      placement,
      ...rest,
    };
    const classNames = useClassNames({
      component: 'Popover',
      variant: placement,
    });

    const isSmallScreen = useSmallScreen();
    return (
      <>
        {isSmallScreen ? (
          <Underlay variant="modal" open={open}>
            <Popover
              ref={ref}
              className={cn(
                '!left-0 bottom-0 !mt-auto flex !max-h-fit w-full flex-col'
              )}
              {...props}
            >
              {children}
            </Popover>
          </Underlay>
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
