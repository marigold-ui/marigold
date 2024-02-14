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

export interface MultiSelectItem {
  id: Key;
  children: ReactNode;
}

export interface MultiSelectProps extends RAC.ComboBoxProps<object> {
  label?: string;
  children?: ReactNode;
  defaultSelectedKeys?: 'all' | Iterable<Key>;
}

export const Multiselect = ({
  label,
  children,
  ...props
}: MultiSelectProps) => {
  // don't know what to write instead of any
  const items = Children.map(children, ({ props }: any) => props);

  const list = useListData<MultiSelectItem>({
    initialItems: items, // Can we use `children` here? If not just make an API that doesn't use children e.g. <Multiselect options={...} />
    initialSelectedKeys: props.defaultSelectedKeys,
    getKey: item => item.id,
  });

  let selected = list.items.filter(item =>
    list.selectedKeys === 'all' ? true : list.selectedKeys.has(item.id)
  );

  // trying to remove tag
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

  const unselected = list.items.filter(item => !selected.includes(item));

  // Combobox Stuff
  const [value, setValue] = useState('');
  const selectItem = (key: Key) => {
    // add to selected items
    if (list.selectedKeys !== 'all') {
      const next = list.selectedKeys.add(key);
      // console.log(next);
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
        {(item: MultiSelectItem) => (
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
        {...props}
      >
        {unselected.map((item: MultiSelectItem) => (
          <ComboBox.Item key={item.id} id={item.id}>
            {item.children}
          </ComboBox.Item>
        ))}
      </ComboBox>
    </div>
  );
};
