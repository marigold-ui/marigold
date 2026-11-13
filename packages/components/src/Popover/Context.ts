import type { RefObject } from 'react';
import { createContext, use } from 'react';
import type RAC from 'react-aria-components';
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

/**
 * Links `<Popover.Search>` to the `PopoverSearchScope` that `<Popover>`
 * renders around its parts. The search owns the search text, registers itself
 * and hands over its options.
 */
export interface PopoverSearchOptions {
  filter?: RAC.AutocompleteProps<object>['filter'];
  onInputChange?: (value: string) => void;
}

export interface PopoverSearchContextValue {
  /** Marks a search as present; returns the cleanup that unmarks it. */
  registerSearch: () => () => void;
  /** Latest callbacks of the mounted search, read when they are called. */
  optionsRef: RefObject<PopoverSearchOptions>;
  /** Mirrors the search's current text into the `Autocomplete`. */
  setInputValue: (value: string) => void;
}

export const PopoverSearchContext =
  createContext<PopoverSearchContextValue | null>(null);
