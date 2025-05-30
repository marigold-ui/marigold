import { parseTime } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { TimeValue } from 'react-aria-components';
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
  render: args => <TimeField defaultValue={parseTime('13:45:30')} {...args} />,
};

export const FocusEvents: Story = {
  args: {
    defaultValue: parseTime('13:45'),
  },
  tags: ['component-test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const hour = await canvas.getByLabelText('13');

    await step('Focus the TimeField using tab', async () => {
      await userEvent.tab();
      await expect(hour).toHaveFocus();
    });
  },
};

export const ControlledTimeField: Story = {
  render: args => {
    const ControlledComponent = () => {
      const [value, setValue] = useState<TimeValue>(parseTime('13:45'));

      return (
        <>
          <TimeField
            label="Time Field"
            value={value}
            onChange={newValue => setValue(newValue!)}
            {...args}
          />
          <pre>
            <strong>TimeField Value: </strong>
            {value?.hour} Hours {value?.minute} Minutes
          </pre>
        </>
      );
    };

    return <ControlledComponent />;
  },
};
