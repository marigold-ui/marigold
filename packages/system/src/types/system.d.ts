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
export declare type ResponsiveStyleValue<T> = RSV<T>;
export declare type StyleObject = ThemeUIStyleObject;
export declare type CSSObject = Simplify<ThemeUICSSObject>;
export declare type CSSProperties = Simplify<ThemeUICSSProperties>;
//# sourceMappingURL=system.d.ts.map
