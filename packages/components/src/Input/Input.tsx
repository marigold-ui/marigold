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
      <div className={cn('relative flex items-center', classNames.container)}>
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
            'disabled:cursor-not-allowed',
            // Make the input disappear
            'flex-1 appearance-none border-none bg-transparent outline-none',
            classNames.input
          )}
          ref={ref}
          type={type}
        />
        {action ? action : null}
      </div>
    );
  }
);
