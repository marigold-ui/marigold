import React, { useRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';
import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';
// SVG Icon
// ---------------
const Dot = () =>
  React.createElement(
    'svg',
    { viewBox: '0 0 6 6' },
    React.createElement('circle', {
      fill: 'currentColor',
      cx: '3',
      cy: '3',
      r: '3',
    })
  );
const Icon = ({ checked, css, ...props }) =>
  React.createElement(
    Box,
    {
      'aria-hidden': 'true',
      __baseCSS: {
        width: 16,
        height: 16,
        bg: '#fff',
        border: '1px solid #000',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      },
      css: css,
      ...props,
    },
    checked ? React.createElement(Dot, null) : null
  );
// Component
// ---------------
export const Radio = ({ width, disabled, ...props }) => {
  const {
    variant,
    size,
    error,
    width: groupWidth,
    ...state
  } = useRadioGroupContext();
  const ref = useRef(null);
  const { inputProps } = useRadio(
    { isDisabled: disabled, ...props },
    state,
    ref
  );
  const styles = useComponentStyles(
    'Radio',
    { variant: variant || props.variant, size: size || props.size },
    { parts: ['container', 'label', 'radio'] }
  );
  const { hoverProps, isHovered } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focus: isFocusVisible,
    checked: inputProps.checked,
    disabled: inputProps.disabled,
    readOnly: props.readOnly,
    error,
  });
  return React.createElement(
    Box,
    {
      as: 'label',
      __baseCSS: {
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        position: 'relative',
        width: width || groupWidth || '100%',
      },
      css: styles.container,
      ...hoverProps,
      ...stateProps,
    },
    React.createElement(Box, {
      as: 'input',
      ref: ref,
      css: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.0001,
        cursor: inputProps.disabled ? 'not-allowed' : 'pointer',
      },
      ...inputProps,
      ...focusProps,
    }),
    React.createElement(Icon, {
      checked: inputProps.checked,
      css: styles.radio,
      ...stateProps,
    }),
    React.createElement(
      Box,
      { css: styles.label, ...stateProps },
      props.children
    )
  );
};
Radio.Group = RadioGroup;
//# sourceMappingURL=Radio.js.map
