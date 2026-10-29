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
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
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
  /** The current selection, which decides which of its keys are locked. */
  selection: Selection;
  enabled?: boolean;
  /**
   * Gates the missing-`id` warning. The keys are also derived for
   * <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> on a list that has no
   * select-all, and such a list has nothing to warn about. Defaults to
   * `enabled`.
   */
  warn?: boolean;
}

export interface SelectableKeys {
  /** The keys a select-all may tick. */
  keys: Key[];
  /**
   * The selected keys whose row the user cannot toggle by hand, so a select-all
   * has to leave them as they are in either direction.
   */
  lockedKeys: Key[];
}

/** What the derivation needs off a row, however that row was written. */
interface RowProps {
  id?: Key;
  disabled?: boolean;
}

const EMPTY_ROWS: RowProps[] = [];
const EMPTY_KEYS: Key[] = [];

export const useSelectableKeys = <T,>({
  children,
  items,
  disabledKeys,
  selection,
  enabled,
  warn,
}: SelectableKeysOptions<T>): SelectableKeys => {
  const fromItems = items !== undefined;
  const source = items ?? children;

  const rows = useMemo<RowProps[]>(() => {
    if (enabled === false) {
      return EMPTY_ROWS;
    }

    if (fromItems) {
      const render =
        typeof children === 'function'
          ? (children as (item: T) => ReactNode)
          : undefined;
      return Array.from(source as Iterable<T>, item => {
        const rendered = render?.(item);
        const props = isValidElement<RowProps>(rendered)
          ? rendered.props
          : undefined;
        const fallback = item as (RowProps & { key?: Key }) | null;
        return {
          id: props?.id ?? fallback?.key ?? fallback?.id,
          disabled: props?.disabled,
        };
      });
    }

    return Children.toArray(source as ReactNode).flatMap(child =>
      isValidElement<RowProps>(child) ? [child.props] : []
    );
  }, [enabled, fromItems, source, children]);

  const { keys, incomplete, disabledRowKeys } = useMemo(() => {
    const disabled = new Set<Key>(disabledKeys ?? []);
    const selectable = rows.filter(row => row.disabled !== true);

    return {
      keys: selectable
        .map(row => row.id)
        .filter((key): key is Key => key != null && !disabled.has(key)),
      incomplete: selectable.some(row => row.id == null),
      disabledRowKeys: new Set(
        rows
          .filter(
            row =>
              row.id != null && (row.disabled === true || disabled.has(row.id))
          )
          .map(row => row.id as Key)
      ),
    };
  }, [rows, disabledKeys]);

  const lockedKeys = useMemo(() => {
    // Under `'all'`, `SelectionManager.isSelected` answers with
    // `canSelectItem`, which is `false` for a disabled row: nothing disabled is
    // selected, so nothing is locked. `ListView` keeps the sentinel in state,
    // so this is the state a clear from its header starts from, and returning
    // the disabled rows here would select rows the user cannot select.
    if (selection === 'all' || selection.size === 0) {
      return EMPTY_KEYS;
    }
    return Array.from(selection).filter(key => disabledRowKeys.has(key));
  }, [selection, disabledRowKeys]);

  useDevWarning(
    (warn ?? enabled) === true && incomplete,
    '[ListView/SelectList] A select-all only covers the items it can address, ' +
      'and an item it cannot is left out of it. Give every item an `id`, and ' +
      'render them as direct children: items inside a Fragment, a ' +
      '`<Collection>` or a wrapper component are invisible here. Passing an ' +
      '`items` array instead works in every case.'
  );

  return { keys, lockedKeys };
};

export interface SelectAllHeaderProps {
  keys: Key[];
  selection: Selection;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
  /** Id of the element naming the list, appended to the checkbox's description. */
  labelledBy?: string;
  /**
   * The list's own `aria-label`, used in place of `labelledBy` when the list has
   * no labelling element to point at. Without it two lists on a page both get a
   * checkbox that reads as nothing but "Select all".
   */
  label?: string;
  classNames?: { header?: string; count?: string };
}

export const SelectAllHeader = ({
  keys,
  selection,
  onChange,
  disabled,
  labelledBy,
  label,
  classNames,
}: SelectAllHeaderProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const countId = useId();
  const labelId = useId();
  const hasOwnLabel = labelledBy === undefined && label !== undefined;

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
        aria-describedby={[
          countId,
          labelledBy,
          hasOwnLabel ? labelId : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <span id={countId} className={classNames?.count}>
        {stringFormatter.format('selectAllCount', {
          count: selectedCount,
          total: keys.length,
        })}
      </span>
      {hasOwnLabel && (
        <VisuallyHidden elementType="span" id={labelId}>
          {label}
        </VisuallyHidden>
      )}
    </div>
  );
};
