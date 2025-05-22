import type { Meta, StoryObj } from '@storybook/react';
import { TimeField } from './TimeField';

const meta = {
  title: 'Components/TimeField',
  component: TimeField,
  argTypes: {
    label: {
      control: 'text',
      description: 'The label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Time' },
      },
    },
    description: {
      control: 'text',
      description: 'Help text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Pick a time' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Marks field as invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when invalid',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Invalid time' },
      },
    },
    required: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hourCycle: {
      control: {
        type: 'select',
      },
      options: [12, 24],
      description: '12 or 24 hour format',
      table: {
        type: { summary: `'12' | '24'` },
        defaultValue: { summary: '24' },
      },
    },
    granularity: {
      control: {
        type: 'select',
      },
      options: ['hour', 'minute', 'second'],
      description: 'Smallest displayed time unit',
      table: {
        type: { summary: `'hour' | 'minute' | 'second'` },
        defaultValue: { summary: 'minute' },
      },
    },
    shouldForceLeadingZeros: {
      control: 'boolean',
      description: 'Force leading zeros in hour field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'text',
      description: 'Tailwind width token (e.g. "full", "1/2")',
    },
  },
  args: {
    label: 'Time',
    description: 'Pick a time',
    errorMessage: 'Invalid time',
    readOnly: false,
    disabled: false,
    required: false,
    error: false,
    hourCycle: 24,
    granularity: 'minute',
    shouldForceLeadingZeros: false,
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    hourCycle: 24,
  },

  render: args => <TimeField {...args} />,
};
