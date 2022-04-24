import React, { useRef } from 'React';
import { useRadio } from '@react-aria/radio';
import type { AriaRadioProps } from '@react-types/radio';

import {
  Box,
  ThemeComponentProps,
  ThemeExtensionsWithParts,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { RadioGroup, useRadioGroupContext } from './RadioGroup';

// Theme Extension
// ---------------
export interface RadioThemeExtension
  extends ThemeExtensionsWithParts<'Radio', ['container', 'label', 'radio']> {}

// SVG Icon
// ---------------
const Dot = () => (
  <svg viewBox="0 0 6 6">
    <circle fill="currentColor" cx="3" cy="3" r="3" />
  </svg>
);

interface IconProps {
  checked?: boolean;
}

const Icon = ({ checked }: IconProps) => {
  return (
    <Box
      aria-hidden="true"
      __baseCSS={{
        width: 16,
        height: 16,
        bg: '#fff',
        border: '1px solid #000',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {checked ? <Dot /> : null}
    </Box>
  );
};

// Props
// ---------------
export type CustomRadioProps =
  | 'value'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyUp'
  | 'onKeyDown';

export interface RadioProps
  extends ThemeComponentProps,
    Omit<
      ComponentProps<'input'>,
      'size' | 'type' | 'defaultValue' | CustomRadioProps
    >,
    AriaRadioProps {}

// Component
// ---------------
export const Radio = (props: RadioProps) => {
  const { variant, size, error, ...state } = useRadioGroupContext();

  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);

  return (
    <Box
      as="label"
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        position: 'relative',
      }}
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
      />
      <Icon checked={inputProps.checked} />
      <Box>{props.children}</Box>
    </Box>
  );
};

Radio.Group = RadioGroup;
