import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useObjectRef } from '@react-aria/utils';
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
  width?: string;
}

// Component
// ---------------
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      variant,
      size,
      width = '100%',
      checked,
      disabled,
      readOnly,
      defaultChecked,
      ...rest
    },
    ref
  ) => {
    const inputRef = useObjectRef(ref);
    // Adjust props to the react-aria API
    const props = {
      isSelected: checked,
      isDisabled: disabled,
      isReadOnly: readOnly,
      defaultSelected: defaultChecked,
      ...rest,
    };

    const state = useToggleState(props);
    const { inputProps } = useSwitch(props, state, inputRef);
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

    return (
      <Box
        as="label"
        __baseCSS={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1ch',
          position: 'relative',
          width,
        }}
        css={styles.container}
      >
        <Box
          as="input"
          ref={inputRef}
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
  }
);
