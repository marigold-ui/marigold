import React, { forwardRef, ReactElement } from 'react';
import { HtmlProps } from '@marigold/types';
import { Box, useComponentStylesFromTV, useStateProps } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { mergeProps } from '@react-aria/utils';

// Props
// ---------------
export interface InputOwnProps extends Omit<HtmlProps<'input'>, 'size'> {
  icon?: ReactElement;
  action?: ReactElement;
  variant?: string;
  size?: string;
}

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>,
    InputOwnProps {}

// Component
// ---------------
export const Input = forwardRef<HTMLInputElement, InputOwnProps>(
  (
    { type = 'text', icon, action, variant, size, ...props }: InputOwnProps,
    ref
  ) => {
    const classNames = useComponentStylesFromTV('Input', {
      variant,
      size,
      slots: ['container', 'input', 'icon'],
    });
    const stateProps = useStateProps({
      hasIcon: icon ? true : false,
    });

    const styledInput = tv({
      slots: {
        input: ['w-full border-0 outline-0'],
        container: ['flex relative w-full items-center'],
        icon: ['absolute pointer-events-none'],
      },
    });

    return (
      <div
        className={twMerge(styledInput().container(), classNames.container())}
      >
        <Box
          as="input"
          {...mergeProps(props, stateProps)}
          className={twMerge(styledInput().input(), classNames.input())}
          ref={ref}
          type={type}
        />
        {icon && (
          <div className={twMerge(styledInput().icon(), classNames.icon())}>
            {icon}
          </div>
        )}
        <div className="absolute right-8 inline-flex">{action}</div>
      </div>
    );
  }
);
