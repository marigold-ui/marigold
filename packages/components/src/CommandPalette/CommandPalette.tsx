import type { ReactNode } from 'react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useEffectEvent } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import { useClassNames } from '@marigold/system';
import type { SearchableCollectionFilter } from '../utils/SearchableCollection';
import { useKeyboardShortcut } from '../utils/keyboardShortcut';
import { CommandPaletteContent } from './CommandPaletteContent';
import { CommandPaletteEmpty } from './CommandPaletteEmpty';
import { CommandPaletteGroup } from './CommandPaletteGroup';
import { CommandPaletteInput } from './CommandPaletteInput';
import { CommandPaletteItem } from './CommandPaletteItem';
import { CommandPaletteList } from './CommandPaletteList';
import { CommandPaletteLoading } from './CommandPaletteLoading';
import { CommandPaletteTrigger } from './CommandPaletteTrigger';
import {
  CommandPaletteContext,
  CommandPaletteEmptyStateContext,
  type EmptyStatePart,
} from './Context';

// Props
// ---------------
export interface CommandPaletteProps {
  /**
   * The parts of the palette: an optional `CommandPalette.Trigger` and the
   * `CommandPalette.Content` overlay.
   */
  children?: ReactNode;

  /**
   * Whether the palette is open (controlled).
   */
  open?: boolean;

  /**
   * Whether the palette is open by default (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Handler that is called when the palette opens or closes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The search query (controlled). Use it to drive a server-side search or to
   * show different content while the query is empty.
   */
  inputValue?: string;

  /**
   * The initial search query (uncontrolled).
   * @default ''
   */
  defaultInputValue?: string;

  /**
   * Handler that is called when the search query changes.
   */
  onInputChange?: (value: string) => void;

  /**
   * The key that opens the palette together with ⌘ (macOS) or Ctrl (elsewhere).
   * Pass `false` to disable the global shortcut, e.g. when the app already
   * uses the key.
   * @default 'k'
   */
  shortcut?: string | false;

  /**
   * How items are matched against the query. Defaults to a locale- and
   * accent-aware "contains" match that keeps the authored order and groups.
   * Pass `false` to filter yourself, e.g. on the server.
   */
  filter?: SearchableCollectionFilter | false;

  variant?: string;
  size?: string;
}

// Component
// ---------------
const CommandPaletteBase = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  inputValue: inputValueProp,
  defaultInputValue = '',
  onInputChange,
  shortcut = 'k',
  filter,
  variant,
  size,
}: CommandPaletteProps) => {
  const classNames = useClassNames({
    component: 'CommandPalette',
    variant,
    size,
  });
  // Resolved once here rather than in every item, which re-renders per keystroke.
  const keyCap = useClassNames({ component: 'Keyboard' });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange
  );
  const [inputValue, setInputValue] = useControlledState(
    inputValueProp,
    defaultInputValue,
    onInputChange
  );

  // Every opening starts from an empty query, including openings driven by a
  // controlled `open`. Runs before paint, so the old query never flashes.
  const clearQuery = useEffectEvent(() => setInputValue(''));
  const wasOpenRef = useRef(open);
  useLayoutEffect(() => {
    if (open && !wasOpenRef.current) clearQuery();
    wasOpenRef.current = open;
  }, [open]);

  useKeyboardShortcut(shortcut, () => setOpen(!open));

  // `.Empty` and `.Loading` announce themselves by mounting, so a consumer
  // shows a loading state with `{isLoading && <CommandPalette.Loading />}`.
  const [counts, setCounts] = useState({ empty: 0, loading: 0 });
  const register = useCallback((part: EmptyStatePart) => {
    setCounts(c => ({ ...c, [part]: c[part] + 1 }));
    return () => setCounts(c => ({ ...c, [part]: c[part] - 1 }));
  }, []);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const loading = counts.loading > 0;
  const hasEmpty = counts.empty > 0;

  const value = useMemo(
    () => ({
      open,
      setOpen,
      inputValue,
      setInputValue,
      filter,
      shortcut,
      classNames,
      keyCap,
      inputRef,
    }),
    [
      open,
      setOpen,
      inputValue,
      setInputValue,
      filter,
      shortcut,
      classNames,
      keyCap,
    ]
  );
  const emptyState = useMemo(
    () => ({ loading, hasEmpty, register, target, setTarget }),
    [loading, hasEmpty, register, target]
  );

  return (
    <CommandPaletteContext value={value}>
      <CommandPaletteEmptyStateContext value={emptyState}>
        {children}
      </CommandPaletteEmptyStateContext>
    </CommandPaletteContext>
  );
};

export const CommandPalette = Object.assign(CommandPaletteBase, {
  Trigger: CommandPaletteTrigger,
  Content: CommandPaletteContent,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
  Empty: CommandPaletteEmpty,
  Loading: CommandPaletteLoading,
});
