import type { Key, ReactNode } from 'react';
import {
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import { useFilter } from 'react-aria-components/Autocomplete';
import { Dialog } from 'react-aria-components/Dialog';
import { Menu } from 'react-aria-components/Menu';
import { Modal } from 'react-aria-components/Modal';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useEffectEvent } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Underlay } from '../Overlay/Underlay';
import { Tray } from '../Tray/Tray';
import { Search } from '../icons/Search';
import { intlMessages } from '../intl/messages';
import type { SearchableCollectionFilter } from '../utils/SearchableCollection';
import { SearchableCollection } from '../utils/SearchableCollection';
import { CommandPaletteButton } from './CommandPaletteButton';
import { CommandPaletteFooter } from './CommandPaletteFooter';
import { CommandPaletteGroup } from './CommandPaletteGroup';
import { CommandPaletteItem } from './CommandPaletteItem';
import { CommandPaletteSearch } from './CommandPaletteSearch';
import { CommandPaletteTrigger, PALETTE } from './CommandPaletteTrigger';
import type { GroupPrefix } from './Context';
import {
  CommandPaletteContext,
  CommandPaletteTriggerContext,
  MORE_KEY,
} from './Context';
import { useKeepFirstItemActive } from './useKeepFirstItemActive';

// Props
// ---------------
export interface CommandPaletteProps<T extends object = object> {
  /**
   * The groups and items, or a render function when `items` is used.
   */
  children: ReactNode | ((item: T) => ReactNode);

  /**
   * Items for a dynamic collection, e.g. results of a server-side search.
   */
  items?: Iterable<T>;

  /**
   * Values that invalidate the cached items, like a hook's dependency array.
   */
  dependencies?: RAC.MenuProps<T>['dependencies'];

  /**
   * Handler that is called when an item is chosen. The palette closes
   * afterwards, unless the item sets `shouldCloseOnSelect={false}`.
   */
  onAction?: (key: Key) => void;

  /**
   * Placeholder text of the search input. Name what people can find, for
   * example "Search pages and actions…".
   * @default 'Go to…'
   */
  placeholder?: string;

  /**
   * Content shown when there are no results. Replaces the default message.
   */
  emptyState?: ReactNode;

  /**
   * Whether results are loading. Shows a spinner in the search input and a
   * loading message while the list is empty.
   * @default false
   */
  loading?: boolean;

  /**
   * The search query (controlled). Use it to drive a server-side search or to
   * show different content while the query is empty.
   */
  inputValue?: string;

  /**
   * The search query each opening starts with (uncontrolled).
   * @default ''
   */
  defaultInputValue?: string;

  /**
   * Handler that is called when the search query changes.
   */
  onInputChange?: (value: string) => void;

  /**
   * Handler that is called with the search term and the prefix of the group
   * it is narrowed to, also when the palette opens. The term is the query
   * without the prefix, ready to send to a server search.
   */
  onSearchChange?: (search: CommandPaletteSearchState) => void;

  /**
   * How items are matched against the query. Defaults to a locale- and
   * accent-aware "contains" match that keeps the authored order and groups.
   * Pass `false` to filter yourself, e.g. on the server.
   */
  filter?: SearchableCollectionFilter | false;

  /**
   * Whether the palette is open (controlled). Only used without a
   * `CommandPalette.Trigger`, which otherwise holds the open state.
   */
  open?: boolean;

  /**
   * Whether the palette is open by default (uncontrolled). Only used without
   * a `CommandPalette.Trigger`.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Handler that is called when the palette opens or closes. Only used
   * without a `CommandPalette.Trigger`.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Accessible name of the palette.
   * @default 'Command palette'
   */
  'aria-label'?: string;
}

export interface CommandPaletteSearchState {
  /** The query without the prefix. */
  term: string;
  /** The prefix of the group the search is narrowed to, if any. */
  prefix: string | null;
}

// Default empty state
// ---------------
const DefaultEmptyState = ({ query }: { query: string }) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  if (!query) return stringFormatter.format('commandPaletteTypeToSearch');
  return (
    <>
      <Search aria-hidden="true" />
      <strong>{stringFormatter.format('noResultsFor', { query })}</strong>
      <span>{stringFormatter.format('noResultsHint')}</span>
    </>
  );
};

// Body
// ---------------
// Search and list. Mounts with the open overlay, so every opening starts with
// fresh state and the query only re-renders this part, not the overlay.
type CommandPaletteBodyProps<T extends object> = Omit<
  CommandPaletteProps<T>,
  'open' | 'defaultOpen' | 'onOpenChange' | 'aria-label'
> & {
  close: () => void;
  prefixes: readonly GroupPrefix[];
  registerPrefix: (prefix: GroupPrefix) => () => void;
};

