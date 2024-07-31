import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { SelectList } from './SelectList';

const meta = {
  title: 'Components/SelectList',
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
      description: 'Set selection mode of the select list',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof SelectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <SelectList
      aria-labelledby="SelectList"
      defaultSelectedKeys={['one']}
      disabledKeys={['four']}
      {...args}
    >
      <SelectList.Item id="one">one</SelectList.Item>
      <SelectList.Item id="two">Two</SelectList.Item>
      <SelectList.Item id="three">Three</SelectList.Item>
      <SelectList.Item id="four">Four</SelectList.Item>
    </SelectList>
  ),
};

export const WithSingleSelection: Story = {
  render: args => (
    <SelectList aria-labelledby="SelectList" selectionMode="single" {...args}>
      <SelectList.Item id="one">one</SelectList.Item>
      <SelectList.Item id="two">Two</SelectList.Item>
      <SelectList.Item id="three">Three</SelectList.Item>
      <SelectList.Item id="four">Four</SelectList.Item>
    </SelectList>
  ),
};

export const WithMultiSelection: Story = {
  render: args => (
    <SelectList aria-labelledby="SelectList" selectionMode="multiple" {...args}>
      <SelectList.Item id="charizard">Charizard</SelectList.Item>
      <SelectList.Item id="blastoise">Blastoise</SelectList.Item>
      <SelectList.Item id="venusaur">Venusaur</SelectList.Item>
      <SelectList.Item id="pikachu">Pikachu</SelectList.Item>
    </SelectList>
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
    <SelectList
      aria-labelledby="SelectList"
      selectionMode="multiple"
      {...args}
      items={rows}
    >
      {(item: { id: number; name: string }) => (
        <SelectList.Item textValue={item.name}>
          {item.name}
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for ${item.name}...`)}
            className="ml-auto"
          >
            <svg width="30px" height="30px" viewBox="0 0 24 24">
              <path d="M12 2.85938C6.95437 2.85938 2.85938 6.95437 2.85938 12C2.85938 17.0456 6.95437 21.1406 12 21.1406C17.0456 21.1406 21.1406 17.0456 21.1406 12C21.1406 6.95437 17.0456 2.85938 12 2.85938ZM12.7875 15.9374H11.2125V11.2124H12.7875V15.9374ZM12.7875 9.6375H11.2125V8.0625H12.7875V9.6375Z"></path>
            </svg>
          </Button>
        </SelectList.Item>
      )}
    </SelectList>
  ),
};
