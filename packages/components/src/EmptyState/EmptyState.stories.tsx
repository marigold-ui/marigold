import { screen } from '@testing-library/react';
import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Button } from '../Button/Button';
import { Inline } from '../Inline/Inline';
import { EmptyState } from './EmptyState';

const meta = preview.meta({
  title: 'Components/EmptyState',
  component: EmptyState,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description:
        'Title of the empty state. Use clear microcopy to explain why no information is shown.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description:
        'Description text that should explain concisely how this could be solved by the user, if possible.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    title: 'No items found',
    description: 'There are currently no items to display.',
  },
});

export const Basic = meta.story({
  render: args => <EmptyState {...args} />,
});

export const WithAction = meta.story({
  render: args => (
    <EmptyState
      description="Start adding items to your cart to see them here."
      action={
        <Inline space="2">
          <Button variant="primary" size="small">
            Browse Products
          </Button>
          <Button variant="secondary" size="small">
            View Wishlist
          </Button>
        </Inline>
      }
      {...args}
    />
  ),
});

export const WithAutocompleteAndData = meta.story({
  tags: ['component-test'],
  render: args => {
    const [inputValue, setInputValue] = useState('');

    const items = [
      { id: '1', name: 'Luke Skywalker' },
      { id: '2', name: 'Leia Organa' },
      { id: '3', name: 'Han Solo' },
    ];

    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <Autocomplete
        label="Search Characters"
        items={filteredItems}
        value={inputValue}
        onChange={setInputValue}
        allowsEmptyCollection
        emptyState={
          <EmptyState description="Try adjusting your search terms" {...args} />
        }
      >
        {(item: any) => (
          <Autocomplete.Option id={item.id}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
    );
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'darth vader');

    const emptyStateTitle = await screen.findByText('No results found');
    const emptyStateDescription = screen.getByText(
      'Try adjusting your search terms'
    );

    await expect(emptyStateTitle).toBeVisible();
    await expect(emptyStateDescription).toBeVisible();
  },
});
