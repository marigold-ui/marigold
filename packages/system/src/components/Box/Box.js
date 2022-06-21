import { forwardRef } from 'react';
import { jsx } from '@emotion/react';
import { css as transformStyleObject } from '@theme-ui/css';
import merge from 'deepmerge';
import { getNormalizedStyles } from '../../normalize';
import { transformPseudos } from './utils';
const createThemedStyle =
  ({ as, __baseCSS, styles, css }) =>
  theme => {
    const themedStyles = merge.all([
      getNormalizedStyles(as),
      transformStyleObject(__baseCSS)(theme),
      transformStyleObject(styles)(theme),
      transformStyleObject(css)(theme),
    ]);
    return transformPseudos(themedStyles);
  };
export const Box = forwardRef(
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
          as,
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
//# sourceMappingURL=Box.js.map
