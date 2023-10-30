import { ReactNode } from 'react';
import { Dialog, Popover } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

export interface PopoverProps
  extends Omit<RAC.PopoverProps, 'isKeyboardDismissDisabled' | 'children'> {
  keyboardDismissDisabled?: RAC.PopoverProps['isKeyboardDismissDisabled'];
}

const _Popover = ({ keyboardDismissDisabled, ...rest }: PopoverProps) => {
  const props: RAC.PopoverProps = {
    isKeyboardDismissDisabled: keyboardDismissDisabled,
    ...rest,
  };

  const classNames = useClassNames({
    component: 'Popover',
    variant: props.placement,
  });

  return (
    <Popover {...props} className={classNames}>
      <Dialog>{props.children as ReactNode}</Dialog>
    </Popover>
  );
};

export { _Popover as Popover };
