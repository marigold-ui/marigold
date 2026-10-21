import { createContext, use } from 'react';

/**
 * Carries the dismiss behaviour from the `<Popover>` root down to
 * `<Popover.Content>`, which applies it to whichever overlay it renders
 * (the positioned popover on desktop, the tray on small screens). Same split
 * as `Dialog.Trigger` and `DialogContext`.
 */
export interface PopoverContextValue {
  dismissable: boolean;
  keyboardDismissable: boolean;
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
