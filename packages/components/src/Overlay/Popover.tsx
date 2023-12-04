import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface PopoverProps
  extends Omit<
    RAC.PopoverProps,
    'isOpen' | 'isKeyboardDismissDisabled' | 'style'
  > {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { keyboardDismissDisabled, placement, open, children, className, ...rest },
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

    return (
      <Popover ref={ref} {...props} className={cn(classNames, className)}>
        {children}
      </Popover>
    );
  }
);

export { _Popover as Popover };
