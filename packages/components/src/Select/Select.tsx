import React, { Ref, RefObject, useRef } from 'react';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { HiddenSelect, useSelect } from '@react-aria/select';
import type { AriaSelectProps } from '@react-types/select';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useOverlayTrigger, useOverlayPosition } from '@react-aria/overlays';

import { ComponentProps } from '@marigold/types';
import { ArrowDown, ArrowUp } from '@marigold/icons';
import { useStyles } from '@marigold/system';

import { Box } from '../Box';
import { Label } from '../Label';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

export type SelectProps = {
  placeholder?: string;
  disabled?: boolean;
} & ComponentProps<'select'> &
  AriaSelectProps<object>;

export const Select = ({
  placeholder = 'Select an option',
  disabled,
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
    css: { width: triggerRef.current && triggerRef.current.offsetWidth + 'px' },
  });

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
    <Box position="relative" display="inline-block">
      {props.label && (
        <Box>
          <Label
            {...labelProps}
            htmlFor={labelProps.id}
            variant={disabled ? 'disabled' : 'above'}
          >
            {props.label}
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
          state.isOpen && !disabled ? 'button.select.open' : 'button.select'
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
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </Box>
  );
};
