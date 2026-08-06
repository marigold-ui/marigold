import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Checkbox } from './Checkbox';

const meta = preview.meta({
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a Checkbox' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      description: 'Padding y (top and bottom)',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Description text',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error message shown when `error` is set',
    },
  },
  args: {
    readOnly: false,
    indeterminate: false,
    disabled: false,
    label: 'This is a Checkbox',
    size: 'default',
    defaultChecked: false,
    error: false,
    required: false,
    description: 'This is a description',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
});

Basic.test('Checks checkbox', async ({ canvas, userEvent }) => {
  const checkbox = await canvas.findByRole('checkbox');

  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

Basic.test(
  'Read only can not uncheck the checkbox',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  }
);

Basic.test(
  'Description is set and accessible',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const description = await canvas.queryByText('This is a description');

    const helpTextId = description?.getAttribute('id');
    const checkboxDescribedBy = checkbox.getAttribute('aria-describedby');

    expect(description).toBeInTheDocument();
    expect(checkboxDescribedBy).toBe(helpTextId);
  }
);

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    error: true,
    errorMessage: 'This selection is required',
    description: 'This is a description',
  },
});

WithError.test(
  'Error message replaces the description',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const checkbox = await canvas.findByRole('checkbox');

    // The error message replaces the description when `error` is set.
    expect(canvas.queryByText('This is a description')).not.toBeInTheDocument();
    await expect(checkbox).toHaveAccessibleDescription(
      'This selection is required'
    );
  }
);
