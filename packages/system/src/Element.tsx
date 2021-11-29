import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { CSSObject } from './types';
import { useTheme } from './useTheme';

export type ElementOwnProps = {
  css?: CSSObject;
  variant?: string | string[];
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

/**
 * Function expression to check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

/**
 * Get the normalized base styles
 */
const baseStyles = getNormalizedStyles('base');

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    ({ as = 'div', css: styles = {}, variant, children, ...props }, ref) => {
      const { css } = useTheme();

      /**
       * Transform variant input for `@theme-ui/css`
       */
      const variants = Array.isArray(variant)
        ? variant.map(v => ({ variant: v }))
        : [{ variant }];

      return jsx(
        as,
        {
          ...props,
          ...{
            css: [
              baseStyles,
              getNormalizedStyles(as),
              ...variants.map(v => css(v)),
              css(styles),
            ].filter(isNotEmpty),
          },
          ref,
        },
        children
      );
    }
  );
