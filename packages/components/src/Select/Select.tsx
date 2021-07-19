import React, { useRef } from 'react';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { HiddenSelect, useSelect } from '@react-aria/select';
import type { AriaSelectProps } from '@react-types/select';

import { ComponentProps } from '@marigold/types';
import { ArrowDown, ArrowUp } from '@marigold/icons';
import { useStyles } from '@marigold/system';

import { Box, BoxOwnProps } from '../Box';
import { Label } from '../Label';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

export type SelectProps = {
  placeholder?: string;
  disabled?: boolean;
} & ComponentProps<'select'> &
  BoxOwnProps &
  AriaSelectProps<object>;

export const Select = ({
  placeholder = 'Select an option',
  disabled,
  className,
  ...props
}: SelectProps) => {
  const state = useSelectState(props);
  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );
  const { buttonProps } = useButton(triggerProps, ref);
  const { focusProps } = useFocusRing();
  const iconClassName = useStyles({
    css: { fill: disabled ? 'disabled' : 'text' },
  });

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
        triggerRef={ref}
        label={props.label}
        name={props.name}
        isDisabled={true}
      />
      <Box
        as="button"
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        variant="button.select"
        disabled={disabled}
        className={className}
      >
        <Box
          as="span"
          {...valueProps}
          variant={disabled ? 'select.disabled' : 'select.root'}
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
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </Box>
  );
};
