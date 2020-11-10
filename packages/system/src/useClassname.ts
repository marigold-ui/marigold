import { css as emotion } from 'emotion';
// @ts-ignore
import { css, ThemeUIStyleObject } from '@theme-ui/css';
import { useTheme } from './useTheme';

export const useClassname = (styles: ThemeUIStyleObject) => {
  const theme = useTheme();
  const className = emotion(css(styles)(theme));
  return className;
};
