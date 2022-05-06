import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useLocale } from '@react-aria/i18n';
import { useNumberField } from '@react-aria/numberfield';
import { useNumberFieldState } from '@react-stately/numberfield';

export interface NumberFieldProps {}

export const NumberField = forwardRef(({ ...props }: NumberFieldProps, ref) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);
  const incrRef = useRef();
  const decRef = useRef();
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  const { buttonProps: incrementProps } = useButton(
    incrementButtonProps,
    incrRef
  );
  const { buttonProps: decrementProps } = useButton(
    decrementButtonProps,
    decRef
  );
});
