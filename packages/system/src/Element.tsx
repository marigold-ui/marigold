import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import { forwardRef } from 'react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { CSSObject } from './types';

export type ElementOwnProps = {
  css?: CSSObject;
  variant?: string | string[];
  /**
   * Use to set base styles for the component
   * @internal Used to set default styles for Marigold components
   */
  __baseCSS?: CSSObject;
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

/**
 * Check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

const ensureArray = <T extends any>(val?: T | T[]) =>
  Array.isArray(val) ? val : [val];

type CreateStyleProps = Pick<
  ElementProps,
  'as' | '__baseCSS' | 'variant' | 'css'
>;

const createThemedStyle =
  ({ as, __baseCSS, variant, css }: CreateStyleProps) =>
  (theme: Theme) => {
    return [
      getNormalizedStyles(as),
      transformStyleObject(__baseCSS)(theme),
      ...ensureArray(variant).map(v =>
        transformStyleObject({ variant: v })(theme)
      ),
      transformStyleObject(css)(theme),
    ].filter(isNotEmpty);
  };

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    ({ as = 'div', __baseCSS, css = {}, variant, children, ...props }, ref) =>
      jsx(
        as,
        {
          ...props,
          ...{
            css: createThemedStyle({ as, __baseCSS, variant, css }),
          },
          ref,
        },
        children
      )
  );
