import type { Key, ReactNode } from 'react';
import {
  use,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
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
import { CommandPaletteContext, CommandPaletteTriggerContext } from './Context';
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
> & { close: () => void };

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
  filter,
  close,
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

  // Groups with a `prefix` register here. Typing a prefix narrows the search
  // to its group: the prefix leaves the query and shows as a chip, so the
  // query, also the one an app sends to its server, is only the search term.
  const prefixes = useRef(new Map<string, string>());
  const [scope, setScope] = useState<string | null>(null);
  const registerPrefix = useCallback((prefix: string, title: string) => {
    prefixes.current.set(prefix, title);
    return () => {
      prefixes.current.delete(prefix);
    };
  }, []);
  const leaveScope = useCallback(() => setScope(null), []);

  const narrowToTypedPrefix = useEffectEvent(() => {
    if (scope !== null) return;
    const query = inputValue.toLocaleLowerCase();
    for (const prefix of prefixes.current.keys()) {
      if (query.startsWith(prefix.toLocaleLowerCase())) {
        setScope(prefix);
        setInputValue(inputValue.slice(prefix.length).trimStart());
        return;
      }
    }
  });
  // Before paint, so the typed prefix never flashes in the field.
  useLayoutEffect(() => {
    narrowToTypedPrefix();
  }, [inputValue]);

  const { inputRef, menuRef } = useKeepFirstItemActive(
    `${scope ?? ''}${inputValue}`,
    items
  );
  const context = useMemo(
    () => ({
      inputValue,
      filter,
      classNames,
      close,
      scope,
      scopeTitle: scope === null ? null : (prefixes.current.get(scope) ?? null),
      leaveScope,
      registerPrefix,
    }),
    [inputValue, filter, classNames, close, scope, leaveScope, registerPrefix]
  );

  return (
    <CommandPaletteContext value={context}>
      <SearchableCollection
        filter={filter}
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
          onAction={key => onAction?.(key)}
          // Inside the menu, where RAC announces it.
          renderEmptyState={() => (
            <div className={classNames.empty}>
              {loading
                ? stringFormatter.format('loadingMessage')
                : (emptyState ?? <DefaultEmptyState query={inputValue} />)}
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

  const body = (
    <CommandPaletteBody
      {...props}
      loading={loading}
      // Each item closes the palette after its action, see `CommandPaletteItem`.
      close={() => setOpen(false)}
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
          <CommandPaletteFooter classNames={classNames} />
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
