import { css as emotion } from '@emotion/css';
import { css } from '@theme-ui/css';
import { StyleObject } from './types';
import { useTheme } from './useTheme';

export const useClassname = (...styles: StyleObject[]) => {
  const theme = useTheme();
  return styles.map(style => emotion(css(style)(theme))).join(' ');
};
