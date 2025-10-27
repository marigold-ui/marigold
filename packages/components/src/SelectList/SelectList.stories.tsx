import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Info } from '../icons/Info';
import { SelectList } from './SelectList';

const meta = {
  title: 'Components/SelectList',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Set selection mode of the select list',
      defaultValue: false,
    },
  },
  args: {
    selectionMode: 'single',
  },
} satisfies Meta<typeof SelectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <SelectList
      {...args}
      aria-labelledby="SelectList"
      defaultSelectedKeys={['one']}
      disabledKeys={['four']}
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
          <SelectList.Action>
            <Button
              aria-label="Info"
              onPress={() => alert(`Info for ${item.name}...`)}
            >
              <Info size={30} />
            </Button>
          </SelectList.Action>
          {item.name}
        </SelectList.Item>
      )}
    </SelectList>
  ),
};
