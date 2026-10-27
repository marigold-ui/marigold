import type { ReactNode } from 'react';
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { announce } from '@react-aria/live-announcer';
import type { Key, Selection } from '@react-types/shared';
import { Checkbox } from '../Checkbox/Checkbox';
import { intlMessages } from '../intl/messages';
import { useDevWarning } from './useDevWarning';

interface SelectableKeysOptions<T> {
  children: ReactNode | ((item: T) => ReactNode);
  items?: Iterable<T>;
  disabledKeys?: Iterable<Key>;
  enabled?: boolean;
  /**
   * Gates the missing-`id` warning. The keys are also derived for
   * <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> on a list that has no
   * select-all, and such a list has nothing to warn about. Defaults to
   * `enabled`.
   */
  warn?: boolean;
}

const EMPTY_KEYS: { keys: Key[]; hasMissingIds: boolean } = {
  keys: [],
  hasMissingIds: false,
};

const idOf = (item: unknown) => {
  const candidate = item as { id?: Key; key?: Key } | null;
  return candidate?.id ?? candidate?.key;
};

export const useSelectableKeys = <T,>({
  children,
  items,
  disabledKeys,
  enabled,
  warn,
}: SelectableKeysOptions<T>): Key[] => {
  const fromItems = items !== undefined;
  const source = items ?? children;

  const { keys, hasMissingIds } = useMemo(() => {
    if (enabled === false) {
      return EMPTY_KEYS;
    }

    const disabled = new Set<Key>(disabledKeys ?? []);
    const candidates: (Key | undefined)[] = fromItems
      ? Array.from(source as Iterable<T>, idOf)
      : Children.toArray(source as ReactNode).flatMap(child => {
          if (!isValidElement<{ id?: Key; disabled?: boolean }>(child)) {
            return [];
          }
          return child.props.disabled ? [] : [child.props.id];
        });

    return {
      keys: candidates.filter(
        (key): key is Key => key != null && !disabled.has(key)
      ),
      hasMissingIds: candidates.some(key => key == null),
    };
  }, [enabled, fromItems, source, disabledKeys]);

  useDevWarning(
    (warn ?? enabled) === true && hasMissingIds,
    '[ListView/SelectList] A select-all only covers the items it can address, ' +
      'and an item it cannot is left out of it. Give every item an `id`, and ' +
      'render them as direct children: items inside a Fragment, a ' +
      '`<Collection>` or a wrapper component are invisible here. Passing an ' +
      '`items` array instead works in every case.'
  );

  return keys;
};

export interface SelectAllHeaderProps {
  keys: Key[];
  selection: Selection;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
  labelledBy?: string;
  classNames?: { header?: string; count?: string };
}

export const SelectAllHeader = ({
  keys,
  selection,
  onChange,
  disabled,
  labelledBy,
  classNames,
}: SelectAllHeaderProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const countId = useId();

  const selectedCount =
    selection === 'all'
      ? keys.length
      : keys.filter(key => selection.has(key)).length;
  const checked = keys.length > 0 && selectedCount === keys.length;

  const [pressToken, setPressToken] = useState(0);
  const announcedTokenRef = useRef(0);
  useEffect(() => {
    if (pressToken === announcedTokenRef.current) {
      return;
    }
    announcedTokenRef.current = pressToken;

    announce(
      stringFormatter.format('selectAllCount', {
        count: selectedCount,
        total: keys.length,
      }),
      'polite'
    );
  }, [pressToken, selectedCount, keys.length, stringFormatter]);

  return (
    <div data-select-all="" className={classNames?.header}>
      <Checkbox
        checked={checked}
        indeterminate={selectedCount > 0 && !checked}
        disabled={disabled || keys.length === 0}
        onChange={selected => {
          setPressToken(token => token + 1);
          onChange(selected);
        }}
        label={stringFormatter.format('selectAll')}
        aria-describedby={[countId, labelledBy].filter(Boolean).join(' ')}
      />
      <span id={countId} className={classNames?.count}>
        {stringFormatter.format('selectAllCount', {
          count: selectedCount,
          total: keys.length,
        })}
      </span>
    </div>
  );
};
