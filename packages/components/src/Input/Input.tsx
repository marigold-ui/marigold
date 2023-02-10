import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';
import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface InputThemeExtension extends ThemeExtension<'Input'> {}

// Props
// ---------------
export interface InputOwnProps extends Omit<HtmlProps<'input'>, 'size'> {
  size?: string;
  variant?: string;
}

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>,
    InputOwnProps {}

// Component
// ---------------
export const Input = forwardRef<HTMLInputElement, InputOwnProps>(
  ({ variant, size, type = 'text', ...props }: InputOwnProps, ref) => {
    const styles = useComponentStyles('Input', { variant, size });
    return <Box {...props} ref={ref} as="input" type={type} css={styles} />;
  }
);
