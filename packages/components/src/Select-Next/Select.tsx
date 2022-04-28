import React, { useRef } from 'react';
import { useSelectState } from '@react-stately/select';
import type { AriaSelectProps } from '@react-types/select';

import { ComponentProps } from '@marigold/types';
import { useSelect } from '@react-aria/select';

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
      'onKeyUp' | 'onKeyDown' | 'onFocus' | 'onBlur' | 'children'
    > {
  open?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
}

// Component
// ---------------
export const Select = ({
  open,
  disabled,
  required,
  error,
  ...rest
}: SelectProps) => {
  const props: AriaSelectProps<object> = {
    isOpen: open,
    isDisabled: disabled,
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  };

  const state = useSelectState(props);
  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );
};
