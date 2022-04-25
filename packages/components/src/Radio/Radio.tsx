import React, { useRef } from 'React';
import { useRadio } from '@react-aria/radio';
import type { AriaRadioProps } from '@react-types/radio';

import {
  Box,
  CSSObject,
  StateAttrProps,
  ThemeComponentProps,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { RadioGroup, useRadioGroupContext } from './RadioGroup';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { isDisabled } from '@testing-library/user-event/dist/utils';

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

interface IconProps extends StateAttrProps {
  css?: CSSObject;
  checked?: boolean;
}

const Icon = ({ checked, css, ...props }: IconProps) => {
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
      css={css}
      {...props}
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
    AriaRadioProps {
  disabled?: boolean;
}

// Component
// ---------------
export const Radio = ({ disabled, ...props }: RadioProps) => {
  const { variant, size, error, ...state } = useRadioGroupContext();

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
    readOnly: inputProps.readOnly,
    error,
  });

  return (
    <Box
      as="label"
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        position: 'relative',
      }}
      css={styles.container}
      {...hoverProps}
      {...stateProps}
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
      <Icon checked={inputProps.checked} css={styles.radio} {...stateProps} />
      <Box css={styles.label} {...stateProps}>
        {props.children}
      </Box>
    </Box>
  );
};

Radio.Group = RadioGroup;
