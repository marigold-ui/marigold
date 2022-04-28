import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useMessageFormatter } from '@react-aria/i18n';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { Item, Section } from '@react-stately/collections';
import type { AriaSelectProps } from '@react-types/select';
import { mergeProps } from '@react-aria/utils';

import { ArrowDown } from '@marigold/icons';
import {
  Box,
  CSSObject,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase } from '../Field';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { messages } from './intl';

// Theme Extension
// ---------------
export interface SelectThemeExtension
  extends ThemeExtensionsWithParts<'Select', ['option', 'section', 'button']> {}

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
  const ref = useRef(null);
  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
  } = useSelect(props, state, ref);

  const { buttonProps } = useButton(triggerProps, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  // TODO: Button needs state for styling + open/closed (state.isOpen)

  const styles = useComponentStyles(
    'Select',
    { variant, size },
    { parts: ['container', 'button', 'icon'] }
  );
  const stateProps = useStateProps({
    error,
  });
  console.log(stateProps);
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
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Box
        as="button"
        css={styles.button}
        ref={ref}
        {...mergeProps(buttonProps, focusProps)}
      >
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : props.placeholder}
        </span>
        <Box
          __baseCSS={state.isOpen ? {} : { transform: 'rotate(180deg)' }}
          css={styles.icon}
        >
          <ArrowDown size={16} />
        </Box>
      </Box>
      <Popover
        open={state.isOpen}
        onClose={state.close}
        dismissable={true}
        shouldCloseOnBlur={true}
      >
        <ListBox state={state} {...menuProps} />
      </Popover>
    </FieldBase>
  );
};

Select.Option = Item;
Select.Section = Section;
