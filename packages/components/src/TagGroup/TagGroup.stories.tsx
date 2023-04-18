import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TagGroup } from './TagGroup';
import { Item } from '@react-stately/collections';
import isChromatic from 'chromatic';

const meta = {
  title: 'Components/TagGroup',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <TagGroup {...args} aria-label="Static TagGroup items example">
      <Item key="news">News</Item>
      <Item key="travel">Travel</Item>
      <Item key="gaming">Gaming</Item>
      <Item key="shopping">Shopping</Item>
    </TagGroup>
  ),
};

export const Error: Story = {
  render: args => (
    <TagGroup errorMessage="Das ist ein Error" error {...args}>
      <TagGroup.Tag key="news">News</TagGroup.Tag>
      <TagGroup.Tag key="travel">Travel</TagGroup.Tag>
      <TagGroup.Tag key="gaming">Gaming</TagGroup.Tag>
      <TagGroup.Tag key="shopping">Shopping</TagGroup.Tag>
    </TagGroup>
  ),
};

export const WithLabel: Story = {
  render: args => (
    <TagGroup {...args} label="Categories">
      <TagGroup.Tag key="news">News</TagGroup.Tag>
      <TagGroup.Tag key="travel">Travel</TagGroup.Tag>
      <TagGroup.Tag key="gaming">Gaming</TagGroup.Tag>
      <TagGroup.Tag key="shopping">Shopping</TagGroup.Tag>
    </TagGroup>
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

    let removeItem = (key: number) => {
      setItems(prevItems => prevItems.filter(item => key !== item.id));
    };

    return (
      <TagGroup
        {...args}
        items={items}
        aria-label="TagGrooup removing example"
        allowsRemoving
        onRemove={removeItem}
      >
        {item => <Item>{item.name}</Item>}
      </TagGroup>
    );
  },
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
