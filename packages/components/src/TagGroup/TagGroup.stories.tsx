/* eslint-disable react-hooks/rules-of-hooks */
import React, { Key, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from '.';

const meta = {
  title: 'Components/Tag',
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

export const Error: Story = {
  render: args => (
    <Tag.Group
      errorMessage="Das ist ein Error"
      error
      {...args}
      aria-label="Error message example"
    >
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
