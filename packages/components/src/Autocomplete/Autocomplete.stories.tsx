import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { screen } from '@testing-library/react';
import React, { useState } from 'react';
import { Text } from 'react-aria-components';
import { useAsyncList } from '@react-stately/data';
import { Center } from '../Center';
import { Stack } from '../Stack';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input disabled?',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input required?',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Select Favorite:',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    placeholder: 'Movie',
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  render: args => (
    <Autocomplete {...args}>
      <Autocomplete.Option id="Harry Potter" textValue="Harry Potter">
        <Text slot="label">Harry Potter</Text>
        <Text slot="description">best series ever</Text>
      </Autocomplete.Option>
      <Autocomplete.Option id="Lord of the Rings">
        Lord of the Rings
      </Autocomplete.Option>
      <Autocomplete.Option id="Star Wars">Star Wars</Autocomplete.Option>
      <Autocomplete.Option id="Star Trek">Star Trek</Autocomplete.Option>
      <Autocomplete.Option id="Firefly">Firefly</Autocomplete.Option>
    </Autocomplete>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    const description = canvas.getAllByText(
      'This is a help text description'
    )[0];
    const clearButton = screen.getByLabelText('Clear search');

    await userEvent.click(input);
    await userEvent.type(input, 'sp');
    await userEvent.click(clearButton);

    await expect(input).toHaveFocus();
    await expect(input).toBeVisible();
    await expect(description).toBeInTheDocument();
    await expect(clearButton).toBeInTheDocument();
    await expect(input).toHaveValue('');
  },
};

export const WithSections: Story = {
  tags: ['component-test'],
  render: args => (
    <Autocomplete {...args} placeholder="Pick a food">
      <Autocomplete.Section header="Veggies">
        <Autocomplete.Option id="lettuce">Lettuce</Autocomplete.Option>
        <Autocomplete.Option id="tomato">Tomato</Autocomplete.Option>
        <Autocomplete.Option id="onion">Onion</Autocomplete.Option>
      </Autocomplete.Section>
      <Autocomplete.Section header="Protein">
        <Autocomplete.Option id="ham">Ham</Autocomplete.Option>
        <Autocomplete.Option id="tuna">Tuna</Autocomplete.Option>
        <Autocomplete.Option id="tofu">Tofu</Autocomplete.Option>
      </Autocomplete.Section>
      <Autocomplete.Section header="Condiments">
        <Autocomplete.Option id="mayo">Mayonaise</Autocomplete.Option>
        <Autocomplete.Option id="mustard">Mustard</Autocomplete.Option>
        <Autocomplete.Option id="ranch">Ranch</Autocomplete.Option>
      </Autocomplete.Section>
    </Autocomplete>
  ),
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getAllByLabelText('Select Favorite:')[0];

    await userEvent.type(input, 'o');
    const sectionOne = await screen.findByText('Veggies');
    const sectionTwo = await screen.findByText('Protein');

    expect(sectionOne).toBeVisible();
    expect(sectionTwo).toBeVisible();
  },
};

export const Controlled: Story = {
  tags: ['component-test'],
  render: args => {
    const [submitted, setSubmitted] = useState<string | number | null>('');
    const [current, setCurrent] = useState<string>('');

    return (
      <Stack space={4}>
        <Autocomplete
          {...args}
          value={current}
          onChange={setCurrent}
          onSubmit={val => setSubmitted(val)}
          disabledKeys={['star-trek']}
        >
          <Autocomplete.Option id="harry-potter" textValue="Harry Potter">
            Harry Potter
          </Autocomplete.Option>
          <Autocomplete.Option
            id="lord-of-the-rings"
            textValue="Lord of the Rings"
          >
            Lord of the Rings
          </Autocomplete.Option>
          <Autocomplete.Option id="star-wars" textValue="Star Wars">
            Star Wars
          </Autocomplete.Option>
          <Autocomplete.Option id="star-trek" textValue="Star Trek">
            Star Trek
          </Autocomplete.Option>
          <Autocomplete.Option id="firefly">Firefly</Autocomplete.Option>
        </Autocomplete>
        <pre data-testid="currentValue">current: {current}</pre>
        <pre data-testid="submittedValue">submitted value: {submitted}</pre>
      </Stack>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'h');
    await userEvent.type(input, 'a');
    await userEvent.type(input, 'r');
    await userEvent.type(input, '{arrowdown}{enter}{escape}');

    await expect(canvas.getByTestId('currentValue')).toHaveTextContent(
      'Harry Potter'
    );
    await expect(canvas.getByTestId('submittedValue')).toHaveTextContent(
      'harry-potter'
    );
  },
};

export const Async: Story = {
  render: args => {
    const { items, filterText, setFilterText } = useAsyncList<{ name: string }>(
      {
        async load({ signal, filterText }) {
          const res = await fetch(
            `https://swapi.py4e.com/api/people/?search=${filterText}`,
            { signal }
          );
          const json = await res.json();

          return {
            items: json.results,
          };
        },
      }
    );

    return (
      <Autocomplete
        {...args}
        label="Search Star Wars Characters"
        items={items}
        value={filterText}
        onChange={setFilterText}
        allowsEmptyCollection
        emptyState={
          <Center data-testid="empty-state">no character found</Center>
        }
      >
        {(item: any) => (
          <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
    );
  },
  play: async ({ userEvent }) => {
    const canvas = within(document.body);

    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'xyz');

    await userEvent.type(input, '{arrowdown}');

    const result = await canvas.getByTestId('empty-state');
    await expect(result).toBeVisible();
  },
};

export const DefaultEmptyState: Story = {
  tags: ['component-test'],
  args: {
    allowsEmptyCollection: true,
  },
  ...Basic,
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'xyz');
    const result = canvas.getByText('no result found');
    await expect(result).toBeVisible();
  },
};

export const EmptyState: Story = {
  tags: ['component-test'],
  args: {
    allowsEmptyCollection: true,
    emptyState: <Center>can't find value</Center>,
  },
  ...Basic,
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'xyz');
    const result = canvas.getByText("can't find value");
    await expect(result).toBeVisible();
  },
};

export const InputMenuTrigger: Story = {
  tags: ['component-test'],
  ...Basic,
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'ha');
    const result = canvas.getAllByText('Harry Potter')[0];

    await expect(result).toBeVisible();
  },
};

export const FocusMenuTrigger: Story = {
  tags: ['component-test'],
  ...Basic,
  args: {
    menuTrigger: 'focus',
  },
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    const result = await canvas.findByText('Star Wars');

    await expect(result).toBeVisible();
  },
};

export const ManualMenuTrigger: Story = {
  tags: ['component-test'],
  ...Basic,
  args: {
    menuTrigger: 'input',
  },
  play: async ({ userEvent }) => {
    const canvas = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, '{arrowdown}');
    const result = await canvas.findByText('Lord of the Rings');

    await expect(result).toBeVisible();
  },
};

export const DisabledSuggestions: Story = {
  render: () => (
    <Autocomplete label="Label" disabledKeys={['spinach']}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  ),
};
