import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { DateValue } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the Calendar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoFocus: {
      control: {
        type: 'boolean',
      },
      description:
        'Whether to automatically focus the calendar when it mounts.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Make the Calendar not editable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'Width of the Calendar',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'fit' },
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Calendar {...args} />,
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState<DateValue>(new CalendarDate(2019, 6, 5));
    return (
      <>
        <Calendar value={value} onChange={setValue} {...args} />
        <pre style={{ marginTop: '1rem' }}>
          <strong>DateField Value:</strong>
          {'Day:' + value.day + ' Month:' + value.month + ' Year:' + value.year}
        </pre>
      </>
    );
  },
};
