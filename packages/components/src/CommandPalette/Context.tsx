import type { ReactNode } from 'react';
import { createContext, use, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ComponentClassNames } from '@marigold/system';
import type { SearchableCollectionFilter } from '../utils/SearchableCollection';

// Palette state
// ---------------
export interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  filter?: SearchableCollectionFilter | false;
  /** The shortcut key, or `false` when the shortcut is disabled. */
  shortcut: string | false;
  classNames: Pick<
    ComponentClassNames<'CommandPalette'>,
    | 'trigger'
    | 'container'
    | 'header'
    | 'input'
    | 'list'
    | 'group'
    | 'empty'
    | 'footer'
    | 'legend'
  >;
}

export const CommandPaletteContext =
  createContext<CommandPaletteContextValue | null>(null);

export const useCommandPalette = (): CommandPaletteContextValue => {
  const ctx = use(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      'CommandPalette parts must be used within a <CommandPalette>.'
    );
  }
  return ctx;
};

// Empty state
// ---------------
// Kept apart from the palette state: it flips whenever the list empties or
// `.Loading` mounts, and only the parts that render the empty state (Input,
// List, Empty, Loading) need to re-render then.
export type EmptyStatePart = 'empty' | 'loading';

export interface CommandPaletteEmptyStateValue {
  /** Whether a `CommandPalette.Loading` is mounted. */
  loading: boolean;
  /** Whether a `CommandPalette.Empty` is mounted. */
  hasEmpty: boolean;
  /** Registers a mounted `.Empty` / `.Loading` part; returns the cleanup. */
  register: (part: EmptyStatePart) => () => void;
  /** The menu's empty-state element that `.Empty` / `.Loading` portal into. */
  target: HTMLElement | null;
  setTarget: (element: HTMLElement | null) => void;
}

export const CommandPaletteEmptyStateContext =
  createContext<CommandPaletteEmptyStateValue | null>(null);

export const useCommandPaletteEmptyState =
  (): CommandPaletteEmptyStateValue => {
    const ctx = use(CommandPaletteEmptyStateContext);
    if (!ctx) {
      throw new Error(
        'CommandPalette parts must be used within a <CommandPalette>.'
      );
    }
    return ctx;
  };

// Registers an `.Empty` / `.Loading` part and portals its content into the
// menu's empty state, so it sits inside the menu where RAC announces it.
export const useEmptyStatePortal = (
  part: EmptyStatePart,
  content: ReactNode,
  hidden = false
) => {
  const { register, target } = useCommandPaletteEmptyState();
  useLayoutEffect(() => register(part), [register, part]);

  return target && !hidden ? createPortal(content, target) : null;
};
