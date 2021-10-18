import { ElementType, forwardRef } from 'react';
import { jsx } from '@emotion/react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { reset } from './reset';
import { CSSObject } from './types';
import { useTheme } from './useTheme';

export type ElementOwnProps = {
  element?: ElementType;
  css?: Omit<CSSObject, 'variant' | 'element'> & {
    variant?: never;
    element?: never;
  };
  variant?: string | string[];
  className?: string;
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    (
      {
        as = 'div',
        element = as,
        css: styles = {},
        variant,
        children,
        className,
        ...props
      },
      ref
    ) => {
      const { css } = useTheme();

      const baseStyles = reset.base;
      const resetStyles =
        typeof element === 'string' &&
        (reset as unknown as { [key: string]: string })[element];

      /**
       * Get variant styles (from theme).
       */
      const variants = Array.isArray(variant)
        ? variant.map(v => ({ variant: v }))
        : [{ variant }];

      // const variantStyles = css(variants);

      // const cn = useStyles({
      //   element: as,
      // });
      return jsx(
        as,
        {
          ...props,
          css: { ...baseStyles, resetStyles, ...styles },
          ref,
          className: className,
        },
        children
      );
    }
  );
