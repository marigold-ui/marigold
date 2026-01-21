import { useState } from 'react';
import { I18nProvider } from 'react-aria-components';
import { expect, fn, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Key } from '@react-types/shared';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Tag } from './Tag';

const meta = preview.meta({
  title: 'Components/Tag',
  component: Tag.Group,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Categories',
  },
});

export const Basic = meta.story({
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
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('News'));
    await userEvent.click(canvas.getByText('Gaming'));

    expect(args.onSelectionChange).toHaveBeenCalledWith(
      expect.objectContaining(new Set(['news', 'gaming']))
    );
  },
});

export const RemovableTags = meta.story({
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
  play: async ({ canvas, userEvent }) => {
    const news = canvas.getByText('News');
    const shopping = canvas.getByText('Shopping');

    await userEvent.click(within(news).getByRole('button'));
    await userEvent.click(within(shopping).getByRole('button'));

    await waitFor(() => expect(news).not.toBeInTheDocument());
    await waitFor(() => expect(shopping).not.toBeInTheDocument());

    await userEvent.click(canvas.getByText('Reset'));
  },
});

export const RemovableAllTags = meta.story({
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
      <I18nProvider locale="en-US">
        <Stack space={6} alignX="left">
          <Tag.Group
            {...args}
            items={items}
            onRemove={onRemove}
            removeAll
            emptyState={() => (
              <Text variant="muted" fontSize="sm" fontStyle="italic">
                No tags.
              </Text>
            )}
          >
            {(item: { id: number; name: string }) => <Tag>{item.name}</Tag>}
          </Tag.Group>
          <Button onPress={() => setItems(defaultItems)}>Reset</Button>
        </Stack>
      </I18nProvider>
    );
  },
});

RemovableAllTags.test('Remove all tags test', async ({ canvas, userEvent }) => {
  const removeAll = canvas.getByText('Remove all');
  await userEvent.click(removeAll);

  await waitFor(() =>
    expect(canvas.queryByText('News')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Travel')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Gaming')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Shopping')).not.toBeInTheDocument()
  );
});
