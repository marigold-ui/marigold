import React, { forwardRef } from 'react';
import { ComponentWithAs } from '@marigold/types';
import { Text, TextProps } from '../Text';

export type LinkProps = TextProps;

export const Link: ComponentWithAs<LinkProps, 'a'> = forwardRef(
  ({ variant = 'link', children, ...props }, ref) => {
    return (
      <Text as="a" variant={variant} ref={ref} {...props}>
        {children}
      </Text>
    );
  }
);
