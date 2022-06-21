import type { ScaleValue } from '@marigold/system';
import type { Theme } from '@marigold/components';
import * as Token from '@marigold/tokens';
export declare const base: Theme;
declare type AvailableColor = keyof typeof Token.color;
declare type CustomColor = {
  name: string;
  value: ScaleValue<string>;
};
export interface ThemeConfig {
  /**
   * Used to pick from existing color palette or define custom colors.
   */
  colors?: (AvailableColor | CustomColor)[];
  /**
   * Used to define a the `font-family` scale.
   */
  fonts?: {
    [key: string]: string;
  };
  /**
   * Used to define if fixed or fluid typography should be used.
   */
  typography?: 'fixed' | 'fluid';
  /**
   * Used to define if fluid or fixed sizes and whitespace should be used.
   */
  dimensions?: 'fixed' | 'fluid';
  components?: Theme['components'];
}
export declare const createTheme: ({
  colors: configColors,
  fonts: configFonts,
  typography,
  dimensions,
  components,
}: ThemeConfig) => Theme;
export {};
//# sourceMappingURL=create-theme.d.ts.map
