import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';
import type { SearchableCollectionFilter } from '../utils/SearchableCollection';

// Trigger state
// ---------------
// Provided by `CommandPalette.Trigger`, read by the palette and its button.
interface CommandPaletteTriggerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** The shortcut key, or `false` when the shortcut is disabled. */
  shortcut: string | false;
}

export const CommandPaletteTriggerContext =
  createContext<CommandPaletteTriggerContextValue | null>(null);

export const useCommandPaletteTrigger =
  (): CommandPaletteTriggerContextValue => {
    const ctx = use(CommandPaletteTriggerContext);
    if (!ctx) {
      throw new Error(
        '<CommandPalette.Button> must be used within a <CommandPalette.Trigger>.'
      );
    }
    return ctx;
  };

// Palette state
// ---------------
// Provided by `CommandPalette`, read by its groups and items.
interface CommandPaletteContextValue {
  inputValue: string;
  /** Closes the palette, called after an item was chosen. */
  close: () => void;
  /** The prefix of the group the search is narrowed to, if any. */
  scope: string | null;
  /** The title of that group, shown in the search field. */
  scopeTitle: string | null;
  /** Widens the search to all groups again. */
  leaveScope: () => void;
  /** Lets a group with a `prefix` take part in narrowing the search. */
  registerPrefix: (prefix: string, title: string) => () => void;
  filter?: SearchableCollectionFilter | false;
  classNames: ComponentClassNames<'CommandPalette'>;
}

export const CommandPaletteContext =
  createContext<CommandPaletteContextValue | null>(null);

export const useCommandPalette = (): CommandPaletteContextValue => {
  const ctx = use(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      'CommandPalette groups and items must be used within a <CommandPalette>.'
    );
  }
  return ctx;
};
