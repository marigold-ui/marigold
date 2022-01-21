import React, { Ref, RefObject, useRef } from 'react';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { HiddenSelect, useSelect } from '@react-aria/select';
import type { AriaSelectProps } from '@react-types/select';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useOverlayTrigger, useOverlayPosition } from '@react-aria/overlays';
import { SingleSelection } from '@react-types/shared';

import { ComponentProps } from '@marigold/types';
import { ArrowDown, ArrowUp, Exclamation, Required } from '@marigold/icons';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

// Theme Extension
// ---------------
export interface SelectThemeExtension<Value> {
  select?: {
    __default: Value;
    disabled?: Value;
    listbox?: {
      __default: Value;
      error?: Value;
    };
    section?: Value;
    option?: Value;
  };
}

// Props
// ---------------
export type SelectProps = {
  labelVariant?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  width?: ResponsiveStyleValue<number | string>;
  error?: boolean;
  errorMessage?: string;
} & ComponentProps<'select'> &
  AriaSelectProps<object> &
  SingleSelection;

// Component
// ---------------
export const Select = ({
  labelVariant = 'above',
  placeholder = 'Select an option',
  disabled,
  required,
  error,
  errorMessage,
  width,
  className,
  ...props
}: SelectProps) => {
  const state = useSelectState(props);
  const overlayTriggerState = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLElement>() as RefObject<HTMLElement>;
  const overlayRef = useRef<HTMLDivElement>();

  // Get props for the overlay
  const { overlayProps } = useOverlayTrigger(
    { type: 'listbox' },
    overlayTriggerState,
    triggerRef
  );
  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: overlayRef as RefObject<HTMLElement>,
    placement: 'bottom',
    shouldFlip: false,
    isOpen: state.isOpen,
    onClose: state.close,
  });
  // Get props for child elements from useSelect
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    triggerRef
  );
  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, triggerRef);

  const { focusProps } = useFocusRing();

  return (
    <Box position="relative" display="inline-block" width={width && width}>
      {props.label && (
        <Box>
          <Label {...labelProps} htmlFor={labelProps.id} variant={labelVariant}>
            {required ? (
              <Box as="span" display="inline-flex" alignItems="center">
                {props.label}
                <Box as={Required} size={16} css={{ color: 'error' }} />
              </Box>
            ) : (
              props.label
            )}
          </Label>
        </Box>
      )}
      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={props.label}
        name={props.name}
        isDisabled={disabled}
      />
      <Box
        as="button"
        {...mergeProps(buttonProps, focusProps)}
        ref={triggerRef as RefObject<HTMLButtonElement>}
        variant={
          error && state.isOpen && !disabled
            ? 'button.select.errorOpened'
            : error
            ? 'button.select.error'
            : state.isOpen && !disabled
            ? 'button.select.open'
            : 'button.select'
        }
        disabled={disabled}
        className={className}
      >
        <Box
          as="span"
          {...valueProps}
          variant={disabled ? 'select.disabled' : 'select'}
        >
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </Box>
        {state.isOpen && !disabled ? (
          <Box as={ArrowUp} size={16} css={{ fill: 'text' }} />
        ) : (
          <Box
            as={ArrowDown}
            size={16}
            css={{ fill: disabled ? 'disabled' : 'text' }}
          />
        )}
      </Box>
      {state.isOpen && !disabled && (
        <Box
          as={Popover}
          {...overlayProps}
          {...positionProps}
          css={{
            width: triggerRef.current && triggerRef.current.offsetWidth + 'px',
          }}
          ref={overlayRef as Ref<HTMLDivElement>}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox error={error} {...menuProps} state={state} />
        </Box>
      )}
      {error && errorMessage && (
        <Box as="span" display="inline-flex" alignItems="center">
          <Box as={Exclamation} size={16} css={{ color: 'error' }} />
          <ValidationMessage>{errorMessage}</ValidationMessage>
        </Box>
      )}
    </Box>
  );
};
