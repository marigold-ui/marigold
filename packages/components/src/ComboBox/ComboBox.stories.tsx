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
      description: 'Set the label',
      defaultValue: 'Select for favorite:',
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
      description: 'Disable ComboBox',
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
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
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
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof ComboBox> = {
  render: args => {
    return (
      <ComboBox label="Animals" {...args}>
        <ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
        <ComboBox.Item key="cat">Cat</ComboBox.Item>
        <ComboBox.Item key="dog">Dog</ComboBox.Item>
        <ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
        <ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
        <ComboBox.Item key="snake">Snake</ComboBox.Item>
        <ComboBox.Item key="vegan">Vegan</ComboBox.Item>
        <ComboBox.Item key="mar">Margrita</ComboBox.Item>
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
          <ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
          <ComboBox.Item key="cat">Cat</ComboBox.Item>
          <ComboBox.Item key="dog">Dog</ComboBox.Item>
          <ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
          <ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
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
