import { ReactNode } from 'react';
import { ThemeExtensionsWithParts } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
export interface TooltipThemeExtension
  extends ThemeExtensionsWithParts<'Tooltip', ['container', 'arrow']> {}
export interface TooltipProps extends ComponentProps<'div'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}
export declare const Tooltip: {
  ({ children, variant, size }: TooltipProps): JSX.Element;
  Trigger: ({
    disabled,
    open,
    delay,
    placement,
    children,
    ...rest
  }: import('./TooltipTrigger').TooltipTriggerProps) => JSX.Element;
};
//# sourceMappingURL=Tooltip.d.ts.map
