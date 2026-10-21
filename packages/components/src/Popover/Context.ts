import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

/**
 * Carries the dismiss behaviour from `<Popover.Trigger>` to `<Popover>`, which
 * applies it to whichever overlay it renders (the positioned popover on
 * desktop, the tray on small screens). Same split as `Dialog.Trigger` and
 * `DialogContext`.
 */
export interface PopoverTriggerContextValue {
  dismissable: boolean;
  keyboardDismissable: boolean;
}

export const PopoverTriggerContext = createContext<PopoverTriggerContextValue>({
  dismissable: true,
  keyboardDismissable: true,
});

/**
 * Carries the resolved theme classes from `<Popover>` to its parts, and
 * whether it currently renders as a tray.
 */
export interface PopoverContextValue {
  classNames: ComponentClassNames<'Popover'>;
  isTray: boolean;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopoverContext = () => {
  const ctx = use(PopoverContext);

  if (ctx === null) {
    throw new Error(
      'Popover sub-components must be used within a <Popover> component.'
    );
  }

  return ctx;
};
