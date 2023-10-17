import {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useRef,
} from 'react';

import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import { Item, Section } from '@react-stately/collections';
import { useSelectState } from '@react-stately/select';

import type { AriaSelectProps } from '@react-types/select';

import {
  WidthProp,
  cn,
  useClassNames,
  useSmallScreen,
  useStateProps,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { Popover, Tray } from '../Overlay';
import { messages } from './intl';

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
      | 'className'
    > {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
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

    const buttonRef = useObjectRef(ref);
    const listboxRef = useRef(null);

    const state = useSelectState(props);
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

    const classNames = useClassNames({ component: 'Select', variant, size });
    const isSmallScreen = useSmallScreen();
    const stateProps = useStateProps({
      disabled,
      error,
      focusVisible: isFocusVisible,
      expanded: state.isOpen,
      required,
    });

    return (
      <FieldBase
        variant={variant}
        size={size}
        width={width}
        label={props.label}
        labelProps={{ elementType: 'span', ...labelProps }}
        description={props.description}
        descriptionProps={descriptionProps}
        error={error}
        errorMessage={props.errorMessage}
        errorMessageProps={errorMessageProps}
        stateProps={stateProps}
        disabled={disabled}
      >
        <HiddenSelect
          state={state}
          triggerRef={buttonRef}
          label={props.label}
          name={props.name}
          isDisabled={disabled}
        />
        <button
          className={cn(
            'flex w-full items-center justify-between gap-1 overflow-hidden',
            classNames.select
          )}
          ref={buttonRef}
          {...mergeProps(buttonProps, focusProps)}
          {...stateProps}
        >
          <div className="overflow-hidden whitespace-nowrap" {...valueProps}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : props.placeholder}
          </div>
          <ChevronDown className="h-4 w-4" />
        </button>
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
