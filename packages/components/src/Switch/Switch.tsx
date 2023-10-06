import { forwardRef } from 'react';
import {
  Switch as RACSwitch,
  SwitchProps as RACSwitchProps,
} from 'react-aria-components';

import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

type RemovedProps = 'className' | 'isDisabled' | 'isReadOnly' | 'isSelected';

export interface SwitchProps extends Omit<RACSwitchProps, RemovedProps> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  disabled?: RACSwitchProps['isDisabled'];
  readOnly?: RACSwitchProps['isReadOnly'];
  selected?: RACSwitchProps['isSelected'];
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      variant,
      size,
      width = 'full',
      children,
      selected,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const classNames = useClassNames({ component: 'Switch', size, variant });

    return (
      <RACSwitch ref={ref} className={cn(twWidth[width])} {...props}>
        {children}
      </RACSwitch>
    );
  }
);
