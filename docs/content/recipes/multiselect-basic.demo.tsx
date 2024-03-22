import { Children, ReactNode, useState } from 'react';

import {
  ComboBox,
  ComboBoxProps,
  Tag,
  useListData,
} from '@marigold/components';

type Key = string | number;
export interface MultiSelectItemProps {
  id: Key;
  children: ReactNode;
}

const Item = (_: MultiSelectItemProps) => null;

export interface MultiSelectProps extends ComboBoxProps {
  label?: string;
  children?: ReactNode;
  defaultSelectedKeys?: 'all' | Iterable<Key>;
}

const Multiselect = ({ label, children, ...props }: MultiSelectProps) => {
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

  const [value, setValue] = useState('');
  const selectItem = (key: Key) => {
    if (list.selectedKeys !== 'all') {
      const next = list.selectedKeys.add(key);
      list.setSelectedKeys(next);
    }

    const input = document.activeElement as HTMLInputElement;
    setTimeout(() => {
      setValue('');
    }, 0);
    input.focus();
  };

  return (
    <div className="flex flex-wrap gap-1">
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

export default () => {
  return (
    <Multiselect label="Select a country">
      <Multiselect.Item id="Germany">🇩🇪 Germany</Multiselect.Item>
      <Multiselect.Item id="France">🇫🇷 France</Multiselect.Item>
      <Multiselect.Item id="India">🇮🇳 India</Multiselect.Item>
      <Multiselect.Item id="Brazil">🇧🇷 Brazil</Multiselect.Item>
      <Multiselect.Item id="Canada">🇨🇦 Canada</Multiselect.Item>
      <Multiselect.Item id="Australia">🇦🇺 Australia</Multiselect.Item>
    </Multiselect>
  );
};
