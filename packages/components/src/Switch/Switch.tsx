import React, { LegacyRef, RefObject, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToggleState } from '@react-stately/toggle';
import { ToggleProps } from '@react-types/checkbox';
import { AriaSwitchProps } from '@react-types/switch';

import { ComponentProps } from '@marigold/types';
import {
  CSSObject,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';

import { Box } from '../Box';
import { Label } from '../Label';

// Theme Extension
// ---------------
export interface SwitchThemeExtension
  extends ThemeExtensionsWithParts<'Switch', ['switch', 'label']> {}

// Props
// ---------------
export type SwitchProps = {
  variant?: string;
  disabled?: boolean;
  size?: string;
  css?: CSSObject;
} & AriaSwitchProps &
  ToggleProps &
  ComponentProps<'input'>;

// Component
// ---------------
export const Switch = ({
  variant,
  size,
  disabled,
  css,
  ...props
}: SwitchProps) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>();
  const { inputProps } = useSwitch(
    props,
    state,
    ref as RefObject<HTMLInputElement>
  );
  const { focusProps } = useFocusRing();
  const stateProps = useStateProps({
    checked: state.isSelected,
    disabled: disabled,
  });
  const styles = useComponentStyles(
    'Switch',
    { variant, size },
    { parts: ['switch', 'label'] }
  );
  return (
    <Box
      as={Label}
      __baseCSS={{
        userSelect: 'none',
      }}
      css={styles.label}
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
        {...stateProps}
        __baseCSS={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: 56,
          height: 32,
        }}
        css={styles.switch}
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
