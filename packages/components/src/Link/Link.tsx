import React, { ReactNode, useRef } from 'react';
import { useLink } from '@react-aria/link';
import { PressEvents } from '@react-types/shared';
import { ThemeExtension, useComponentStyles } from '@marigold/system';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

// Theme Extension
// ---------------
export interface LinkThemeExtension extends ThemeExtension<'Link'> {}

// Props
// ---------------
export interface LinkOwnProps extends PressEvents, BoxOwnProps {
  disabled?: boolean;
  variant?: string;
  size?: string;
  children?: ReactNode;
}

export interface LinkProps extends PolymorphicProps<LinkOwnProps, 'a'> {
  onClick: never;
}

// Component
// ---------------
export const Link = (({
  as = 'a',
  variant,
  size,
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

  const styles = useComponentStyles('Link', { variant, size });

  return (
    <Box as={as} css={styles} ref={ref} {...props} {...linkProps}>
      {children}
    </Box>
  );
}) as PolymorphicComponent<LinkOwnProps, 'a'>;
