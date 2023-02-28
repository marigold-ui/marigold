import {
  Box,
  ResponsiveStyleValue,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';
import React, { ReactNode } from 'react';
import { InputField } from './InputField';
import { Label } from '../Label';

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

  console.log(props);
  return (
    <Box
      __baseCSS={{
        position: 'relativ',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: space,
      }}
      css={styles}
      {...props}
    >
      <Box __baseCSS={{ position: 'absolute' }}>{leading}</Box>

      {input}
      {trailing}
    </Box>
  );
};

Input.Field = InputField;
