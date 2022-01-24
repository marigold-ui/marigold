import React, { useRef } from 'react';
import { useLink } from '@react-aria/link';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

import { Text, TextOwnProps } from '../Text';

// Theme Extension
// ---------------
export interface LinkThemeExtension<Value> {
  link?: Value;
}

// Props
// ---------------
export type LinkOwnProps = { disabled?: boolean } & TextOwnProps;
export type LinkProps = PolymorphicProps<LinkOwnProps, 'a'>;

// Component
// ---------------
export const Link = (({
  as = 'a',
  variant = 'link',
  children,
  disabled,
  ...props
}: LinkProps) => {
  const ref = useRef<any>();
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
    <Text {...props} {...linkProps} as={as} variant={variant} ref={ref}>
      {children}
    </Text>
  );
}) as PolymorphicComponent<LinkOwnProps, 'a'>;
