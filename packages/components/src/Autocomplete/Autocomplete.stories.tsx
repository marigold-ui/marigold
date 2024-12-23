/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Key, useState } from 'react';
import { Text } from 'react-aria-components';
import { useAsyncList } from '@react-stately/data';
import { Stack } from '../Stack';
import { Autocomplete } from './Autocomplete';

const meta = {
  title: 'Components/Autocomplete',
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
      defaultValue: 'This is a help text description',
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
      defaultValue: 'Something went wrong',
    },
    menuTrigger: {
      control: {
        type: 'select',
      },
      options: ['focus', 'input', 'manual'],
      description: 'Set which interaction shows the menu',
    },
    width: {
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
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Autocomplete placeholder="Movie" {...args}>
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
};

export const WithSections: Story = {
  render: args => (
    <Autocomplete placeholder="Pick a food" {...args}>
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
};

export const Controlled: Story = {
  render: args => {
    const [submitted, setSubmitted] = useState<
      [Key | null, string | number | null]
    >(['', '']);
    const [current, setCurrent] = useState<string>('');
    const keyToRender = submitted[0] !== null ? submitted[0].toString() : null;

    return (
      <Stack space={4}>
        <Autocomplete
          {...args}
          value={current}
          onChange={setCurrent}
          onSubmit={(key, val) => setSubmitted([key, val])}
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
        <pre>current: {current}</pre>
        <pre>
          submitted: (key: {keyToRender}, value: {submitted[1]})
        </pre>
      </Stack>
    );
  },
};

export const Async: Story = {
  render: args => {
    const list = useAsyncList<{ name: string }>({
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
    });

    return (
      <Autocomplete
        label="Search Star Wars Characters"
        items={list.items}
        value={list.filterText}
        onChange={list.setFilterText}
        {...args}
      >
        {(item: any) => (
          <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
    );
  },
};
