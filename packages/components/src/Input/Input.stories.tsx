import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Delete, Search } from '@marigold/icons';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Input } from './Input';

const meta = preview.meta({
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
        'file',
        'color',
      ],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'text' },
      },
      description: 'Set the type of the input.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Disable the input',
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Make input read only',
    },
    pattern: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
      description: 'Pattern for the input',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
      description: 'Placeholder for the input',
    },
  },
  args: {
    type: 'text',
    placeholder: 'Placeholder...',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => <Input {...args} data-testid="input" />,
});

Basic.test(
  'Types into and clears the input',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('input'), 'Hello World');
    await expect(canvas.getByTestId('input')).toHaveValue('Hello World');

    await userEvent.clear(canvas.getByTestId('input'));
    await expect(canvas.getByTestId('input')).toHaveValue('');
  }
);

export const WithIcons = meta.story({
  render: args => (
    <Input
      icon={<Search />}
      action={
        <Button size="small">
          <Delete />
        </Button>
      }
      {...args}
    />
  ),
});

export const Types = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Stack space={4}>
      <Input {...args} type="text" placeholder="Text" />
      <Input {...args} type="email" placeholder="Email" />
      <Input {...args} type="password" placeholder="Password" />
      <Input {...args} type="number" placeholder="Number" />
      <Input {...args} type="search" placeholder="Search" />
      <Input {...args} type="tel" placeholder="Telephone" />
      <Input {...args} type="url" placeholder="URL" />
      <Input {...args} type="date" />
      <Input {...args} type="file" />
      {/* color can't be set by keyboard, so seed a value for the snapshot */}
      <Input {...args} type="color" defaultValue="#3366ff" />
    </Stack>
  ),
});

Types.test(
  'Fills in each input type',
  // Re-enable the snapshot (the base story disables it) so Chromatic captures
  // the filled-out end state rather than the empty fields.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByPlaceholderText('Text'), 'Hello world');
    await userEvent.type(
      canvas.getByPlaceholderText('Email'),
      'jane@example.com'
    );
    await userEvent.type(
      canvas.getByPlaceholderText('Password'),
      'sup3rs3cret'
    );
    await userEvent.type(canvas.getByPlaceholderText('Number'), '42');
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'marigold');
    await userEvent.type(
      canvas.getByPlaceholderText('Telephone'),
      '+49 30 1234567'
    );
    await userEvent.type(
      canvas.getByPlaceholderText('URL'),
      'https://marigold-ui.io'
    );

    // date / file / color have no placeholder or label, so target them by type.
    // date accepts a typed value and file an upload; color is seeded via
    // defaultValue in the render since it can't be driven by the keyboard.
    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const colorInput = document.querySelector(
      'input[type="color"]'
    ) as HTMLInputElement;

    await userEvent.type(dateInput, '2024-12-31');
    await userEvent.upload(
      fileInput,
      new File(['hello'], 'photo.png', { type: 'image/png' })
    );

    await expect(canvas.getByPlaceholderText('Text')).toHaveValue(
      'Hello world'
    );
    await expect(canvas.getByPlaceholderText('Email')).toHaveValue(
      'jane@example.com'
    );
    await expect(canvas.getByPlaceholderText('Password')).toHaveValue(
      'sup3rs3cret'
    );
    await expect(canvas.getByPlaceholderText('Number')).toHaveValue(42);
    await expect(canvas.getByPlaceholderText('Search')).toHaveValue('marigold');
    await expect(canvas.getByPlaceholderText('Telephone')).toHaveValue(
      '+49 30 1234567'
    );
    await expect(canvas.getByPlaceholderText('URL')).toHaveValue(
      'https://marigold-ui.io'
    );
    await expect(dateInput).toHaveValue('2024-12-31');
    await expect(fileInput.files?.[0]?.name).toBe('photo.png');
    await expect(colorInput).toHaveValue('#3366ff');
  }
);
