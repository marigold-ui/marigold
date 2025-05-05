import { useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Key } from 'react';
import { useAsyncList } from '@react-stately/data';
import { Stack } from '../Stack';
import { Text } from '../Text';
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
        defaultValue: { summary: '' },
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
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        defaultValue: { summary: 'undefined' },
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
    error: false,
    disabled: false,
    width: 'full',
    menuTrigger: 'input',
    placeholder: undefined,
    label: 'Label',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof ComboBox> = {
  render: args => {
    return (
      <ComboBox label="Animals" disabledKeys={['snake']} {...args}>
        <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
        <ComboBox.Option id="cat">Cat</ComboBox.Option>
        <ComboBox.Option id="dog">Dog</ComboBox.Option>
        <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
        <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
        <ComboBox.Option id="snake">Snake</ComboBox.Option>
        <ComboBox.Option id="vegan">Vegan</ComboBox.Option>
        <ComboBox.Option id="mar">Margrita</ComboBox.Option>
      </ComboBox>
    );
  },
};

export const Controlled: StoryObj<typeof ComboBox> = {
  render: args => {
    const [current, setCurrent] = useState<string | undefined>('');
    const [id, setId] = useState<Key | null>(null);
    return (
      <Stack>
        <ComboBox
          value={current}
          defaultSelectedKey={3}
          onChange={setCurrent}
          onSelectionChange={id => setId(id)}
          label="Animals"
          {...args}
        >
          <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
          <ComboBox.Option id="cat">Cat</ComboBox.Option>
          <ComboBox.Option id="dog">Dog</ComboBox.Option>
          <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
          <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
        </ComboBox>
        <pre>
          current: {current}, selected: {id?.toString()}
        </pre>
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
          <ComboBox.Option key={item.name} id={item.name}>
            {item.name}
          </ComboBox.Option>
        )}
      </ComboBox>
    );
  },
};

export const Sections: StoryObj<typeof ComboBox> = {
  render: args => (
    <ComboBox {...args}>
      <ComboBox.Section header="Fantasy">
        <ComboBox.Option id="harry-potter" textValue="Harry Potter">
          <Text slot="label">Harry Potter</Text>
          <Text slot="description">About the boy who lived</Text>
        </ComboBox.Option>
        <ComboBox.Option id="lord-of-the-rings" textValue="Lord of the Rings">
          <Text slot="label">Lord of the Rings</Text>
          <Text slot="description">In the lands of Middle earth</Text>
        </ComboBox.Option>
      </ComboBox.Section>
      <ComboBox.Section header="Sci-Fi">
        <ComboBox.Option id="star-wars" textValue="Start Wars">
          <Text slot="label">Start Wars</Text>
          <Text slot="description">
            A long time ago, in a galaxy far, far away
          </Text>
        </ComboBox.Option>
        <ComboBox.Option id="star-trek" textValue="Star Trek">
          <Text slot="label">Star Trek</Text>
          <Text slot="description">What is this</Text>
        </ComboBox.Option>
      </ComboBox.Section>
    </ComboBox>
  ),
};
