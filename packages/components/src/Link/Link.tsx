import React, { useRef } from 'react';
import { useLink } from 'react-aria';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

import { Text, TextOwnProps } from '../Text';

export type LinkOwnProps = { disabled?: boolean } & TextOwnProps;
export type LinkProps = PolymorphicProps<LinkOwnProps, 'a'>;

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
      ...props,
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
