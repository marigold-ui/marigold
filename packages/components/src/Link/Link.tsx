import React, { forwardRef, ReactNode } from 'react';
import { useLink } from '@react-aria/link';
import { PressEvents } from '@react-types/shared';
import { ThemeExtension, useComponentStyles } from '@marigold/system';
import {
  PolymorphicComponentWithRef,
  PolymorphicProps,
  PolymorphicPropsWithRef,
} from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';
import { useObjectRef } from '@react-aria/utils';

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

export interface LinkProps extends PolymorphicPropsWithRef<LinkOwnProps, 'a'> {}

// Component
// ---------------
export const Link: PolymorphicComponentWithRef<LinkOwnProps, 'a'> = forwardRef(
  (
    {
      as = 'a',
      variant,
      size,
      children,
      disabled,
      onPress,
      onPressStart,
      ...props
    }: Omit<LinkProps, 'ref'>,
    ref
  ) => {
    const linkRef = useObjectRef<HTMLAnchorElement>(ref as any);
    const { linkProps } = useLink(
      {
        // We typecast here because the element could very well be a `span`
        ...(props as PolymorphicProps<LinkOwnProps, any>),
        elementType: typeof as === 'string' ? as : 'span',
        isDisabled: disabled,
      },
      linkRef
    );

    const styles = useComponentStyles('Link', { variant, size });

    return (
      <Box
        as={as}
        role="link"
        css={styles}
        ref={linkRef}
        {...props}
        {...linkProps}
      >
        {children}
      </Box>
    );
  }
);
