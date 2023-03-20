import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useRef,
} from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { Item, Section } from '@react-stately/collections';
import type { AriaSelectProps } from '@react-types/select';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import {
  Box,
  CSSObject,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useResponsiveValue,
  useStateProps,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { messages } from './intl';
import { Popover, Tray } from '../Overlay';

// Select Icon
// ---------------
interface ChevronProps {
  css: CSSObject;
}

const Chevron = ({ css }: ChevronProps) => (
  <Box
    as="svg"
    __baseCSS={{ width: 16, height: 16, fill: 'none' }}
    css={css}
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
  extends ThemeExtensionsWithParts<'Select', ['container', 'button', 'icon']> { }

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
    | 'onSelectionChange'
  >,
  Omit<
    HtmlProps<'select'>,
    | 'onKeyUp'
    | 'onKeyDown'
    | 'onFocus'
    | 'onBlur'
    | 'children'
    | 'size'
    | 'onChange'
  > {
  variant?: string;
  size?: string;
  width?: string;
  open?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  onChange?: AriaSelectProps<object>['onSelectionChange'];
}

// Component
// ---------------
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant,
      size,
      width,
      open,
      disabled,
      required,
      error,
      onChange,
      ...rest
    },
    ref
  ) => {
    // Set up i18n
    const formatMessage = useLocalizedStringFormatter(messages);

    const props = {
      isOpen: open,
      isDisabled: disabled,
      isRequired: required,
      validationState: error ? 'invalid' : 'valid',
      placeholder: rest.placeholder || formatMessage.format('placeholder'),
      onSelectionChange: onChange,
      ...rest,
    } as const;

    const state = useSelectState(props);
    const buttonRef = useObjectRef(ref);
    const listboxRef = useRef(null);

    const isSmallScreen = useResponsiveValue([true, false, false], 2);

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
        width={width}
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
            {state.selectedItem
              ? state.selectedItem.rendered
              : props.placeholder}
          </Box>
          <Chevron css={styles.icon} />
        </Box>
        {isSmallScreen ? (
          <Tray state={state}>
            <ListBox
              ref={listboxRef}
              state={state}
              variant={variant}
              size={size}
              {...menuProps}
            />
          </Tray>
        ) : (
          <Popover state={state} triggerRef={buttonRef} scrollRef={listboxRef}>
            <ListBox
              ref={listboxRef}
              state={state}
              variant={variant}
              size={size}
              {...menuProps}
            />
          </Popover>
        )}
      </FieldBase>
    );
  }
) as SelectComponent;

Select.Option = Item;
Select.Section = Section;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
export interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps & RefAttributes<HTMLButtonElement>
  > {
  Option: typeof Item;
  Section: typeof Section;
}
