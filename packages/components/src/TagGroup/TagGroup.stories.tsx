import type { Meta, StoryObj } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'storybook/preview-api';
import { expect, fn, within } from 'storybook/test';
import { Key } from '@react-types/shared';
import { Tag } from '.';
import { Button } from '../Button';
import { Stack } from '../Stack';

const meta = {
  title: 'Components/Tag',
  component: Tag.Group,
  args: {
    label: 'Categories',
  },
} satisfies Meta<typeof Tag.Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  args: {
    onSelectionChange: fn(),
  },
  render: args => (
    <Tag.Group {...args} selectionMode="multiple" label="Categories">
      <Tag id="news">News</Tag>
      <Tag id="travel">Travel</Tag>
      <Tag id="gaming">Gaming</Tag>
      <Tag id="shopping">Shopping</Tag>
    </Tag.Group>
  ),
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText('News'));
    await userEvent.click(canvas.getByText('Gaming'));

    expect(args.onSelectionChange).toHaveBeenCalledWith(
      expect.objectContaining(new Set(['news', 'gaming']))
    );
  },
};

export const RemovableTags: Story = {
  tags: ['component-test'],
  render: args => {
    const defaultItems = [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ];

    const [items, setItems] =
      useState<{ id: number; name: string }[]>(defaultItems);

    const onRemove = (keys: Set<Key>) => {
      setItems(prevItems => prevItems.filter(item => !keys.has(item.id)));
    };

    return (
      <Stack space={6} alignX="left">
        <Tag.Group {...args} items={items} onRemove={onRemove}>
          {(item: { id: number; name: string }) => <Tag>{item.name}</Tag>}
        </Tag.Group>
        <Button onPress={() => setItems(defaultItems)}>Reset</Button>
      </Stack>
    );
  },
  play: async ({ canvas }) => {
    const news = canvas.getByText('News');
    const shopping = canvas.getByText('Shopping');

    await userEvent.click(within(news).getByRole('button'));
    await userEvent.click(within(shopping).getByRole('button'));

    // Sleep for flaky test
    await new Promise(resolve => setTimeout(resolve, 500));

    await expect(news).not.toBeInTheDocument();
    await expect(shopping).not.toBeInTheDocument();

    await userEvent.click(canvas.getByText('Reset'));
  },
};
