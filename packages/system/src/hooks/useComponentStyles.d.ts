import { CSSObject } from '../types';
export interface ComponentStylesProps {
  variant?: string;
  size?: string;
}
export declare type ComponentStyleParts<Parts extends string[]> = {
  [P in Parts[number]]: CSSObject;
};
export declare function useComponentStyles(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: never;
  }
): CSSObject;
export declare function useComponentStyles<
  Part extends string,
  Parts extends ReadonlyArray<Part>
>(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: Parts;
  }
): {
  [P in Parts[number]]: CSSObject;
};
//# sourceMappingURL=useComponentStyles.d.ts.map
