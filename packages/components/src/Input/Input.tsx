import React, { cloneElement, forwardRef, ReactElement } from 'react';
import { HtmlProps } from '@marigold/types';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface InputOwnProps
  extends Omit<HtmlProps<'input'>, 'size' | 'className'> {
  icon?: ReactElement;
  action?: ReactElement;
  variant?: string;
  size?: string;
  className?: {
    container?: string;
    input?: string;
    icon?: string;
  };
}

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'className'>,
    InputOwnProps {}

// Component
// ---------------
export const Input = forwardRef<HTMLInputElement, InputOwnProps>(
  (
    {
      type = 'text',
      icon,
      action,
      variant,
      size,
      className,
      ...props
    }: InputOwnProps,
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Input',
      variant,
      size,
      className,
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
        <input
          {...props}
          className={cn(
            'flex-1',
            'disabled:cursor-not-allowed',
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
