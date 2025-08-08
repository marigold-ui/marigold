import { Meta, StoryObj } from '@storybook/react';
import React, { Key } from 'react';
import { useState } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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
  tags: ['component-test'],
  render: args => {
    const [current, setCurrent] = useState<string | undefined>('');
    const [id, setId] = useState<Key | null>(null);
    return (
      <Stack>
        <ComboBox
          {...args}
          value={current}
          defaultSelectedKey={3}
          onChange={setCurrent}
          onSelectionChange={id => setId(id)}
          label="Animals"
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
  play: async ({ canvasElement, userEvent }) => {
    const body = canvasElement.ownerDocument.body;
    const canvas = within(body);
    const combobox = canvas.queryByRole('combobox', { name: 'Animals' });

    await userEvent.click(
      await canvas.findByRole('combobox', { name: 'Animals' })
    );
    await userEvent.keyboard('{arrowdown}');
    await userEvent.type(
      await canvas.findByRole('combobox', { name: 'Animals' }),
      'do'
    );
    await userEvent.click(await canvas.findByRole('option', { name: 'Dog' }));
    //click outside - enter doesn't work 🤷‍♂️
    await userEvent.click(
      body.querySelector('#storybook-root > div > div') as HTMLElement
    );

    await waitFor(() =>
      expect(
        canvas.queryByText('current:', { exact: false })
      ).toHaveTextContent('current: Dog, selected: dog')
    );
    await waitFor(() => expect(combobox).toBeVisible());
    await waitFor(() => expect(combobox).toBeInTheDocument());
    await waitFor(() => expect(combobox).toHaveValue('Dog'));
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
  tags: ['component-test'],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      await canvas.findByRole('combobox', { name: 'Label' })
    );
    await userEvent.keyboard('{arrowdown}');
    const s1 = await canvas.findByText('Fantasy');
    const s2 = await canvas.findByText('Sci-Fi');

    expect(s1).toBeVisible();
    expect(s2).toBeVisible();
  },
};

export const InputTrigger: StoryObj<typeof ComboBox> = {
  tags: ['component-test'],
  ...Basic,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const input = canvas.findByRole('combobox', { name: 'Label' });
    const result = canvas.queryByRole('combobox', { name: 'Label' });

    await userEvent.click(await input);
    await userEvent.type(await input, 'ard');
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Aardvark' })
    );

    await waitFor(() => expect(result).toBeInTheDocument());
    await waitFor(() => expect(result).toHaveValue('Aardvark'));
    await waitFor(() => expect(result).toBeVisible());
  },
};

export const FocusTrigger: StoryObj<typeof ComboBox> = {
  tags: ['component-test'],
  ...Basic,
  args: {
    menuTrigger: 'focus',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const combobox = canvas.queryByRole('combobox', { name: 'Label' });

    await userEvent.type(
      await canvas.findByRole('combobox', { name: 'Label' }),
      'oo'
    );
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Kangaroo' })
    );

    await waitFor(() => expect(combobox).toBeVisible());
    await waitFor(() => expect(combobox).toBeInTheDocument());
    await waitFor(() => expect(combobox).toHaveValue('Kangaroo'));
  },
};

export const ManualTrigger: StoryObj<typeof ComboBox> = {
  tags: ['component-test'],
  ...Basic,
  args: {
    menuTrigger: 'manual',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const combobox = canvas.queryByRole('combobox', { name: 'Label' });

    await userEvent.click(
      await canvas.findByRole('combobox', { name: 'Label' })
    );
    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{enter}');

    await waitFor(() => expect(combobox).toBeInTheDocument());
    await waitFor(() => expect(combobox).toBeVisible());
    await waitFor(() => expect(combobox).toHaveValue('Red Panda'));
  },
};

export const DisabledKeys: StoryObj<typeof ComboBox> = {
  tags: ['component-test'],
  render: args => (
    <ComboBox {...args} disabledKeys={['spinach']}>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      await canvas.findByRole('combobox', { name: 'Label' })
    );
    await userEvent.type(
      await canvas.findByRole('combobox', { name: 'Label' }),
      'spi'
    );

    expect(canvas.queryByRole('option', { name: 'Spinach' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  },
};
