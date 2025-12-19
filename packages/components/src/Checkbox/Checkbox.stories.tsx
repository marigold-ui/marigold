import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '../../../../config/storybook/.storybook/preview';
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
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  },
});

export const Controlled = meta.story({
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText<HTMLInputElement>('This is a Checkbox');

    await userEvent.click(input);
    expect(args.onChange).toHaveBeenCalledWith(true);

    await userEvent.click(input);
    expect(args.onChange).toHaveBeenCalledWith(false);
  },
});

export const ReadOnly = meta.story({
  tags: ['component-test'],
  args: {
    defaultChecked: true,
    readOnly: true,
  },
  play: async ({ canvas }) => {
    const checkbox =
      canvas.getByLabelText<HTMLInputElement>('This is a Checkbox');
    const component = canvas.getByText('This is a Checkbox');

    await userEvent.click(component);

    await expect(checkbox.checked).toBeTruthy();
  },
});

export const WithDescription = meta.story({
  args: {
    description: 'This is a description',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = await canvas.findByRole('checkbox');
    const description = await canvas.queryByText('This is a description');

    const helpTextId = description?.getAttribute('id');
    const checkboxDescribedBy = checkbox.getAttribute('aria-describedby');

    expect(description).toBeInTheDocument();
    expect(checkboxDescribedBy).toBe(helpTextId);
  },
});
