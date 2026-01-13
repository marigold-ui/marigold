import { Key } from 'react';
import { I18nProvider } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { expect, userEvent, waitFor } from 'storybook/test';
import { useAsyncList } from '@react-stately/data';
import preview from '../../../../.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { ComboBox } from './ComboBox';

const meta = preview.meta({
  title: 'Components/ComboBox',
  component: ComboBox,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
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
    emptyState: {
      control: {
        type: 'text',
      },
      description: 'Set text when there is no result.',
      table: {
        type: { summary: 'text' },
      },
    },
    allowsEmptyCollection: {
      control: {
        type: 'boolean',
      },
      description: 'allow empty collection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
  } as const,
});

// Explicit type annotation prevents TS2742 by avoiding leaking inferred internal types
export const Basic: any = meta.story({
  tags: ['component-test'],
  render: args => {
    return (
      <I18nProvider locale="de-DE">
        <ComboBox
          label="Animals"
          disabledKeys={['snake']}
          allowsEmptyCollection
          {...args}
        >
          <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
          <ComboBox.Option id="cat">Cat</ComboBox.Option>
          <ComboBox.Option id="dog">Dog</ComboBox.Option>
          <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
          <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
          <ComboBox.Option id="snake">Snake</ComboBox.Option>
          <ComboBox.Option id="vegan">Vegan</ComboBox.Option>
          <ComboBox.Option id="mar">Margrita</ComboBox.Option>
        </ComboBox>
      </I18nProvider>
    );
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'xyz');
    const emptyState = await canvas.findByText('Kein Ergebnis gefunden');
    expect(emptyState).toBeInTheDocument();
  },
});

export const Controlled: any = meta.story({
  tags: ['component-test'],
  render: args => {
    const [id, setId] = useState<Key | null>(null);
    return (
      <Stack>
        <ComboBox {...args} onSelectionChange={setId} label="Animals">
          <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
          <ComboBox.Option id="cat">Cat</ComboBox.Option>
          <ComboBox.Option id="dog">Dog</ComboBox.Option>
          <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
          <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
        </ComboBox>
        <pre data-testid="output">selected: {id?.toString()}</pre>
      </Stack>
    );
  },
  play: async ({ canvas }: any) => {
    const combobox = canvas.queryByRole('combobox', { name: 'Animals' });
    const input = await canvas.findByRole('combobox', { name: 'Animals' });

    await userEvent.type(input, 'dog');
    await userEvent.click(await canvas.findByRole('option', { name: 'Dog' }));

    await waitFor(() => expect(combobox).toHaveValue('Dog'));
    await waitFor(() => expect(combobox).toBeVisible());
    await waitFor(() => expect(combobox).toBeInTheDocument());
  },
});

export const ManualMenuTrigger: any = meta.story({
  ...Basic.input,
  args: {
    menuTrigger: 'manual',
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, '{arrowdown}');
    const result = canvas.getAllByText('Red Panda')[0];

    await expect(result).toBeVisible();
  },
});

export const AsyncLoading: any = meta.story({
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
});

export const Sections: any = meta.story({
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
  play: async ({ canvas }: any) => {
    await userEvent.click(
      await canvas.findByRole('combobox', { name: 'Label' })
    );
    await userEvent.keyboard('{arrowdown}');
    const s1 = await canvas.findByText('Fantasy');
    const s2 = await canvas.findByText('Sci-Fi');

    expect(s1).toBeVisible();
    expect(s2).toBeVisible();
  },
});

export const InputTrigger: any = meta.story({
  ...Basic.input,
  play: async ({ canvas }: any) => {
    const input = await canvas.findByRole('combobox', { name: 'Label' });
    const result = await canvas.queryByRole('combobox', { name: 'Label' });

    await userEvent.click(await input);
    await userEvent.type(await input, 'ard');
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Aardvark' })
    );

    await waitFor(() => expect(result).toBeInTheDocument());
    await waitFor(() => expect(result).toHaveValue('Aardvark'));
    await waitFor(() => expect(result).toBeVisible());
  },
});

export const FocusTrigger: any = meta.story({
  ...Basic.input,
  args: {
    menuTrigger: 'focus',
  },
  play: async ({ canvas }: any) => {
    const combobox = await canvas.findByRole('combobox', { name: 'Label' });

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
});

export const ManualTrigger: any = meta.story({
  ...Basic.input,
  args: {
    menuTrigger: 'manual',
  },
  play: async ({ canvas }: any) => {
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
});

export const DisabledKeys: any = meta.story({
  tags: ['component-test'],
  render: args => (
    <ComboBox {...args} disabledKeys={['spinach']}>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  ),
  play: async ({ canvas }: any) => {
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
});
