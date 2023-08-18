import React, { ReactNode, forwardRef } from 'react';

import { useLink } from '@react-aria/link';
import { useObjectRef } from '@react-aria/utils';

import { PressEvents } from '@react-types/shared';

import { useClassNames } from '@marigold/system';
import { PolymorphicComponent, PropsOf } from '@marigold/types';

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
      className,
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

    const Component = as;
    const classNames = useClassNames({
      component: 'Link',
      variant,
      size,
      className,
    });

    return (
      <Component
        {...props}
        role="link"
        className={classNames}
        ref={linkRef}
        {...linkProps}
      >
        {children}
      </Component>
    );
  }
) as PolymorphicComponent<'a', LinkOwnProps>;
