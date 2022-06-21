import React from 'react';
import { Global as EmotionGlobal } from '@emotion/react';
import { useTheme } from '../../hooks';
/**
 * CSS snippet and idea from:
 * https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/
 */
const reduceMotionStyles = {
  '@media screen and (prefers-reduced-motion: reduce), (update: slow)': {
    '*': {
      animationDuration: '0.001ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.001ms !important',
    },
  },
};
export const Global = () => {
  const { css } = useTheme();
  const styles = css({
    html: {
      height: '100%',
      /**
       * Prevent Mobile Safari from zooming stuff ...
       * Source: https://css-tricks.com/your-css-reset-needs-text-size-adjust-probably/
       */
      textSizeAdjust: 'none',
      variant: 'root.html',
    },
    body: {
      height: '100%',
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      variant: 'root.body',
    },
  });
  return React.createElement(EmotionGlobal, {
    styles: { reduceMotionStyles, ...styles },
  });
};
//# sourceMappingURL=Global.js.map
