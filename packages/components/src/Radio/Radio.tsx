import React, {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';
import { useObjectRef } from '@react-aria/utils';
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
import type { ComponentProps } from '@marigold/types';

import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';

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

const Icon = ({ checked, css, ...props }: IconProps) => (
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

// Props
// ---------------
export type CustomRadioProps =
  | 'size'
  | 'width'
  | 'type'
  | 'defaultChecked'
  | 'value'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyUp'
  | 'onKeyDown';

export interface RadioProps
  extends ThemeComponentProps,
    Omit<ComponentProps<'input'>, CustomRadioProps>,
    AriaRadioProps {
  width?: string;
  disabled?: boolean;
}

// Component
// ---------------
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ width, disabled, ...props }, ref) => {
    const {
      variant,
      size,
      error,
      width: groupWidth,
      ...state
    } = useRadioGroupContext();

    const inputRef = useObjectRef(ref);
    const { inputProps } = useRadio(
      { isDisabled: disabled, ...props },
      state,
      inputRef
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
      readOnly: props.readOnly,
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
          width: width || groupWidth || '100%',
        }}
        css={styles.container}
        {...hoverProps}
        {...stateProps}
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
        <Icon checked={inputProps.checked} css={styles.radio} {...stateProps} />
        <Box css={styles.label} {...stateProps}>
          {props.children}
        </Box>
      </Box>
    );
  }
) as RadioComponent;

Radio.Group = RadioGroup;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
export interface RadioComponent
  extends ForwardRefExoticComponent<
    RadioProps & RefAttributes<HTMLInputElement>
  > {
  Group: typeof RadioGroup;
}
