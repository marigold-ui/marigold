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
  /**
   * Use to set base styles for the component
   * @private - **use with caution ... please!**
   */
  __baseCSS?: CSSObject;
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

/**
 * Check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    (
      { as = 'div', __baseCSS, css: styles = {}, variant, children, ...props },
      ref
    ) => {
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
              getNormalizedStyles(as),
              __baseCSS,
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
