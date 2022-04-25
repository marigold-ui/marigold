import React, { RefObject, useEffect } from 'react';
import { useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { SliderState } from '@react-stately/slider';

import { ComponentProps } from '@marigold/types';
import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';

// Props
// ---------------
export interface ThumbProps extends Pick<ComponentProps<'input'>, 'disabled'> {
  state: SliderState;
  trackRef: RefObject<HTMLElement>;
  focused: boolean;
  styles: CSSObject;
}

// Component
// ---------------
export const Thumb: React.FC<ThumbProps> = ({
  state,
  trackRef,
  focused,
  styles,
  ...props
}) => {
  const { disabled } = props;
  const inputRef = React.useRef(null);
  const stateProps = useStateProps({
    focus: focused,
    disabled: disabled,
  });
  const { thumbProps, inputProps } = useSliderThumb(
    {
      // if two thumbs should be rendered, we can pass index prop to the thumb component
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
      __baseCSS={{
        position: 'absolute',
        top: 16,
        transform: 'translateX(-50%)',
        left: `${state.getThumbPercent(0) * 100}%`,
      }}
    >
      <Box {...thumbProps} __baseCSS={styles} {...stateProps}>
        <VisuallyHidden>
          <Box
            as="input"
            type="range"
            ref={inputRef}
            {...mergeProps(inputProps, props)}
          />
        </VisuallyHidden>
      </Box>
    </Box>
  );
};
