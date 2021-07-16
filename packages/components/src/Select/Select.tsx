import React, { useRef } from 'react';
import { useSelectState } from 'react-stately';
import {
  HiddenSelect,
  mergeProps,
  useSelect,
  useButton,
  useFocusRing,
} from 'react-aria';
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
  const selectColor = '#4B4B4B';
  const labelClassName = useStyles({
    css: { color: disabled ? 'disabled' : selectColor },
  });
  const iconClassName = useStyles({
    css: { color: disabled ? 'disabled' : selectColor, pl: '5px' },
  });
  const buttonTextClassName = useStyles({
    css: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 400,
      lineHeight: '32px',
      color: disabled ? 'disabled' : selectColor,
      cursor: disabled && 'not-allowed',
    },
  });

  return (
    <Box position="relative" display="inline-block">
      {props.label && (
        <Box>
          <Label
            {...labelProps}
            htmlFor={labelProps.id}
            variant="above"
            className={labelClassName}
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
        <Box as="span" {...valueProps} className={buttonTextClassName}>
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </Box>
        {state.isOpen && !disabled ? (
          <ArrowUp className={iconClassName} />
        ) : (
          <ArrowDown className={iconClassName} />
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
