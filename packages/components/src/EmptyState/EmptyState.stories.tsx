import { useState } from 'storybook/preview-api';
import preview from '../../../../config/storybook/.storybook/preview';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { EmptyState } from './EmptyState';

const meta = preview.meta({
  title: 'Components/EmptyState',
  component: EmptyState,
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
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the empty state',
    },
    size: {
      table: {
        disable: true,
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

export const WithAutocompleteAndData = meta.story({
  render: () => {
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
          <EmptyState
            title="No results found"
            description="Try adjusting your search terms"
          />
        }
      >
        {(item: any) => (
          <Autocomplete.Option id={item.id}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
    );
  },
});