const CommandPaletteBody = <T extends object>({
  children,
  items,
  dependencies,
  onAction,
  placeholder,
  emptyState,
  loading = false,
  inputValue: inputValueProp,
  defaultInputValue = '',
  onInputChange,
  onSearchChange,
  filter,
  close,
  prefixes,
  registerPrefix,
}: CommandPaletteBodyProps<T>) => {
  const classNames = useClassNames({ component: 'CommandPalette' });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const [inputValue, setInputValue] = useControlledState(
    inputValueProp,
    defaultInputValue,
    onInputChange
  );

  // A controlled query outlives the palette, so every opening clears it.
  // Runs before paint, so the old query never flashes.
  const clearQuery = useEffectEvent(() => {
    if (inputValueProp) setInputValue('');
  });
  useLayoutEffect(() => {
    clearQuery();
  }, []);

  // A query that starts with a group's prefix narrows the search to that
  // group, and only the rest is matched.
  const { contains, startsWith } = useFilter({ sensitivity: 'base' });
  const scope =
    prefixes.find(({ prefix }) => startsWith(inputValue, prefix))?.prefix ??
    null;
  const query = scope ? inputValue.slice(scope.length).trimStart() : inputValue;
  const match = useMemo(() => {
    if (filter === false) return false;
    const base = filter ?? contains;
    if (!scope) return base;
    return (text: string, input: string) =>
      base(text, input.slice(scope.length).trimStart());
  }, [filter, contains, scope]);

  // An effect, so the app also hears the empty search of a fresh opening.
  const reportSearch = useEffectEvent(() =>
    onSearchChange?.({ term: query.trim(), prefix: scope })
  );
  useEffect(() => {
    reportSearch();
  }, [query, scope]);

  const { inputRef, menuRef } = useKeepFirstItemActive(inputValue, items);
  const context = useMemo(
    () => ({
      query,
      filter,
      classNames,
      scope,
      registerPrefix,
      narrowTo: (prefix: string) => setInputValue(`${prefix}${query}`),
    }),
    [query, filter, classNames, scope, registerPrefix, setInputValue]
  );

  return (
    <CommandPaletteContext value={context}>
      <SearchableCollection
        filter={match}
        inputValue={inputValue}
        onInputChange={setInputValue}
      >
        <CommandPaletteSearch
          ref={inputRef}
          placeholder={placeholder}
          loading={loading}
        />
        <Menu
          ref={menuRef}
          items={items}
          dependencies={dependencies}
          className={classNames.list}
          // The first row is active on open, so Enter runs it right away.
          // Focus stays in the input, the row only gets virtual focus.
          autoFocus="first"
          // RAC passes more than the key, the public handler takes the key.
          // A group's "more" row is the palette's own, not the app's.
          onAction={key => {
            if (!String(key).startsWith(MORE_KEY)) onAction?.(key);
          }}
          // Called after an item's action, unless the item sets
          // `shouldCloseOnSelect={false}`.
          onClose={close}
          // Inside the menu, where RAC announces it.
          renderEmptyState={() => (
            <div className={classNames.empty}>
              {loading
                ? stringFormatter.format('loadingMessage')
                : (emptyState ?? <DefaultEmptyState query={query} />)}
            </div>
          )}
        >
          {children}
        </Menu>
      </SearchableCollection>
    </CommandPaletteContext>
  );
};

// Component
// ---------------
// Desktop: a modal dialog near the top of the viewport. Small screens: a
// bottom `Tray`. ADR-0007 puts edge overlays on the internal Sheet primitive;
// that primitive does not exist yet, so this follows `Menu` and `TagField` on
// `Tray` until the overlays migrate together.
const CommandPaletteBase = <T extends object>({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  'aria-label': ariaLabel,
  loading = false,
  ...props
}: CommandPaletteProps<T>) => {
  const classNames = useClassNames({ component: 'CommandPalette' });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const label = ariaLabel ?? stringFormatter.format('commandPalette');

  const trigger = use(CommandPaletteTriggerContext);
  const [ownOpen, setOwnOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange
  );
  const open = trigger ? trigger.open : ownOpen;
  const setOpen = trigger ? trigger.setOpen : setOwnOpen;
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Groups with a `prefix` register here, so the search can narrow to them
  // and the footer can list them. Held here, as the footer sits outside the
  // search and list.
  const [prefixes, setPrefixes] = useState<readonly GroupPrefix[]>([]);
  const registerPrefix = useCallback((entry: GroupPrefix) => {
    setPrefixes(current => [...current, entry]);
    return () => setPrefixes(current => current.filter(e => e !== entry));
  }, []);

  const body = (
    <CommandPaletteBody
      {...props}
      loading={loading}
      close={close}
      prefixes={prefixes}
      registerPrefix={registerPrefix}
    />
  );

  if (isSmallScreen) {
    return (
      <Tray open={open} onOpenChange={setOpen} aria-label={label}>
        {/* Edge to edge: the search divider spans the tray, like Dialog's. */}
        <Tray.Content className="flex flex-col p-0">{body}</Tray.Content>
        <Tray.Actions>
          <Button slot="close">{stringFormatter.format('close')}</Button>
        </Tray.Actions>
      </Tray>
    );
  }

  return (
    <Underlay open={open} onOpenChange={setOpen} dismissable variant="quick">
      <Modal className={cn('z-50', classNames.container)}>
        <Dialog
          aria-label={label}
          className="flex max-h-[inherit] min-h-0 flex-col outline-hidden"
        >
          {body}
          <CommandPaletteFooter classNames={classNames} prefixes={prefixes} />
        </Dialog>
      </Modal>
    </Underlay>
  );
};

export const CommandPalette = Object.assign(CommandPaletteBase, {
  [PALETTE]: true,
  Trigger: CommandPaletteTrigger,
  Button: CommandPaletteButton,
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
});
