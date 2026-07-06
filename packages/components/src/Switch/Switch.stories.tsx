import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Switch } from './Switch';

const meta = preview.meta({
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'settings'],
      description: 'Switch variant style',
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Default Switch' },
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the switch.',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Switch disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'A helpful text below the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the switch is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'An error message shown when `error` is set',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    selected: {
      control: {
        type: 'boolean',
      },
      description: 'Wether the switch is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    label: 'Default Switch',
    disabled: false,
    defaultSelected: false,
    error: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
});

Basic.test('Toggles on when clicked', async ({ canvas, userEvent }) => {
  const button = canvas.getByRole('switch');

  await userEvent.click(button);

  await expect(button).toBeChecked();
});

Basic.test(
  'Toggles with the Space key',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.tab();

    await userEvent.keyboard(' ');
    await expect(input.checked).toBeTruthy();

    await userEvent.keyboard(' ');
    await expect(input.checked).toBeFalsy();
  }
);

Basic.test(
  'Toggles off from the default-selected state',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { defaultSelected: true },
  },
  async ({ canvas, userEvent }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.click(input);

    await expect(input.checked).toBeFalsy();
  }
);

export const WithDescription = meta.story({
  tags: ['component-test'],
  args: {
    description: 'This is a description',
  },
});

WithDescription.test(
  'Description is set and accessible',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    expect(canvas.getByText('This is a description')).toBeInTheDocument();
    await expect(switchEl).toHaveAccessibleDescription('This is a description');
  }
);

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    error: true,
    errorMessage: 'This setting is required',
    description: 'This is a description',
  },
});

WithError.test(
  'Error message replaces the description',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    // The error message replaces the description when `error` is set.
    expect(canvas.queryByText('This is a description')).not.toBeInTheDocument();
    await expect(switchEl).toHaveAccessibleDescription(
      'This setting is required'
    );
  }
);

export const Settings = meta.story({
  args: {
    variant: 'settings',
    label: 'Email notifications',
    description: 'Receive email notifications when someone mentions you',
  },
});
