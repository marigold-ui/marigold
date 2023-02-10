import { forwardRef } from 'react';
import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import merge from 'deepmerge';

import type { PolymorphicComponent, PropsOf } from '@marigold/types';

import { transformPseudos } from './selector';
import { CSSObject } from '../../types';

export interface BoxOwnProps {
  css?: CSSObject | CSSObject[];
  /**
   * Use to set base styles for the component
   * @internal
   */
  __baseCSS?: CSSObject;
}

export interface BoxProps extends PropsOf<typeof Box> {}

interface CreateStyleProps {
  __baseCSS?: CSSObject;
  css?: CSSObject | CSSObject[];
}

const createThemedStyle =
  ({ __baseCSS, css }: CreateStyleProps) =>
  (theme: Theme) => {
    const themedStyles = merge.all([
      transformStyleObject(__baseCSS)(theme),
      ...(Array.isArray(css)
        ? css.map(c => transformStyleObject(c)(theme))
        : [transformStyleObject(css)(theme)]),
    ]) as CSSObject;
    return transformPseudos(themedStyles);
  };

export const Box = forwardRef(
  ({ as = 'div', children, __baseCSS, css, ...props }, ref) =>
    jsx(
      as,
      {
        ...props,
        css: createThemedStyle({
          __baseCSS,
          css,
        }),
        ref,
      },
      children
    )
) as PolymorphicComponent<'div', BoxOwnProps>;
