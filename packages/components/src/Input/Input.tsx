import React, { forwardRef, ReactElement } from 'react';
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

    return (
      <div className="relative flex items-center">
        {icon && (
          <div
            data-icon=""
            className={cn(
              'peer',
              'pointer-events-none absolute',
              classNames.icon
            )}
          >
            {icon}
          </div>
        )}
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
        {action && (
          <div
            className={cn('absolute bottom-0 right-0 top-0', classNames.action)}
          >
            {action}
          </div>
        )}
      </div>
    );
  }
);
