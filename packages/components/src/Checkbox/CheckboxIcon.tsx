import React from 'react';
import { conditional, State, SVG } from '@marigold/system';

import { Box } from '../Box';

// Checkbox Icon
// ---------------
export interface CheckboxIconProps {
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminated?: boolean;
  error?: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  variant = '',
  checked = false,
  disabled = false,
  indeterminated,
  error = false,
}) => {
  const conditionalStates: State = disabled
    ? {
        disabled: disabled,
      }
    : {
        checked: checked,
        error: error,
      };

  return (
    <SVG
      width="16"
      height="32"
      viewBox="0 0 16 32"
      fill="none"
      aria-hidden="true"
    >
      <Box
        as="rect"
        x="0.5"
        y="8.5"
        width="15px"
        height="15px"
        rx="1.5"
        variant={conditional(`checkbox.${variant}`, conditionalStates)}
      />
      {checked && indeterminated && (
        <Box
          __baseCSS={{ fill: 'gray00' }}
          as="path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 17.0402H2.5V15.4688H13.5V17.0402V17.0402Z"
        />
      )}
      {checked && !indeterminated && (
        <Box
          __baseCSS={{ fill: 'gray00' }}
          as="path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9571 12.8338L12.4085 11.2852L6.08699 17.6007L3.59887 15.1126L2.04163 16.6588L6.08682 20.704L13.9571 12.8338Z"
        />
      )}
    </SVG>
  );
};
