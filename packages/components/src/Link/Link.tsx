import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Text } from '../Text';

export type LinkProps = {
  variant?: string;
} & ComponentProps<'a'>;

export const Link: React.FC<LinkProps> = ({
  variant = 'link',
  children,
  ...props
}) => (
  <Text {...props} as="a" variant={variant}>
    {children}
  </Text>
);
