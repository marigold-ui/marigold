import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Switch } from './Switch';

const meta = preview.meta({
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
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
        type: 'radio',
      },
      options: ['default', 'large'],
      description: 'The sizes for switch.',
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
    description: 'Enable or disable this feature',
    disabled: false,
    defaultSelected: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('switch');

    await userEvent.click(button);

    await expect(button).toBeChecked();
  },
});

export const KeyboardToggle = meta.story({
  tags: ['component-test'],
  play: async ({ canvas }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.tab();

    await userEvent.keyboard('{enter}');
    await expect(input.checked).toBeTruthy();

    await userEvent.keyboard('{enter}');
    await expect(input.checked).toBeFalsy();
  },
});

export const WithDescription = meta.story({
  args: {
    description: 'This is a description',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const switchEl = await canvas.findByRole('switch');
    const description = canvas.queryByText('This is a description');

    const helpTextId = description?.closest('[id]')?.getAttribute('id');
    const switchDescribedBy = switchEl.getAttribute('aria-describedby');

    expect(description).toBeInTheDocument();
    expect(switchDescribedBy).toBe(helpTextId);
  },
});

export const DefaultSelected = meta.story({
  tags: ['component-test'],
  args: {
    defaultSelected: true,
  },
  play: async ({ canvas, userEvent }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.click(input);

    await expect(input.checked).toBeFalsy();
  },
});
