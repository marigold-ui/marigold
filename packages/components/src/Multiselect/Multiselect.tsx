/**
 * - list of removable tags
 * - combobox to search for an item
 *
 * - selecting an item from the combobox -> adds it to the tags, clears combobox input
 * - combobox only shows unselected items
 */
import { Children, ReactNode, useState } from 'react';
import { Key } from 'react-aria-components';

import { useListData } from '@react-stately/data';

import { ComboBox } from '../ComboBox';
import { Tag } from '../TagGroup';

export interface MultiSelectItem {
  id: Key;
  children: ReactNode;
}

export const Multiselect = ({ label, children }: any) => {
  // does this work? If I wrote it like this the items will open.....
  const items = Children.map(children, child => child);

  const list = useListData<MultiSelectItem>({
    initialItems: [], // Can we use `children` here? If not just make an API that doesn't use children e.g. <Multiselect options={...} />
    initialSelectedKeys: [], // add API defaultSelected or something?
    getKey: item => item.id,
  });

  const selected = list.items.filter(item =>
    list.selectedKeys === 'all' ? true : list.selectedKeys.has(item.id)
  );
  const unselected = list.items; // basically selected but the other way araound

  // Combobox Stuff
  const [value, setValue] = useState('');
  const selectItem = (key: Key) => {
    // add to selected items
    list.setSelectedKeys('???');
    // Clear combobox
    setValue('');
  };

  console.log(items);

  return (
    <div className="style me!">
      <Tag.Group label={label} items={selected}>
        {(item: MultiSelectItem) => (
          <Tag key={item.id} id={item.id}>
            {item.children}
          </Tag>
        )}
      </Tag.Group>
      <ComboBox
        items={unselected}
        onSelectionChange={selectItem}
        value={value}
        onChange={setValue}
      >
        {items.map((item: any) => (
          <ComboBox.Item key={item.id} id={item.id}>
            {item.props.children}
          </ComboBox.Item>
        ))}
      </ComboBox>
    </div>
  );
};
