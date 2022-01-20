import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import { forwardRef } from 'react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { CSSObject } from './types';
import { ensureArrayVariant } from './variant';

export type StyleProps = Pick<
  CSSObject,
  | 'display'
  | 'height'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'position'
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'zIndex'
  | 'p'
  | 'px'
  | 'py'
  | 'pt'
  | 'pb'
  | 'pl'
  | 'pr'
  | 'm'
  | 'mx'
  | 'my'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'flexDirection'
  | 'flexWrap'
  | 'flexShrink'
  | 'flexGrow'
  | 'alignItems'
  | 'justifyContent'
  | 'bg'
  | 'border'
  | 'borderRadius'
  | 'boxShadow'
  | 'opacity'
  | 'overflow'
  | 'transition'
>;

export type BoxOwnProps = {
  css?: CSSObject;
  variant?: string | string[];
  /**
   * Use to set base styles for the component
   * @internal Used to set default styles for Marigold components
   */
  __baseCSS?: CSSObject;
} & StyleProps;

export type BoxProps = PolymorphicPropsWithRef<BoxOwnProps, 'div'>;

/**
 * Check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

type CreateStyleProps = {
  as?: BoxProps['as'];
  __baseCSS?: BoxOwnProps['__baseCSS'];
  variant?: BoxOwnProps['variant'];
  css?: BoxOwnProps['css'];
  styles?: StyleProps;
};

const createThemedStyle =
  ({ as, __baseCSS, variant, styles, css }: CreateStyleProps) =>
  (theme: Theme) => {
    return [
      getNormalizedStyles(as),
      transformStyleObject(__baseCSS)(theme),
      ...ensureArrayVariant(variant).map(v =>
        transformStyleObject({ variant: v })(theme)
      ),
      transformStyleObject(styles)(theme),
      transformStyleObject(css)(theme),
    ].filter(isNotEmpty);
  };

export const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'> = forwardRef(
  (
    {
      as = 'div',
      children,
      __baseCSS,
      variant,
      css = {},
      display,
      height,
      width,
      minWidth,
      maxWidth,
      position,
      top,
      bottom,
      right,
      left,
      zIndex,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      flexDirection,
      flexWrap,
      flexShrink,
      flexGrow,
      alignItems,
      justifyContent,
      bg,
      border,
      borderRadius,
      boxShadow,
      opacity,
      overflow,
      transition,
      ...props
    },
    ref
  ) =>
    jsx(
      as,
      {
        ...props,
        css: createThemedStyle({
          as,
          __baseCSS,
          variant,
          css,
          styles: {
            display,
            height,
            width,
            minWidth,
            maxWidth,
            position,
            top,
            bottom,
            right,
            left,
            zIndex,
            p,
            px,
            py,
            pt,
            pb,
            pl,
            pr,
            m,
            mx,
            my,
            mt,
            mb,
            ml,
            mr,
            flexDirection,
            flexWrap,
            flexShrink,
            flexGrow,
            alignItems,
            justifyContent,
            bg,
            border,
            borderRadius,
            boxShadow,
            opacity,
            overflow,
            transition,
          },
        }),
        ref,
      },
      children
    )
);
