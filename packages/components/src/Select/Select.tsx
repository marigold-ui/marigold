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
import { useStyles } from '@marigold/system';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

export type SelectProps = {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  width?: string;
} & ComponentProps<'select'> &
  AriaSelectProps<object> &
  SingleSelection;

export const Select = ({
  placeholder = 'Select an option',
  disabled,
  required,
  error,
  width,
  className,
  ...props
}: SelectProps) => {
  const state = useSelectState(props);
  const overlayTriggerState = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLElement>() as RefObject<HTMLElement>;
  const overlayRef = useRef<HTMLDivElement>();
  const iconClassName = useStyles({
    css: { fill: disabled ? 'disabled' : 'text' },
  });
  const popoverClassName = useStyles({
    css: {
      width: width
        ? width
        : triggerRef.current && triggerRef.current.offsetWidth + 'px',
    },
  });
  const errorClassName = useStyles({ css: { color: 'error' } });

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
          <Label
            {...labelProps}
            htmlFor={labelProps.id}
            variant={disabled ? 'disabled' : 'above'}
          >
            {required || error ? (
              <Box as="span" display="inline-flex" alignItems="center">
                {props.label}
                <Required size={16} className={errorClassName} />
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
          <ArrowUp size={16} className={iconClassName} />
        ) : (
          <ArrowDown size={16} className={iconClassName} />
        )}
      </Box>
      {state.isOpen && !disabled && (
        <Popover
          {...overlayProps}
          {...positionProps}
          className={popoverClassName}
          ref={overlayRef as Ref<HTMLDivElement>}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox error={error} {...menuProps} state={state} />
        </Popover>
      )}
      {error && (
        <Box as="span" display="inline-flex" alignItems="center">
          <Exclamation size={16} className={errorClassName} />
          <ValidationMessage>{error}</ValidationMessage>
        </Box>
      )}
    </Box>
  );
};
