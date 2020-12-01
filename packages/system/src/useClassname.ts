import { css as emotion } from 'emotion';
import { css, ThemeUIStyleObject } from '@theme-ui/css';
import { useTheme } from './useTheme';

export const useClassname = (...styles: ThemeUIStyleObject[]) => {
  const theme = useTheme();
  return styles.map(style => emotion(css(style)(theme))).join(' ');
};
