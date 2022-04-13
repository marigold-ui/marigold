import React, { useRef } from 'react';
import { useLink } from '@react-aria/link';
import { ThemeExtension, useComponentStyles } from '@marigold/system';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

// Theme Extension
// ---------------
export interface LinkThemeExtension extends ThemeExtension<'Link'> {}

// Props
// ---------------
export interface LinkOwnProps extends BoxOwnProps {
  disabled?: boolean;
  variant?: string;
}

export interface LinkProps extends PolymorphicProps<LinkOwnProps, 'a'> {}

// Component
// ---------------
export const Link = (({
  as = 'a',
  variant,
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

  const styles = useComponentStyles('Link', { variant });

  return (
    <Box as={as} css={styles} ref={ref} {...props} {...linkProps}>
      {children}
    </Box>
  );
}) as PolymorphicComponent<LinkOwnProps, 'a'>;
