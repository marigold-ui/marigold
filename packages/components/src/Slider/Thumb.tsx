import React, { RefObject, useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { HtmlProps } from '@marigold/types';
import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';
import { useFocusRing } from '@react-aria/focus';

// Props
// ---------------
export interface ThumbProps extends Pick<HtmlProps<'input'>, 'disabled'> {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  styles: CSSObject;
}

// Component
// ---------------
export const Thumb = ({ state, trackRef, styles, ...props }: ThumbProps) => {
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
    <Box
      __baseCSS={{ top: '50%' }}
      css={styles}
      {...thumbProps}
      {...stateProps}
    >
      <VisuallyHidden>
        <Box
          as="input"
          type="range"
          ref={inputRef}
          {...mergeProps(inputProps, focusProps)}
        />
      </VisuallyHidden>
    </Box>
  );
};
