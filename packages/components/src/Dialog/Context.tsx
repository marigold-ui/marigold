import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type RAC from 'react-aria-components';
import type { ComponentClassNames } from '@marigold/system';

export interface DialogContextProps extends RAC.ModalOverlayProps {
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}
export const DialogContext = createContext<DialogContextProps>({});

/**
 * Carries the resolved theme classes and the title-slot wiring from the
 * `<Dialog>` root down to its sub-components (`Dialog.Header`,
 * `Dialog.Content`, `Dialog.Actions`). Mirrors `CardContext` / `PanelContext`
 * from the rest of the slot-configuration family.
 */
export interface DialogSlotContextValue {
  classNames: ComponentClassNames<'Dialog'>;
  titleId: string;
  hasTitle: boolean;
  titleSlotRef: RefCallback<Element>;
}

export const DialogSlotContext = createContext<DialogSlotContextValue | null>(
  null
);

export const useDialogSlotContext = () => {
  const ctx = use(DialogSlotContext);

  if (ctx === null) {
    throw new Error(
      'Dialog sub-components must be used within a <Dialog> component.'
    );
  }

  return ctx;
};
