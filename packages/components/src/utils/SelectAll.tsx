import type { ReactNode } from 'react';
import { Children, isValidElement, useEffect, useMemo } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { Key, Selection } from '@react-types/shared';
import { Checkbox } from '../Checkbox/Checkbox';
import { intlMessages } from '../intl/messages';

let hasWarnedMissingIds = false;

export const __resetMissingIdsWarning = () => {
  hasWarnedMissingIds = false;
};

interface SelectableKeysOptions<T> {
  children: ReactNode | ((item: T) => ReactNode);
  items?: Iterable<T>;
  disabledKeys?: Iterable<Key>;
  warn?: boolean;
}

const idOf = (item: unknown) => {
  const candidate = item as { id?: Key; key?: Key } | null;
  return candidate?.id ?? candidate?.key;
};

export const useSelectableKeys = <T,>({
  children,
  items,
  disabledKeys,
  warn,
}: SelectableKeysOptions<T>): Key[] => {
  const { keys, hasMissingIds } = useMemo(() => {
    const disabled = new Set<Key>(disabledKeys ?? []);
    const candidates: (Key | undefined)[] = items
      ? Array.from(items, idOf)
      : Children.toArray(children as ReactNode).flatMap(child => {
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
  }, [children, items, disabledKeys]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' ||
      !warn ||
      !hasMissingIds ||
      hasWarnedMissingIds
    ) {
      return;
    }

    hasWarnedMissingIds = true;
    console.warn(
      'Marigold: a select-all needs an `id` on every item to know what it ' +
        'covers, and an item without one is left out of it.'
    );
  }, [warn, hasMissingIds]);

  return keys;
};

export interface SelectAllHeaderProps {
  keys: Key[];
  selection: Selection;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
  classNames?: { header?: string; count?: string };
}

export const SelectAllHeader = ({
  keys,
  selection,
  onChange,
  disabled,
  classNames,
}: SelectAllHeaderProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  const selectedCount =
    selection === 'all'
      ? keys.length
      : keys.filter(key => selection.has(key)).length;
  const checked = keys.length > 0 && selectedCount === keys.length;

  return (
    <div className={classNames?.header}>
      <Checkbox
        checked={checked}
        indeterminate={selectedCount > 0 && !checked}
        disabled={disabled}
        onChange={onChange}
        label={stringFormatter.format('selectAll')}
      />
      <span className={classNames?.count}>
        {stringFormatter.format('selectAllCount', {
          count: selectedCount,
          total: keys.length,
        })}
      </span>
    </div>
  );
};
