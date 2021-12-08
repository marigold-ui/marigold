import { jsx, Theme } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import { Property } from 'csstype';
import { forwardRef } from 'react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { CSSObject } from './types';

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

export type ElementOwnProps = {
  css?: CSSObject;
  variant?: string | string[];
  /**
   * Use to set base styles for the component
   * @internal Used to set default styles for Marigold components
   */
  __baseCSS?: CSSObject;
} & StyleProps;

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

/**
 * Check if there is any falsy value or empty object
 */
const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

const pickStyleProps = (props: ElementOwnProps) => {
  const {
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
    ...rest
  } = props;

  const styles = {
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
  };

  return { styles, rest };
};

const ensureArray = <T extends any>(val?: T | T[]) =>
  Array.isArray(val) ? val : [val];

type CreateStyleProps = Pick<
  ElementProps,
  'as' | '__baseCSS' | 'variant' | 'css'
> & { styles: StyleProps };

const createThemedStyle =
  ({ as, __baseCSS, variant, styles, css }: CreateStyleProps) =>
  (theme: Theme) => {
    return [
      getNormalizedStyles(as),
      transformStyleObject(__baseCSS)(theme),
      ...ensureArray(variant).map(v =>
        transformStyleObject({ variant: v })(theme)
      ),
      transformStyleObject(styles)(theme),
      transformStyleObject(css)(theme),
    ].filter(isNotEmpty);
  };

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    ({ as = 'div', __baseCSS, css = {}, variant, children, ...props }, ref) => {
      const { styles, rest } = pickStyleProps(props);
      return jsx(
        as,
        {
          ...rest,
          ...{
            css: createThemedStyle({ as, __baseCSS, variant, styles, css }),
          },
          ref,
        },
        children
      );
    }
  );
