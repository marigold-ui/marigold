import React from 'react';
import { Global as EmotionGlobal } from '@emotion/react';
import { useTheme } from './useTheme';

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
      variant: 'root.html',
    },
    body: {
      height: '100%',
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      variant: 'root.body',
    },
  });
  return <EmotionGlobal styles={{ reduceMotionStyles, ...styles }} />;
};
