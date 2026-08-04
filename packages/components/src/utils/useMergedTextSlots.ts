import { use, useMemo } from 'react';
import { TextContext } from 'react-aria-components/Text';

export type SlottedContextValue = {
  slots?: Record<string, { className?: string } & Record<string, unknown>>;
};

/**
 * Merges the given `label` / `description` classNames into the matching
 * slots of RAC's `TextContext`, spreading the parent slot config first so
 * RAC's `labelProps` / `descriptionProps` — including the `id` it uses to
 * wire `aria-describedby` — are preserved. Replacing the slot instead of
 * merging would break screen-reader description wiring.
 *
 * Returns a value ready to pass to `<Provider values={[[TextContext, value]]}>`.
 * Used by RAC-managed items (`ListBox.Item`, `SelectList.Option`) that style
 * their `label` / `description` slots via theme classNames.
 */
export const useMergedTextSlots = ({
  label,
  description,
}: {
  label?: string;
  description?: string;
}): SlottedContextValue => {
  const parent = use(TextContext) as SlottedContextValue | undefined;
  const parentSlots = parent?.slots;

  return useMemo(
    () => ({
      slots: {
        ...parentSlots,
        label: { ...(parentSlots?.label ?? {}), className: label },
        description: {
          ...(parentSlots?.description ?? {}),
          className: description,
        },
      },
    }),
    [parentSlots, label, description]
  );
};
