/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import React, { Key, useState } from 'react';

import { useAsyncList } from '@react-stately/data';

import { Container } from '../Container';
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
    <Autocomplete {...args}>
      <Autocomplete.Item key="Harry Potter">Harry Potter</Autocomplete.Item>
      <Autocomplete.Item key="Lord of the Rings">
        Lord of the Rings
      </Autocomplete.Item>
      <Autocomplete.Item key="Star Wars">Star Wars</Autocomplete.Item>
      <Autocomplete.Item key="Star Trek">Star Trek</Autocomplete.Item>
      <Autocomplete.Item key="Firefly">Firefly</Autocomplete.Item>
    </Autocomplete>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [submitted, setSubmitted] = useState<[Key | null, string | null]>([
      '',
      '',
    ]);
    const [current, setCurrent] = useState<string>('');
    return (
      <Container size="large">
        <Stack space={4}>
          <Autocomplete
            {...args}
            value={current}
            onChange={setCurrent}
            onSubmit={(key, val) => setSubmitted([key, val])}
            disabledKeys={['star-trek']}
          >
            <Autocomplete.Item key="harry-potter">
              Harry Potter
            </Autocomplete.Item>
            <Autocomplete.Item key="lord-of-the-rings">
              Lord of the Rings
            </Autocomplete.Item>
            <Autocomplete.Item key="star-wars">Star Wars</Autocomplete.Item>
            <Autocomplete.Item key="star-trek">Star Trek</Autocomplete.Item>
            <Autocomplete.Item key="firefly">Firefly</Autocomplete.Item>
          </Autocomplete>
          <pre>current: {current}</pre>
          <pre>
            submitted: (key: {submitted[0]}, value: {submitted[1]})
          </pre>
        </Stack>
      </Container>
    );
  },
};

export const Async: Story = {
  render: () => {
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
      >
        {(item: any) => (
          <Autocomplete.Item key={item.name}>{item.name}</Autocomplete.Item>
        )}
      </Autocomplete>
    );
  },
};
