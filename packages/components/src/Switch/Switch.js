import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import { useComponentStyles, useStateProps } from '@marigold/system';
import { Box } from '../Box';
// Component
// ---------------
export const Switch = ({
  variant,
  size,
  width = '100%',
  checked,
  disabled,
  readOnly,
  defaultChecked,
  ...rest
}) => {
  const ref = useRef(null);
  // Adjust props to the react-aria API
  const props = {
    isSelected: checked,
    isDisabled: disabled,
    isReadOnly: readOnly,
    defaultSelected: defaultChecked,
    ...rest,
  };
  const state = useToggleState(props);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    checked: state.isSelected,
    disabled: disabled,
    readOnly: readOnly,
    focus: isFocusVisible,
  });
  const styles = useComponentStyles(
    'Switch',
    { variant, size },
    { parts: ['container', 'label', 'track', 'thumb'] }
  );
  return React.createElement(
    Box,
    {
      as: 'label',
      __baseCSS: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1ch',
        position: 'relative',
        width,
      },
      css: styles.container,
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
    props.children &&
      React.createElement(Box, { css: styles.label }, props.children),
    React.createElement(
      Box,
      {
        __baseCSS: {
          position: 'relative',
          width: 48,
          height: 24,
          bg: '#dee2e6',
          borderRadius: 20,
        },
        css: styles.track,
        ...stateProps,
      },
      React.createElement(Box, {
        __baseCSS: {
          display: 'block',
          position: 'absolute',
          top: 1,
          left: 0,
          willChange: 'transform',
          transform: 'translateX(1px)',
          transition: 'all 0.1s cubic-bezier(.7, 0, .3, 1)',
          height: 22,
          width: 22,
          borderRadius: 9999,
          bg: '#fff',
          '&:checked': {
            transform: 'translateX(calc(47px - 100%))',
          },
        },
        css: styles.thumb,
        ...stateProps,
      })
    )
  );
};
//# sourceMappingURL=Switch.js.map
