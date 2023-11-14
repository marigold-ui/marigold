import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components';

import { Dialog } from '../Dialog/Dialog';

// Props
// ---------------
export interface PopoverProps
  extends Omit<RAC.PopoverProps, 'isOpen' | 'isKeyboardDismissDisabled'> {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
}

// Component
// ---------------
const _Popover = ({ keyboardDismissDisabled, open, ...rest }: PopoverProps) => {
  const props: RAC.PopoverProps = {
    isKeyboardDismissDisabled: keyboardDismissDisabled,
    isOpen: open,
    ...rest,
  };
  return (
    <Popover {...props}>
      <Dialog>{props.children as ReactNode}</Dialog>
    </Popover>
  );
};

export { _Popover as Popover };
