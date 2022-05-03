import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import { AriaSwitchProps } from '@react-types/switch';

import { ComponentProps } from '@marigold/types';
import {
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface SwitchThemeExtension
  extends ThemeExtensionsWithParts<
    'Switch',
    ['container', 'label', 'track', 'thumb']
  > {}

// Props
// ---------------
export type CustomSwitchProps =
  | 'size'
  | 'value'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'onKeyDown'
  | 'onKeyUp';

export interface SwitchProps
  extends Omit<AriaSwitchProps, 'isSelected'>,
    Omit<ComponentProps<'input'>, CustomSwitchProps> {
  checked?: boolean;
  variant?: string;
  size?: string;
}
// Component
// ---------------
export const Switch = ({
  variant,
  size,
  checked,
  disabled,
  readOnly,
  defaultChecked,
  ...props
}: SwitchProps) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(
    {
      isSelected: checked,
      isDisabled: disabled,
      isReadOnly: readOnly,
      defaultSelected: defaultChecked,
      ...props,
    },
    state,
    ref
  );
  const { focusProps } = useFocusRing();
  const stateProps = useStateProps({
    checked: state.isSelected,
    disabled: disabled,
  });
  const styles = useComponentStyles(
    'Switch',
    { variant, size },
    { parts: ['container', 'label', 'track', 'thumb'] }
  );
  return (
    <Box
      as="label"
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1ch',
        position: 'relative',
      }}
      css={styles.container}
    >
      <Box
        as="input"
        ref={ref}
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: 0.0001,
          cursor: inputProps.disabled ? 'not-allowed' : 'pointer',
        }}
        {...inputProps}
        {...focusProps}
      />
      {props.children && <Box css={styles.label}>{props.children}</Box>}
      <Box
        __baseCSS={{
          position: 'relative',
          width: 48,
          height: 24,
          bg: '#dee2e6',
          borderRadius: 20,
        }}
        css={styles.track}
        {...stateProps}
      >
        <Box
          __baseCSS={{
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
          }}
          css={styles.thumb}
          {...stateProps}
        />
      </Box>
    </Box>
  );
};
