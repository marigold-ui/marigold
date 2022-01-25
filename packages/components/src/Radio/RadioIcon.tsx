import React from 'react';
import { conditional, State, SVG } from '@marigold/system';

import { Box } from '../Box';

// Radio Icon
// ---------------
export type RadioIconProps = {
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  children?: never;
};

export const RadioIcon: React.FC<RadioIconProps> = ({
  variant = '',
  checked = false,
  disabled = false,
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
        variant={conditional(`radio.${variant}`, conditionalStates)}
        as="circle"
        cx="8"
        cy="16"
        r="7.5"
      />
      {checked && <circle fill="white" cx="8" cy="16" r="3" />}
    </SVG>
  );
};
