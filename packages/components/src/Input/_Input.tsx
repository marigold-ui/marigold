import { ReactElement, cloneElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Input } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'size';

export interface InputProps extends Omit<RAC.InputProps, RemovedProps> {
  icon?: ReactElement;
  action?: ReactElement;
  variant?: string;
  size?: string;
}

export const _Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, icon, action, variant, size, ...props }: InputProps, ref) => {
    const classNames = useClassNames({
      component: 'Input',
      variant,
      size,
    });

    const inputIcon = icon
      ? cloneElement(icon, {
          className: cn(
            'pointer-events-none absolute',
            classNames.icon,
            icon.props.className
          ),
          ...icon.props,
        })
      : null;

    const inputAction =
      action && !props.readOnly
        ? cloneElement(action, {
            className: cn(
              'absolute',
              classNames.action,
              action.props.className
            ),
            ...action.props,
          })
        : null;

    return (
      <div
        className="group/input relative flex items-center"
        data-icon={icon && ''}
        data-action={action && ''}
      >
        {inputIcon}
        <Input
          {...props}
          className={cn(
            'w-full flex-1',
            'disabled:cursor-not-allowed',
            '[&[type=file]]:border-none [&[type=file]]:p-0',
            '[&[type=color]]:ml-0 [&[type=color]]:border-none [&[type=color]]:bg-transparent [&[type=color]]:p-0',
            classNames.input
          )}
          ref={ref}
          type={type}
        />
        {inputAction}
      </div>
    );
  }
);

export { _Input as Input };
