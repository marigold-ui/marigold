import { useMemo } from 'react';
import { KeyboardContext } from 'react-aria-components/Keyboard';
import { useSlottedContext } from 'react-aria-components/slots';

/**
 * Merges the given className into RAC's `KeyboardContext`, spreading the parent
 * value first so RAC's keyboard `id` (the item's `aria-describedby` target) is
 * preserved. Companion to {@link useMergedTextSlots} for the shortcut slot.
 */
export const useMergedKeyboardSlot = (className?: string) => {
  const parent = useSlottedContext(KeyboardContext);

  return useMemo(() => ({ ...parent, className }), [parent, className]);
};
