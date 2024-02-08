/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';
import { GridList } from './GridList';

const meta = {
  title: 'Components/GridList',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Set selection mode of the grid list',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <GridList
      aria-labelledby="GridList"
      defaultSelectedKeys={['one']}
      disabledKeys={['four']}
      {...args}
    >
      <GridList.Item id="one">one</GridList.Item>
      <GridList.Item id="two">Two</GridList.Item>
      <GridList.Item id="three">Three</GridList.Item>
      <GridList.Item id="four">Four</GridList.Item>
    </GridList>
  ),
};

let rows = [
  { id: 1, name: 'Games' },
  { id: 2, name: 'Program Files' },
  { id: 3, name: 'bootmgr' },
  { id: 4, name: 'log.txt' },
];
export const Action: Story = {
  render: args => (
    <GridList
      aria-labelledby="GridList"
      selectionMode="multiple"
      {...args}
      items={rows}
    >
      {(item: { id: number; name: string }) => (
        <GridList.Item textValue={item.name}>
          {item.name}
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for ${item.name}...`)}
          >
            ⓘ
          </Button>
        </GridList.Item>
      )}
    </GridList>
  ),
};
