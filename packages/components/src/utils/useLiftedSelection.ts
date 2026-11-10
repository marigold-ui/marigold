import { useMemo } from 'react';
import { useControlledState } from '@react-stately/utils';
import type { Key, Selection } from '@react-types/shared';

const toSelection = (
  value: Selection | Iterable<Key> | undefined
): Selection =>
  value === 'all' ? 'all' : value instanceof Set ? value : new Set(value ?? []);

export const useLiftedSelection = (
  selectedKeys: Selection | Iterable<Key> | undefined,
  defaultSelectedKeys: Selection | Iterable<Key> | undefined,
  onChange?: (selection: Selection) => void
) => {
  const controlled = useMemo(
    () => (selectedKeys !== undefined ? toSelection(selectedKeys) : undefined),
    [selectedKeys]
  );

  return useControlledState<Selection>(
    controlled,
    toSelection(defaultSelectedKeys),
    onChange
  );
};
