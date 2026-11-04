import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useSlotId } from '@react-aria/utils';
import type { HelpTextSlots } from '../FieldBase/FieldBase';
import type { HelpTextProps } from '../HelpText/HelpText';
import { joinIds } from './useLabelAddon';

export interface UseFieldHelpTextProps {
  description?: ReactNode;
  errorMessage?: HelpTextProps['errorMessage'];
  isInvalid?: boolean;
  'aria-describedby'?: string;
}

/**
 * The help text wiring a RAC field does internally, for the fields that wrap
 * a non-field RAC element in a plain `<FieldBase>` (`SelectList`, `TagGroup`,
 * `RangeCalendar`). Mirrors RAC's `TextField`: `useSlotId` hands out the
 * description and error ids, `helpTextSlots` puts them on the rendered help
 * text, and `describedBy` points the field's focusable element at them.
 *
 * `useSlotId` only keeps an id while an element with it is in the DOM, so
 * `describedBy` names exactly the help text that is shown. It is used instead
 * of `useField`, which would also run `useLabel` and warn about a missing
 * label on fields like `RangeCalendar` that are labelled elsewhere.
 */
export const useFieldHelpText = ({
  description,
  errorMessage,
  isInvalid,
  'aria-describedby': ariaDescribedBy,
}: UseFieldHelpTextProps) => {
  const deps = [Boolean(description), Boolean(errorMessage), isInvalid];
  const descriptionId = useSlotId(deps);
  const errorMessageId = useSlotId(deps);

  const helpTextSlots = useMemo<HelpTextSlots>(
    () => ({
      description: { id: descriptionId },
      errorMessage: { id: errorMessageId },
    }),
    [descriptionId, errorMessageId]
  );

  return {
    describedBy: joinIds(descriptionId, errorMessageId, ariaDescribedBy),
    helpTextSlots,
  };
};
