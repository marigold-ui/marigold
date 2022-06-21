/// <reference types="react" />
import { ComponentProps } from '@marigold/types';
export interface SVGProps extends ComponentProps<'svg'> {
  size?: number | string | number[] | string[];
}
export declare const SVG: ({
  size,
  fill,
  children,
  ...props
}: SVGProps) => import('react').DetailedReactHTMLElement<
  import('react').InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
//# sourceMappingURL=SVG.d.ts.map
