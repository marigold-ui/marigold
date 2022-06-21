import { Theme, ThemeProviderProps } from '@marigold/system';
export interface RootThemeExtension<Value> {
  root?: {
    body?: Value;
    html?: Value;
  };
}
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {}
export declare function MarigoldProvider<T extends Theme>({
  theme,
  children,
}: MarigoldProviderProps<T>): JSX.Element;
//# sourceMappingURL=MarigoldProvider.d.ts.map
