import type { Key, ReactNode } from 'react';
import { use, useLayoutEffect, useMemo, useRef } from 'react';
import type RAC from 'react-aria-components';
import { Dialog } from 'react-aria-components/Dialog';
import { Menu } from 'react-aria-components/Menu';
import { Modal } from 'react-aria-components/Modal';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useEffectEvent } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import type { ComponentClassNames } from '@marigold/system';
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
   * afterwards.
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
   * The initial search query (uncontrolled).
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
// Search and list. A part of its own so it mounts with the open overlay: the
// hook that keeps the first row active needs the input to exist.
interface CommandPaletteBodyProps<T extends object> extends Pick<
  CommandPaletteProps<T>,
  | 'children'
  | 'items'
  | 'dependencies'
  | 'placeholder'
  | 'emptyState'
  | 'filter'
> {
  onAction: (key: Key) => void;
  loading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  classNames: ComponentClassNames<'CommandPalette'>;
}

const CommandPaletteBody = <T extends object>({
  children,
  items,
  dependencies,
  onAction,
  placeholder,
  emptyState,
  loading,
  inputValue,
  onInputChange,
  filter,
  classNames,
}: CommandPaletteBodyProps<T>) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useKeepFirstItemActive(inputRef, inputValue, items);
  const context = useMemo(
    () => ({ inputValue, filter, classNames }),
    [inputValue, filter, classNames]
  );

  return (
    <CommandPaletteContext value={context}>
      <SearchableCollection
        filter={filter}
        inputValue={inputValue}
        onInputChange={onInputChange}
      >
        <CommandPaletteSearch
          ref={inputRef}
          placeholder={placeholder}
          loading={loading}
          classNames={classNames}
        />
        <Menu
          ref={menuRef}
          items={items}
          dependencies={dependencies}
          className={classNames.list}
          // The first row is active on open, so Enter runs it right away.
          // Focus stays in the input, the row only gets virtual focus.
          autoFocus="first"
          onAction={onAction}
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
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  'aria-label': ariaLabel,
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

  const body = (
    <CommandPaletteBody
      items={items}
      dependencies={dependencies}
      onAction={key => {
        onAction?.(key);
        setOpen(false);
      }}
      placeholder={placeholder}
      emptyState={emptyState}
      loading={loading}
      inputValue={inputValue}
      onInputChange={setInputValue}
      filter={filter}
      classNames={classNames}
    >
      {children}
    </CommandPaletteBody>
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
          <CommandPaletteFooter loading={loading} classNames={classNames} />
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
