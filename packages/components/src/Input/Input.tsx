import {
  Box,
  ResponsiveStyleValue,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';
import React, { ReactNode } from 'react';
import { InputField } from './InputField';

// Theme Extension
// ---------------
export interface InputThemeExtension extends ThemeExtension<'Input'> {}

// Props
// ---------------
export interface InputProps extends Omit<HtmlProps<'div'>, 'size'> {
  children: ReactNode;
  space?: ResponsiveStyleValue<string>;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Input = ({
  space = 'xsmall',
  children,
  variant,
  size,
  ...props
}: InputProps) => {
  const [leading, input, trailing] = React.Children.toArray(children);

  const styles = useComponentStyles('Input', { variant, size });

  return (
    <Box
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: space,
      }}
      css={styles}
      {...props}
    >
      {leading}
      {input}
      {trailing}
    </Box>
  );
};

Input.Field = InputField;
