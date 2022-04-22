import { Simplify } from '@marigold/types';

/**
 * Create type aliases for `theme-ui` so that it doesn't leak too much into our code.
 */
import {
  ThemeUIStyleObject,
  ThemeUICSSObject,
  ThemeUICSSProperties,
  ResponsiveStyleValue as RSV,
} from '@theme-ui/css';

export type ResponsiveStyleValue<T> = RSV<T>;
export type StyleObject = ThemeUIStyleObject;
export type CSSObject = Simplify<ThemeUICSSObject>;
export type CSSProperties = Simplify<ThemeUICSSProperties>;
