import { expect, userEvent, within } from 'storybook/test';
import { Delete, Search } from '@marigold/icons';
import preview from '../../../../config/storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Input } from './Input';

const meta = preview.meta({
  title: 'Components/Input',
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('input'), 'Hello World');
    await expect(canvas.getByTestId('input')).toHaveValue('Hello World');

    await userEvent.clear(canvas.getByTestId('input'));
    await expect(canvas.getByTestId('input')).toHaveValue('');
  },
});

export const WithLeadingIcons = meta.story({
  render: args => <Input icon={<Search />} {...args} />,
});

export const WithAction = meta.story({
  render: args => (
    <Input
      action={
        <Button size="small" onPress={() => alert('Action executed')}>
          <Delete />
        </Button>
      }
      {...args}
    />
  ),
});

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

export const FileInput = meta.story({
  render: args => <Input {...args} type="file" />,
});

export const ColorPicker = meta.story({
  render: args => <Input {...args} type="color" />,
});
