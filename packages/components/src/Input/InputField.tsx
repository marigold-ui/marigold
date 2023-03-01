import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';
import { Box } from '@marigold/system';

// Props
// ---------------
export interface InputFieldOwnProps extends Omit<HtmlProps<'input'>, 'size'> {}

export interface InputFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>,
    InputFieldOwnProps {}

// Component
// ---------------
export const InputField = forwardRef<HTMLInputElement, InputFieldOwnProps>(
  ({ type = 'text', ...props }: InputFieldOwnProps, ref) => {
    return (
      <Box
        __baseCSS={{ border: 0, width: '100%', outline: 'none', pl: 'large' }}
        {...props}
        ref={ref}
        as="input"
        id="input"
        type={type}
      />
    );
  }
);
