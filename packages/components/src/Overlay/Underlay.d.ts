import { HTMLAttributes } from 'react';
import { ThemeExtension } from '@marigold/system';
export interface UnderlayThemeExtension extends ThemeExtension<'Underlay'> {}
export interface UnderlayProps extends HTMLAttributes<HTMLElement> {
  variant?: string;
  size?: string;
}
export declare const Underlay: ({
  size,
  variant,
  ...props
}: UnderlayProps) => JSX.Element;
//# sourceMappingURL=Underlay.d.ts.map
