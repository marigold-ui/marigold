import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Underlay } from './Underlay';

// Props
// ---------------
export interface PopoverProps
  extends Omit<
    RAC.PopoverProps,
    'isOpen' | 'isKeyboardDismissDisabled' | 'style' | 'className' | 'children'
  > {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
  children: ReactNode;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { keyboardDismissDisabled, placement, offset = 0, open, children, ...rest },
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
      className: 'min-w-(--trigger-width)',
    });

    const isSmallScreen = useSmallScreen();

    return (
      <>
        {isSmallScreen ? (
          <Popover
            ref={ref}
            {...props}
            className={cn(
              'fixed! top-auto! bottom-0! left-0! max-h-fit! w-full',
              classNames
            )}
          >
            {children}
            <Underlay open={open} />
          </Popover>
        ) : (
          <Popover
            ref={ref}
            {...props}
            className={cn('flex', classNames)}
            placement={placement}
            offset={offset}
          >
            {children}
          </Popover>
        )}
      </>
    );
  }
);

export { _Popover as Popover };
