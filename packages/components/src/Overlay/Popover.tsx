import { Children, ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Dialog } from '../Dialog/Dialog';

// Props
// ---------------
export interface PopoverProps
  extends Omit<
    RAC.PopoverProps,
    'isOpen' | 'isKeyboardDismissDisabled' | 'styles' | 'className'
  > {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
}

// Component
// ---------------
const _Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ keyboardDismissDisabled, placement, open, ...rest }, ref) => {
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
    const childrenArr = Children.toArray(props.children as ReactNode);
    const [dialogTrigger, children] = childrenArr;
    return (
      <Dialog.Trigger isNonModal>
        {dialogTrigger}
        <Popover ref={ref} {...props} className={classNames}>
          <Dialog isNonModal>{children}</Dialog>
        </Popover>
      </Dialog.Trigger>
    );
  }
);

export { _Popover as Popover };
