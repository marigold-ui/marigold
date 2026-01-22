import { ReactElement, cloneElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Input } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'size';

export interface InputProps extends Omit<RAC.InputProps, RemovedProps> {
  icon?: ReactElement<any>;
  action?: ReactElement<any>;
  variant?: string;
  size?: string;
  className?: string;
}

const _Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, icon, action, variant, size, className, ...props }: InputProps,
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Input',
      variant,
      size,
    });

    const inputIcon = icon
      ? cloneElement(icon, {
          ...icon.props,
          className: cn(
            'pointer-events-none absolute',
            classNames.icon,
            icon.props.className
          ),
        })
      : null;

    const inputAction =
      action && !props.readOnly
        ? cloneElement(action, {
            ...action.props,
            className: cn(
              'absolute right-0 cursor-pointer',
              classNames.action,
              action.props.className
            ),
          })
        : null;

    return (
      <div
        className={cn(
          'group/input relative flex w-(--field-width) max-w-full min-w-0 items-center'
        )}
        data-icon={icon && ''}
        data-action={action && ''}
      >
        {inputIcon}
        <Input
          {...props}
          className={cn(
            'flex-1',
            'disabled:cursor-not-allowed',
            '[&[type=file]]:border-none [&[type=file]]:p-0',
            '[&[type=color]]:ml-0 [&[type=color]]:border-none [&[type=color]]:bg-transparent [&[type=color]]:p-0',
            classNames.input,
            className
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
