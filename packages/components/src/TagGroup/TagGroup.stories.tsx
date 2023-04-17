import React from 'react';
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
  args: {
    label: 'Label',
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 1, name: 'News' },
  { id: 2, name: 'Travel' },
  { id: 3, name: 'Gaming' },
  { id: 4, name: 'Shopping' },
];

export const Base: Story = {
  render: args => (
    <TagGroup
      {...args}
      items={items}
      aria-label="Dynamic TagGroup items example"
    >
      {item => <Item>{item.name}</Item>}
    </TagGroup>
  ),
};

export const DefaultSelected: Story = {
  render: args => (
    <TagGroup {...args} label="Categories">
      <Item key="news">News</Item>
      <Item key="travel">Travel</Item>
      <Item key="gaming">Gaming</Item>
      <Item key="shopping">Shopping</Item>
    </TagGroup>
  ),
};

DefaultSelected.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
