/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Key, useContext } from 'react';
import {
  Button,
  ListStateContext,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';

import { Multiselect as MS } from './Multiselect';

const Foo = () => {
  const state = useContext(ListStateContext);
  const selected = state.selectionManager.selectedKeys;

  let unselected = [] as Array<{ id: Key; children: any }>;
  for (const key of state.collection.getKeys()) {
    if (!selected.has(key)) {
      const item = state.collection.getItem(key);
      unselected.push({ id: `cb-${key}`, children: item?.rendered });
    }
  }
  console.log(state.collection.size, unselected);

  const addKey = (id: Key) => () => {
    state.selectionManager.toggleSelection(id);
    console.log(state.selectionManager.selectedKeys);
  };

  return (
    <div>
      {unselected.map(item => (
        <div key={'foo' + item.id} onClick={addKey(item.id)}>
          {item.children}
        </div>
      ))}
    </div>
  );
};

const MultiSelect = ({ children }: any) => {
  return (
    <TagGroup selectionMode="multiple">
      <TagList>{children}</TagList>
      <hr />
      <Foo />
    </TagGroup>
  );
};

const MultiSelectItem = ({ children, ...props }: any) => {
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <Tag
      textValue={textValue}
      className={({ isSelected }) => (isSelected ? '' : 'hidden')}
      {...props}
    >
      {children}
    </Tag>
  );
};

const meta = {
  title: 'Components/Multiselect',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof MultiSelect> = {
  render: () => {
    return (
      <>
        <MultiSelect label="Animals" disabledKeys={['snake']}>
          <MultiSelectItem id="red-panda">Red Panda</MultiSelectItem>
          <MultiSelectItem id="cat">Cat</MultiSelectItem>
          <MultiSelectItem id="dog">Dog</MultiSelectItem>
          <MultiSelectItem id="aardvark">Aardvark</MultiSelectItem>
          <MultiSelectItem id="kangaroo">Kangaroo</MultiSelectItem>
          <MultiSelectItem id="snake">Snake</MultiSelectItem>
          <MultiSelectItem id="vegan">Vegan</MultiSelectItem>
          <MultiSelectItem id="mar">Margrita</MultiSelectItem>
        </MultiSelect>
      </>
    );
  },
};

export const Multiselect: StoryObj<typeof MultiSelect> = {
  render: () => {
    return (
      <>
        <MS
          label="Animals"
          // disabledKeys={['snake']}
          defaultSelectedKeys={['cat', 'dog']}
        >
          <MultiSelectItem id="red-panda">Red Panda</MultiSelectItem>
          <MultiSelectItem id="cat">Cat</MultiSelectItem>
          <MultiSelectItem id="dog">Dog</MultiSelectItem>
          <MultiSelectItem id="aardvark">Aardvark</MultiSelectItem>
          <MultiSelectItem id="kangaroo">Kangaroo</MultiSelectItem>
          <MultiSelectItem id="snake">Snake</MultiSelectItem>
          <MultiSelectItem id="vegan">Vegan</MultiSelectItem>
          <MultiSelectItem id="margrita">Margrita</MultiSelectItem>
        </MS>
      </>
    );
  },
};
