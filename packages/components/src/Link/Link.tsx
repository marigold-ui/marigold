import React, { useRef } from 'react';
import { useLink } from '@react-aria/link';
import { conditional } from '@marigold/system';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

// Theme Extension
// ---------------
export interface LinkThemeExtension<Value> {
  link?: Value;
}

// Props
// ---------------
export interface LinkOwnProps extends BoxOwnProps {
  disabled?: boolean;
}
export interface LinkProps extends PolymorphicProps<LinkOwnProps, 'a'> {}

// Component
// ---------------
export const Link = (({
  as = 'a',
  variant = '',
  children,
  disabled,
  ...props
}: LinkProps) => {
  const ref = useRef(null);
  const { linkProps } = useLink(
    {
      // We typecast here because the element could very well be a `span`
      ...(props as PolymorphicProps<LinkOwnProps, any>),
      elementType: typeof as === 'string' ? as : 'span',
      isDisabled: disabled,
    },
    ref
  );

  return (
    <Box
      as={as}
      variant={conditional(`link.${variant}`, { disabled })}
      css={{ cursor: disabled ? 'default' : 'pointer' }}
      ref={ref}
      {...props}
      {...linkProps}
    >
      {children}
    </Box>
  );
}) as PolymorphicComponent<LinkOwnProps, 'a'>;
