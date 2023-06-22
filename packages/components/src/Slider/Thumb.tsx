import React, { RefObject, useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { HtmlProps } from '@marigold/types';
import { cn, useStateProps } from '@marigold/system';

import { VisuallyHidden } from '../VisuallyHidden';
import { useFocusRing } from '@react-aria/focus';

// Props
// ---------------
export interface ThumbProps extends Pick<HtmlProps<'input'>, 'disabled'> {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  className: string;
}

// Component
// ---------------
export const Thumb = ({ state, trackRef, className, ...props }: ThumbProps) => {
  const { disabled } = props;
  const inputRef = React.useRef(null);
  const { isFocusVisible, focusProps, isFocused } = useFocusRing();
  const focused = isFocused || isFocusVisible || state.isThumbDragging(0);
  const stateProps = useStateProps({
    focus: focused,
    disabled: disabled,
  });
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index: 0,
      trackRef,
      inputRef,
      isDisabled: disabled,
    },
    state
  );

  useEffect(() => {
    state.setThumbEditable(0, !disabled);
  }, [disabled, state]);
  return (
    <div className={cn('top-1/2', className)} {...thumbProps} {...stateProps}>
      <VisuallyHidden>
        <input
          type="range"
          ref={inputRef}
          {...mergeProps(inputProps, focusProps)}
        />
      </VisuallyHidden>
    </div>
  );
};
