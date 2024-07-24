import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';

import { cn, useClassNames, useSmallScreen } from '@marigold/system';

import { usePortalContainer } from '../Provider/OverlayContainerProvider';
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
  container?: Element;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { keyboardDismissDisabled, placement, open, children, container, ...rest },
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
      // Make Popover as wide as trigger element
      className: 'min-w-[--trigger-width]',
    });

    const isSmallScreen = useSmallScreen();
    const portal = usePortalContainer();

    return (
      <>
        {isSmallScreen ? (
          <>
            <Underlay open={open} variant="modal" />
            <Popover
              ref={ref}
              {...props}
              className={cn(
                '!fixed !bottom-0 !left-0 !top-auto !max-h-fit w-full'
              )}
              UNSTABLE_portalContainer={portal as Element}
            >
              {children}
            </Popover>
          </>
        ) : (
          <Popover
            ref={ref}
            {...props}
            className={classNames}
            placement={placement}
            offset={0}
            UNSTABLE_portalContainer={portal as Element}
          >
            {children}
          </Popover>
        )}
      </>
    );
  }
);

export { _Popover as Popover };
