import React, { forwardRef, ReactNode } from 'react';
import { useLink } from '@react-aria/link';
import { PressEvents } from '@react-types/shared';
import { ThemeExtension, useComponentStyles } from '@marigold/system';
import { PolymorphicComponent, PropsOf } from '@marigold/types';

import { Box } from '../Box';
import { useObjectRef } from '@react-aria/utils';

// Theme Extension
// ---------------
export interface LinkThemeExtension extends ThemeExtension<'Link'> {}

// Props
// ---------------
export interface LinkOwnProps extends PressEvents {
  disabled?: boolean;
  variant?: string;
  size?: string;
  children?: ReactNode;
}

export interface LinkProps extends PropsOf<typeof Link> {}

// Component
// ---------------
export const Link = forwardRef(
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
    },
    ref
  ) => {
    const linkRef = useObjectRef<HTMLAnchorElement>(ref as any);
    const { linkProps } = useLink(
      {
        ...props,
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
) as PolymorphicComponent<'a', LinkOwnProps>;
