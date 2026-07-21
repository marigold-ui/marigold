import { Key, useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Description } from '../Description/Description';
import { Stack } from '../Stack/Stack';
import { TextValue } from '../TextValue/TextValue';
import { ComboBox } from './ComboBox';

const meta = preview.meta({
  title: 'Components/ComboBox',
  component: ComboBox,
  decorators: [
    Story => (
      <div id="storybook-root" className="p-4">
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

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    return (
      <I18nProvider locale="en">
        <ComboBox {...args} disabledKeys={['snake']} allowsEmptyCollection>
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
});

Basic.test('Shows empty state', async ({ canvas }) => {
  const input = canvas.getByRole('combobox');

  await userEvent.type(input, 'xyz');
  const emptyState = await canvas.findByText('No result found');

  expect(emptyState).toBeInTheDocument();
});

Basic.test('Shows a selected value from list', async ({ canvas }) => {
  const combobox = canvas.getByRole('combobox');

  await userEvent.type(combobox, 'dog');
  await userEvent.click(await canvas.findByRole('option', { name: 'Dog' }));

  await waitFor(() => expect(combobox).toHaveValue('Dog'));
  await waitFor(() => expect(combobox).toBeVisible());
  await waitFor(() => expect(combobox).toBeInTheDocument());
});

Basic.test(
  'Opens with manual trigger showing a list',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    args: {
      menuTrigger: 'manual',
    },
  },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, '{arrowdown}');
    const result = canvas.getAllByText('Red Panda')[0];

    await expect(result).toBeVisible();
  }
);

Basic.test('Opens with input trigger', async ({ canvas }) => {
  const input = canvas.getByRole('combobox');

  await userEvent.click(input);
  await userEvent.type(input, 'ard');
  await userEvent.click(
    await canvas.findByRole('option', { name: 'Aardvark' })
  );

  await waitFor(() => expect(input).toBeInTheDocument());
  await waitFor(() => expect(input).toHaveValue('Aardvark'));
  await waitFor(() => expect(input).toBeVisible());
});

Basic.test('Opens with focus trigger', async ({ canvas }) => {
  const combobox = canvas.getByRole('combobox');

  await userEvent.type(combobox, 'oo');
  await userEvent.click(
    await canvas.findByRole('option', { name: 'Kangaroo' })
  );

  await waitFor(() => expect(combobox).toBeVisible());
  await waitFor(() => expect(combobox).toBeInTheDocument());
  await waitFor(() => expect(combobox).toHaveValue('Kangaroo'));
});

export const Controlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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
});

export const Sections = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    menuTrigger: 'focus',
  },
  render: args => (
    <ComboBox {...args}>
      <ComboBox.Section header="Fantasy">
        <ComboBox.Option id="harry-potter" textValue="Harry Potter">
          <TextValue>Harry Potter</TextValue>
          <Description>About the boy who lived</Description>
        </ComboBox.Option>
        <ComboBox.Option id="lord-of-the-rings" textValue="Lord of the Rings">
          <TextValue>Lord of the Rings</TextValue>
          <Description>In the lands of Middle earth</Description>
        </ComboBox.Option>
      </ComboBox.Section>
      <ComboBox.Section header="Sci-Fi">
        <ComboBox.Option id="star-wars" textValue="Star Wars">
          <TextValue>Star Wars</TextValue>
          <Description>A long time ago, in a galaxy far, far away</Description>
        </ComboBox.Option>
        <ComboBox.Option id="star-trek" textValue="Star Trek">
          <TextValue>Star Trek</TextValue>
          <Description>What is this</Description>
        </ComboBox.Option>
      </ComboBox.Section>
    </ComboBox>
  ),
});

Sections.test(
  'Shows sections',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
    const combobox = await canvas.findByRole('combobox', { name: 'Label' });
    await userEvent.click(combobox);
    await waitFor(() =>
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    );

    const s1 = await canvas.findByText('Fantasy');
    const s2 = await canvas.findByText('Sci-Fi');

    expect(s1).toBeVisible();
    expect(s2).toBeVisible();

    const item = canvas.getByRole('option', { name: /Harry Potter/ });
    const description = canvas.getByText('About the boy who lived');
    expect(description.id).toBeTruthy();
    expect(item.getAttribute('aria-describedby') ?? '').toContain(
      description.id
    );
  }
);

export const DisabledKeys = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <ComboBox {...args} disabledKeys={['spinach']}>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  ),
});

