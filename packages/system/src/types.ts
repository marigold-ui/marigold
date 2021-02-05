/**
 * Create type aliases for `theme-ui` so that it doesn't leak too much into our code.
 */
import {
  ThemeUIStyleObject,
  ThemeUICSSObject,
  ThemeUICSSProperties,
} from '@theme-ui/css';
export { ResponsiveStyleValue } from '@theme-ui/css';

export type StyleObject = ThemeUIStyleObject;
export type CSSObject = ThemeUICSSObject;
export type CSSProperties = ThemeUICSSProperties;
