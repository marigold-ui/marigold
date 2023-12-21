/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useAsyncList } from '@react-stately/data';

import { Stack } from '../Stack';
import { ComboBox } from './ComboBox';

const meta = {
  title: 'Components/ComboBox',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the label of the Combobox',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'not set' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the help text description.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable ComboBox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Set the Error Message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'not set' },
      },
    },
    menuTrigger: {
      control: {
        type: 'select',
      },
      options: ['focus', 'input', 'manual'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'input' },
      },
      description: 'Set which interaction shows the menu',
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        'The width of the field. For that we use the Tailwind tokens.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof ComboBox> = {
  render: args => {
    return (
      <ComboBox label="Animals" disabledKeys={['snake']} {...args}>
        <ComboBox.Item id="red panda">Red Panda</ComboBox.Item>
        <ComboBox.Item id="cat">Cat</ComboBox.Item>
        <ComboBox.Item id="dog">Dog</ComboBox.Item>
        <ComboBox.Item id="aardvark">Aardvark</ComboBox.Item>
        <ComboBox.Item id="kangaroo">Kangaroo</ComboBox.Item>
        <ComboBox.Item id="snake">Snake</ComboBox.Item>
        <ComboBox.Item id="vegan">Vegan</ComboBox.Item>
        <ComboBox.Item id="mar">Margrita</ComboBox.Item>
      </ComboBox>
    );
  },
};

export const Controlled: StoryObj<typeof ComboBox> = {
  render: args => {
    const [current, setCurrent] = useState<string | undefined>();
    return (
      <Stack>
        <ComboBox
          value={current}
          onChange={setCurrent}
          defaultSelectedKey={3}
          label="Animals"
          {...args}
        >
          <ComboBox.Item id="red panda">Red Panda</ComboBox.Item>
          <ComboBox.Item id="cat">Cat</ComboBox.Item>
          <ComboBox.Item id="dog">Dog</ComboBox.Item>
          <ComboBox.Item id="aardvark">Aardvark</ComboBox.Item>
          <ComboBox.Item id="kangaroo">Kangaroo</ComboBox.Item>
        </ComboBox>
        <pre>current: {current}</pre>
      </Stack>
    );
  },
};

export const AsyncLoading: StoryObj<typeof ComboBox> = {
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
      <ComboBox
        value={list.filterText}
        onChange={list.setFilterText}
        items={list.items}
        label="Star Wars Character Lookup"
        {...args}
      >
        {(item: { name: string }) => (
          <ComboBox.Item key={item.name}>{item.name}</ComboBox.Item>
        )}
      </ComboBox>
    );
  },
};
