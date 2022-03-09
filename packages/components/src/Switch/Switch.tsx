import React, { LegacyRef, RefObject, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToggleState } from '@react-stately/toggle';
import { ToggleProps } from '@react-types/checkbox';
import { AriaSwitchProps } from '@react-types/switch';

import { ComponentProps } from '@marigold/types';
import { conditional } from '@marigold/system';

import { Box } from '../Box';
import { Label } from '../Label';

// Theme Extension
// ---------------
export interface SwitchThemeExtension<Value> {
  switch?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type SwitchProps = {
  variant?: string;
  labelVariant?: string;
  disabled?: boolean;
} & AriaSwitchProps &
  ToggleProps &
  ComponentProps<'input'>;

// Component
// ---------------
export const Switch: React.FC<SwitchProps> = ({
  variant = '',
  labelVariant = 'above',
  disabled,
  ...props
}) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>();
  const { inputProps } = useSwitch(
    props,
    state,
    ref as RefObject<HTMLInputElement>
  );
  const { focusProps } = useFocusRing();

  return (
    <Box
      as={Label}
      __baseCSS={{
        userSelect: 'none',
      }}
      variant={labelVariant}
    >
      {props.children}
      <VisuallyHidden>
        <input
          {...inputProps}
          {...focusProps}
          disabled={disabled}
          ref={ref as LegacyRef<HTMLInputElement>}
        />
      </VisuallyHidden>
      <Box
        as="svg"
        __baseCSS={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: 56,
          height: 32,
        }}
        aria-hidden="true"
      >
        <Box
          as="rect"
          __baseCSS={{
            x: 4,
            y: 4,
            rx: 12,
            width: 48,
            height: 24,
          }}
          variant={conditional(`switch.${variant}`, {
            checked: state.isSelected,
            disabled: disabled,
          })}
        />
        <Box
          as="circle"
          __baseCSS={{
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
            cx: state.isSelected ? 40 : 16,
            cy: 16,
            r: 11,
            fill: disabled ? 'gray20' : 'gray00',
          }}
        />
      </Box>
    </Box>
  );
};
