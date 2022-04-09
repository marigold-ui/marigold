import { forwardRef } from 'react';
import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import merge from 'deepmerge';

import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from '../../normalize';
import { CSSObject } from '../../types/system';
import { ensureArrayVariant } from '../../variant';
import { transformPseudos } from './utils';

export interface StyleProps
  extends Pick<
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
  > {}

export interface BoxOwnProps extends StyleProps {
  css?: CSSObject;
  variant?: string | string[];
  /**
   * Use to set base styles for the component
   * @internal Used to set default styles for Marigold components
   */
  __baseCSS?: CSSObject;
}

export interface BoxProps extends PolymorphicPropsWithRef<BoxOwnProps, 'div'> {}

/**
 * Check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

interface CreateStyleProps {
  as?: BoxProps['as'];
  __baseCSS?: BoxOwnProps['__baseCSS'];
  variant?: BoxOwnProps['variant'];
  css?: BoxOwnProps['css'];
  styles?: StyleProps;
}

const createThemedStyle =
  ({ as, __baseCSS, variant, styles, css }: CreateStyleProps) =>
  (theme: Theme) => {
    const themedStyles = merge.all([
      getNormalizedStyles(as),
      transformStyleObject(__baseCSS)(theme),
      ...ensureArrayVariant(variant).map(v =>
        transformStyleObject({ variant: v })(theme)
      ),
      transformStyleObject(styles)(theme),
      transformStyleObject(css)(theme),
    ]) as CSSObject;

    return transformPseudos(themedStyles);
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
