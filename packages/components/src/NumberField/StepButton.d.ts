import { AriaButtonProps } from '@react-types/button';
import { CSSObject } from '@marigold/system';
export interface StepButtonProps extends AriaButtonProps {
  direction: 'up' | 'down';
  css?: CSSObject;
}
export declare const StepButton: ({
  direction,
  css,
  ...props
}: StepButtonProps) => JSX.Element;
//# sourceMappingURL=StepButton.d.ts.map