DisabledKeys.test(
  'Disabled key is not selectable',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
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
  }
);

const LARGE_ITEMS = Array.from({ length: 800 }, (_, i) => ({
  id: `item-${i + 200}`,
  label: `Tenant ${i + 200} (item-${i + 200})`,
}));

export const LargeDataset = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  tags: ['component-test'],
  args: {
    label: 'Tenants',
    placeholder: 'Search tenants...',
    width: 80,
  },
  render: args => (
    <ComboBox {...args}>
      {LARGE_ITEMS.map(item => (
        <ComboBox.Option key={item.id} id={item.id}>
          {item.label}
        </ComboBox.Option>
      ))}
    </ComboBox>
  ),
});

LargeDataset.test(
  'Filters and selects frióm a large Dataset',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, step }) => {
    const input = canvas.getByRole('combobox');

    await step('Filter the large dataset by typing', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'item-500');
      await waitFor(() => canvas.getByRole('listbox'));
    });

    await step('Verify filter narrowed to a single option', async () => {
      const listbox = canvas.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Tenant 500 (item-500)');
      await userEvent.click(options[0]);
    });

    await step('Verify selected value appears in the input', async () => {
      await waitFor(() => {
        expect(input).toHaveValue('Tenant 500 (item-500)');
      });
    });
  }
);

export const Mobile = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <I18nProvider locale="en">
      <ComboBox {...args} allowsEmptyCollection>
        <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
        <ComboBox.Option id="cat">Cat</ComboBox.Option>
        <ComboBox.Option id="dog">Dog</ComboBox.Option>
        <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
        <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
        <ComboBox.Option id="snake">Snake</ComboBox.Option>
        <ComboBox.Option id="elephant">Elephant</ComboBox.Option>
        <ComboBox.Option id="giraffe">Giraffe</ComboBox.Option>
        <ComboBox.Option id="penguin">Penguin</ComboBox.Option>
        <ComboBox.Option id="dolphin">Dolphin</ComboBox.Option>
        <ComboBox.Option id="koala">Koala</ComboBox.Option>
        <ComboBox.Option id="tiger">Tiger</ComboBox.Option>
        <ComboBox.Option id="lion">Lion</ComboBox.Option>
        <ComboBox.Option id="zebra">Zebra</ComboBox.Option>
        <ComboBox.Option id="owl">Owl</ComboBox.Option>
        <ComboBox.Option id="fox">Fox</ComboBox.Option>
      </ComboBox>
    </I18nProvider>
  ),
});

Mobile.test(
  'Open Tray',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
);

Mobile.test(
  'Mobile ComboBox interaction',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    await step('Verify tray content is visible', async () => {
      const input = await canvas.findByRole('combobox');

      await waitFor(() => expect(input).toBeVisible());
    });

    await step('Select option from list', async () => {
      const option = await canvas.findByText('Dog');

      await userEvent.click(option);
    });

    await step('Close select with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    await step('Verify selection is displayed in trigger', async () => {
      await waitFor(() => expect(trigger).toHaveTextContent('Dog'));
    });
  }
);

Mobile.test('Mobile ComboBox keyboard navigation', async ({ canvas, step }) => {
  const trigger = await canvas.findByRole('button');

  await step('Open tray by clicking trigger', async () => {
    await userEvent.click(trigger);

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
  });

  await step('Verify combobox input receives focus', async () => {
    const input = await canvas.findByRole('combobox');

    await waitFor(() => expect(input).toHaveFocus());
  });

  await step('Filter options by typing', async () => {
    await userEvent.keyboard('cat');

    await waitFor(() => {
      expect(canvas.getByText('Cat')).toBeVisible();
      expect(canvas.queryByText('Dog')).not.toBeInTheDocument();
    });
  });

  await step('Navigate to option with arrow keys and select', async () => {
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
  });

  await step('Close tray with Escape key', async () => {
    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });

  await step('Verify selection is displayed in trigger', async () => {
    await waitFor(() => expect(trigger).toHaveTextContent('Cat'));
  });
});

Mobile.test(
  'Mobile ComboBox shows empty state',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray', async () => {
      await userEvent.click(trigger);

      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Type non-matching text to trigger empty state', async () => {
      const input = await canvas.findByRole('combobox');
      await userEvent.type(input, 'xyz');

      await waitFor(() =>
        expect(canvas.getByText('No result found')).toBeVisible()
      );
    });
  }
);
