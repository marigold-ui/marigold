import { use, useMemo } from 'react';
import { KeyboardContext } from 'react-aria-components/Keyboard';

type KeyboardContextValue = { className?: string } & Record<string, unknown>;

/**
 * Merges the given className into RAC's `KeyboardContext`, spreading the parent
 * value first so RAC's keyboard `id` (the item's `aria-describedby` target) is
 * preserved. Companion to {@link useMergedTextSlots} for the shortcut slot.
 */
export const useMergedKeyboardSlot = (
  className?: string
): KeyboardContextValue => {
  const parent = use(KeyboardContext) as KeyboardContextValue | undefined;

  return useMemo(() => ({ ...(parent ?? {}), className }), [parent, className]);
};
