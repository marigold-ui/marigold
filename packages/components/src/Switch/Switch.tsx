import { ReactNode, forwardRef } from 'react';
import { Switch } from 'react-aria-components';
import type RAC from 'react-aria-components';

import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

type RemovedProps =
  | 'className'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isSelected'
  | 'children';

export interface SwitchProps extends Omit<RAC.SwitchProps, RemovedProps> {
  variant?: string;
  size?: string;
  children?: ReactNode;
  width?: WidthProp['width'];
  disabled?: RAC.SwitchProps['isDisabled'];
  readOnly?: RAC.SwitchProps['isReadOnly'];
  selected?: RAC.SwitchProps['isSelected'];
}

const _Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
      <Switch
        {...props}
        ref={ref}
        className={cn(
          twWidth[width],
          'group/switch',
          'flex items-center justify-between gap-[1ch]',
          classNames.container
        )}
        isDisabled={disabled}
        isReadOnly={readOnly}
      >
        {children}
        <div className=" relative">
          <div
            className={cn(
              'h-6 w-12 basis-12 rounded-3xl group-disabled/switch:cursor-not-allowed ',
              classNames.track
            )}
          >
            <div
              className={cn(
                'h-[22px] w-[22px]',
                'cubic-bezier(.7,0,.3,1)',
                'absolute left-0 top-px',
                'block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform',
                'group-selected/switch:translate-x-[calc(47px_-_100%)]',
                classNames.thumb
              )}
            />
          </div>
        </div>
      </Switch>
    );
  }
);

export { _Switch as Switch };
