import { RefObject } from 'react';
import { SliderState } from '@react-stately/slider';
import { ComponentProps } from '@marigold/types';
import { CSSObject } from '@marigold/system';
export interface ThumbProps extends Pick<ComponentProps<'input'>, 'disabled'> {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  styles: CSSObject;
}
export declare const Thumb: ({
  state,
  trackRef,
  styles,
  ...props
}: ThumbProps) => JSX.Element;
//# sourceMappingURL=Thumb.d.ts.map
