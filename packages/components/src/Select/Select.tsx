import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { useMessageFormatter } from '@react-aria/i18n';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { Item, Section } from '@react-stately/collections';
import type { AriaSelectProps } from '@react-types/select';
import { mergeProps } from '@react-aria/utils';

import {
  Box,
  CSSObject,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { messages } from './intl';

// Select Icon
// ---------------
interface ArrowsProps {
  css: CSSObject;
}

const Arrows = ({ css }: ArrowsProps) => (
  <Box
    as="svg"
    __baseCSS={{ width: 16, height: 16 }}
    css={css}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </Box>
);

// Theme Extension
// ---------------
export interface SelectThemeExtension
  extends ThemeExtensionsWithParts<'Select', ['container', 'button', 'icon']> {}

// Props
// ---------------
export interface SelectProps
  extends Omit<
      AriaSelectProps<object>,
      | 'autoComplete'
      | 'isOpen'
      | 'isLoading'
      | 'onLoadMore'
      | 'isDisabled'
      | 'isRequired'
      | 'validationState'
    >,
    Omit<
      ComponentProps<'select'>,
      'onKeyUp' | 'onKeyDown' | 'onFocus' | 'onBlur' | 'children' | 'size'
    > {
  open?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
  css?: CSSObject;
}

// Component
// ---------------
export const Select = ({
  open,
  disabled,
  required,
  error,
  variant,
  size,
  css,
  ...rest
}: SelectProps) => {
  // Set up i18n
  const formatMessage = useMessageFormatter(messages);
  const props: AriaSelectProps<object> = {
    isOpen: open,
    isDisabled: disabled,
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
    placeholder: rest.placeholder || formatMessage('placeholder'),
    ...rest,
  };

  const state = useSelectState(props);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
  } = useSelect(props, state, buttonRef);

  const { buttonProps } = useButton(
    { isDisabled: disabled, ...triggerProps },
    buttonRef
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  const overlayRef = useRef(null);
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef,
    isOpen: state.isOpen,
    placement: 'bottom left',
  });

  const styles = useComponentStyles(
    'Select',
    { variant, size },
    { parts: ['container', 'button', 'icon'] }
  );
  const stateProps = useStateProps({
    disabled,
    error,
    focusVisible: isFocusVisible,
    expanded: state.isOpen,
  });

  return (
    <FieldBase
      variant={variant}
      size={size}
      label={props.label}
      labelProps={{ as: 'span', ...labelProps }}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={errorMessageProps}
      stateProps={stateProps}
      disabled={disabled}
      required={required}
    >
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={props.label}
        name={props.name}
        isDisabled={disabled}
      />
      <Box
        as="button"
        __baseCSS={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        css={styles.button}
        ref={buttonRef}
        {...mergeProps(buttonProps, focusProps)}
        {...stateProps}
      >
        <Box
          css={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          {...valueProps}
        >
          {state.selectedItem ? state.selectedItem.rendered : props.placeholder}
        </Box>
        <Arrows css={styles.icon} />
      </Box>
      <Popover
        open={state.isOpen}
        onClose={state.close}
        dismissable
        shouldCloseOnBlur
        minWidth={buttonRef.current ? buttonRef.current.offsetWidth : undefined}
        ref={overlayRef}
        {...positionProps}
      >
        <FocusScope restoreFocus>
          <DismissButton onDismiss={state.close} />
          <ListBox state={state} variant={variant} size={size} {...menuProps} />
          <DismissButton onDismiss={state.close} />
        </FocusScope>
      </Popover>
    </FieldBase>
  );
};

Select.Option = Item;
Select.Section = Section;
