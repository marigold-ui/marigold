import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useField } from '@react-aria/label';
import type { HelpTextSlots } from '../FieldBase/FieldBase';
import type { HelpTextProps } from '../HelpText/HelpText';

export interface UseFieldHelpTextProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: HelpTextProps['errorMessage'];
  isInvalid?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * The help text wiring a RAC field does internally, for the fields that wrap
 * a non-field RAC element in a plain `<FieldBase>` (`SelectList`, `TagGroup`,
 * `RangeCalendar`). Mirrors RAC's `TextField`: `useField` hands out the
 * description and error ids, `helpTextSlots` puts them on the rendered help
 * text, and `describedBy` points the field's focusable element at them.
 *
 * `useField` only keeps an id while an element with it is in the DOM, so
 * `describedBy` names exactly the help text that is shown.
 */
export const useFieldHelpText = ({
  label,
  description,
  errorMessage,
  isInvalid,
  ...ariaProps
}: UseFieldHelpTextProps) => {
  const { fieldProps, descriptionProps, errorMessageProps } = useField({
    ...ariaProps,
    label,
    description,
    errorMessage,
    isInvalid,
  });

  const descriptionId = descriptionProps.id;
  const errorMessageId = errorMessageProps.id;
  const helpTextSlots = useMemo<HelpTextSlots>(
    () => ({
      description: { id: descriptionId },
      errorMessage: { id: errorMessageId },
    }),
    [descriptionId, errorMessageId]
  );

  return {
    describedBy: fieldProps['aria-describedby'],
    helpTextSlots,
  };
};
