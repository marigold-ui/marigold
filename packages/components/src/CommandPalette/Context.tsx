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
  /** The search term: the query without a group's prefix. */
  query: string;
  /** The prefix of the group the search is narrowed to, if any. */
  scope: string | null;
  registerPrefix: (prefix: string) => () => void;
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
