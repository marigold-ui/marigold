import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentPropsWithRef } from '@marigold/types';
import { Box, BoxProps } from '../Box';

export type TextProps = {
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: string;
  textColor?: string;
} & ComponentPropsWithRef<'span'> &
  BoxProps;

export const Text: React.FC<TextProps> = ({
  as = 'span',
  variant = 'body',
  textColor = 'inherit',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `text.${variant}`,
      color: textColor,
    },
    className
  );

  return (
    <Box as={as} className={classNames} {...props}>
      {children}
    </Box>
  );
};
