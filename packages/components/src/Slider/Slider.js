/**
 * Thanks to react-aria: https://react-spectrum.adobe.com/react-aria/useSlider.html
 */
import React, { useRef } from 'react';
import { useSlider } from '@react-aria/slider';
import { useSliderState } from '@react-stately/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { useComponentStyles } from '@marigold/system';
import { Box } from '../Box';
import { Thumb } from './Thumb';
// Component
// ---------------
/**
 * The slider consists of two parts.
 * A label + the output value and the slider functionality itself.
 * The slider itself consists of a track line and a thumb.
 */
export const Slider = ({ variant, size, width = '100%', ...props }) => {
  const { formatOptions } = props;
  const trackRef = useRef(null);
  const numberFormatter = useNumberFormatter(formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    {
      label: props.children,
      ...props,
    },
    state,
    trackRef
  );
  const styles = useComponentStyles(
    'Slider',
    { variant, size },
    { parts: ['track', 'thumb', 'label', 'output'] }
  );
  return React.createElement(
    Box,
    {
      __baseCSS: {
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none',
        width,
      },
      ...groupProps,
    },
    React.createElement(
      Box,
      { __baseCSS: { display: 'flex', alignSelf: 'stretch' } },
      props.children &&
        React.createElement(
          Box,
          { as: 'label', __baseCSS: styles.label, ...labelProps },
          props.children
        ),
      React.createElement(
        Box,
        {
          as: 'output',
          ...outputProps,
          __baseCSS: { flex: '1 0 auto', textAlign: 'end' },
          css: styles.output,
        },
        state.getThumbValueLabel(0)
      )
    ),
    React.createElement(
      Box,
      {
        ...trackProps,
        ref: trackRef,
        __baseCSS: {
          position: 'relative',
          height: 32,
          width: '100%',
          cursor: props.disabled ? 'not-allowed' : 'pointer',
        },
      },
      React.createElement(Box, { __baseCSS: styles.track }),
      React.createElement(Thumb, {
        state: state,
        trackRef: trackRef,
        disabled: props.disabled,
        styles: styles.thumb,
      })
    )
  );
};
//# sourceMappingURL=Slider.js.map
