import React from 'react';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';
import { Box, useComponentStyles } from '@marigold/system';
import { Label } from '../Label';
import { RadioGroupContext } from './Context';
// Component
// ---------------
export const RadioGroup = ({
  children,
  orientation = 'vertical',
  size,
  variant,
  width,
  required,
  disabled,
  readOnly,
  error,
  ...rest
}) => {
  const props = {
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  };
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const styles = useComponentStyles(
    'RadioGroup',
    { variant, size },
    { parts: ['container', 'group'] }
  );
  return React.createElement(
    Box,
    { ...radioGroupProps, css: styles.container },
    props.label &&
      React.createElement(
        Label,
        { as: 'span', required: required, ...labelProps },
        props.label
      ),
    React.createElement(
      Box,
      {
        role: 'presentation',
        'data-orientation': orientation,
        __baseCSS: {
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          alignItems: 'start',
          gap: orientation === 'vertical' ? '0.5ch' : '1.5ch',
        },
        css: styles.group,
      },
      React.createElement(
        RadioGroupContext.Provider,
        { value: { variant, size, width, error, ...state } },
        children
      )
    )
  );
};
//# sourceMappingURL=RadioGroup.js.map
