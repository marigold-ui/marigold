import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';
import { Box } from '@marigold/system';

// Props
// ---------------
export interface InputOwnProps extends Omit<HtmlProps<'input'>, 'size'> {}

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>,
    InputOwnProps {}

// Component
// ---------------
export const Input = forwardRef<HTMLInputElement, InputOwnProps>(
  ({ type = 'text', ...props }: InputOwnProps, ref) => {
    return (
      <Box
        __baseCSS={{ border: 0, width: '100%' }}
        {...props}
        ref={ref}
        as="input"
        type={type}
      />
    );
  }
);
