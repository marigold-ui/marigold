/**
 * - list of removable tags
 * - combobox to search for an item
 *
 * - selecting an item from the combobox -> adds it to the tags, clears combobox input
 * - combobox only shows unselected items
 */
import { Children, ReactNode, useState } from 'react';
import { Key } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListData } from '@react-stately/data';

import { ComboBox } from '../ComboBox';
import { Tag } from '../TagGroup';

// Item
// ---------------
export interface MultiSelectItemProps {
  id: Key;
  children: ReactNode;
}

const Item = (_: MultiSelectItemProps) => null;

// Props
// ---------------
export interface MultiSelectProps extends RAC.ComboBoxProps<object> {
  label?: string;
  children?: ReactNode;
  defaultSelectedKeys?: 'all' | Iterable<Key>;
}

// Component
// ---------------
export const Multiselect = ({
  label,
  children,
  ...props
}: MultiSelectProps) => {
  // Fake react-aria collection items
  const items = Children.map(children, ({ props }: any) => props);

  const list = useListData<MultiSelectItemProps>({
    initialItems: items,
    initialSelectedKeys: props.defaultSelectedKeys,
    getKey: item => item.id,
  });

  const selected = list.items.filter(item =>
    list.selectedKeys === 'all' ? true : list.selectedKeys.has(item.id)
  );
  const unselected = list.items.filter(item => !selected.includes(item));

  // Remove tag
  const setUnselected = (keys: Set<Key>) => {
    const next: Set<Key> =
      list.selectedKeys === 'all' ? new Set(items) : new Set(list.selectedKeys);

    if (list.selectedKeys !== 'all') {
      keys.forEach(key => {
        next.delete(key);
      });
    }

    list.setSelectedKeys(next);
  };

  // Combobox Stuff
  const [value, setValue] = useState('');
  const selectItem = (key: Key) => {
    // add to selected items
    if (list.selectedKeys !== 'all') {
      const next = list.selectedKeys.add(key);
      list.setSelectedKeys(next);
    }

    // Clear combobox
    const input = document.activeElement as HTMLInputElement;
    setTimeout(() => {
      setValue('');
    }, 0);
    input.focus();
  };

  return (
    <div>
      <Tag.Group
        items={selected}
        allowsRemoving
        onRemove={setUnselected}
        renderEmptyState={() => null}
      >
        {(item: MultiSelectItemProps) => (
          <Tag key={item.id} id={item.id}>
            {item.children}
          </Tag>
        )}
      </Tag.Group>
      <ComboBox
        value={value}
        onChange={setValue}
        onSelectionChange={selectItem}
        menuTrigger="focus"
        disabled={unselected.length === 0}
        placeholder={unselected.length === 0 ? 'All items selected' : ''}
        {...props}
      >
        {unselected.map((item: MultiSelectItemProps) => (
          <ComboBox.Item key={item.id} id={item.id}>
            {item.children}
          </ComboBox.Item>
        ))}
      </ComboBox>
    </div>
  );
};

Multiselect.Item = Item;
