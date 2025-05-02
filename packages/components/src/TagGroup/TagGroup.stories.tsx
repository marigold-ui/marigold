/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { FormEvent, Key } from 'react';
import { Tag } from '.';
import { Button } from '../Button';
import { Form } from '../Form';
import { Stack } from '../Stack';

const meta = {
  title: 'Components/Tag',
  component: Tag.Group,
} satisfies Meta<typeof Tag.Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Tag.Group {...args} aria-label="Static TagGroup items example">
      <Tag key="news">News</Tag>
      <Tag key="travel">Travel</Tag>
      <Tag key="gaming">Gaming</Tag>
      <Tag key="shopping">Shopping</Tag>
    </Tag.Group>
  ),
};

export const WithLabel: Story = {
  render: args => (
    <Tag.Group {...args} label="Categories">
      <Tag key="news">News</Tag>
      <Tag key="travel">Travel</Tag>
      <Tag key="gaming">Gaming</Tag>
      <Tag key="shopping">Shopping</Tag>
    </Tag.Group>
  ),
};

export const RemovableTags: Story = {
  render: args => {
    let defaultItems = [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ];

    let [items, setItems] =
      useState<{ id: number; name: string }[]>(defaultItems);

    let onRemove = (keys: Set<Key>) => {
      setItems(prevItems => prevItems.filter(item => !keys.has(item.id)));
    };

    return (
      <Tag.Group
        {...args}
        items={items}
        aria-label="TagGroup removing example"
        allowsRemoving
        onRemove={onRemove}
      >
        {(item: { id: number; name: string }) => <Tag>{item.name}</Tag>}
      </Tag.Group>
    );
  },
};

export const MultiSelectTags: Story = {
  render: args => {
    const [selected, setSelected] = useState(new Set(['parking']));
    return (
      <>
        <Tag.Group
          {...args}
          label="Amenities"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected as any}
        >
          <Tag id="laundry">Laundry</Tag>
          <Tag id="fitness">Fitness center</Tag>
          <Tag id="parking">Parking</Tag>
          <Tag id="pool" disabled>
            Swimming pool
          </Tag>
          <Tag id="breakfast">Breakfast</Tag>
        </Tag.Group>
        <p>Current selection (controlled): {[...selected].join(', ')}</p>
      </>
    );
  },
};

export const UsageInForm: Story = {
  render: args => {
    const [state, setState] = useState('');

    const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const entries = Array.from(formData.entries());
      setState(JSON.stringify(entries));
    };

    return (
      <Form onSubmit={submit}>
        <Stack space={8}>
          <Stack space={2} alignX="left">
            <Tag.Group
              label="Amenities"
              name="amenities"
              selectionMode="multiple"
              {...args}
            >
              <Tag id="laundry">Laundry</Tag>
              <Tag id="fitness">Fitness center</Tag>
              <Tag id="parking">Parking</Tag>
              <Tag id="pool" disabled>
                Swimming pool
              </Tag>
              <Tag id="breakfast">Breakfast</Tag>
            </Tag.Group>
            <Button type="submit">Submit</Button>
          </Stack>

          <pre>
            <code>Submitted: {state}</code>
          </pre>
        </Stack>
      </Form>
    );
  },
};
