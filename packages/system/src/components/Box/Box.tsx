import { forwardRef } from 'react';
import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import merge from 'deepmerge';

import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { transformPseudos } from './selector';
import { CSSObject } from '../../types';

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
  css?: CSSObject | CSSObject[];
  /**
   * Use to set base styles for the component
   * @internal
   */
  __baseCSS?: CSSObject;
}

export interface BoxProps extends PolymorphicPropsWithRef<BoxOwnProps, 'div'> {}

interface CreateStyleProps {
  __baseCSS?: CSSObject;
  css?: CSSObject | CSSObject[];
  styles?: StyleProps;
}

const createThemedStyle =
  ({ __baseCSS, styles, css }: CreateStyleProps) =>
  (theme: Theme) => {
    const allCSS = (Array.isArray(css) ? merge.all(css) : css) as CSSObject;

    const themedStyles = merge.all([
      transformStyleObject(__baseCSS)(theme),
      transformStyleObject(styles)(theme),
      transformStyleObject(allCSS)(theme),
    ]) as CSSObject;

    return transformPseudos(themedStyles);
  };

export const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'> = forwardRef(
  (
    {
      as = 'div',
      children,
      __baseCSS,
      css,
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
          __baseCSS,
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
