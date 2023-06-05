/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DatePickerProps } from './DatePicker';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the date picker',
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the date picker',
      defaultValue: false,
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the date picker',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Disable the date picker',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the date picker',
      defaultValue: false,
    },
  },
} satisfies Meta<DatePickerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <I18nProvider locale="de-DE">
        <DatePicker
          label="Date Picker"
          description="This is description"
          {...args}
        />
      </I18nProvider>
    );
  },
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState(today(getLocalTimeZone()));

    return (
      <I18nProvider locale="de-DE">
        <div className="flex items-center gap-4">
          <DatePicker
            label="Date Picker"
            value={value}
            onChange={setValue}
            description="Controlled date field"
            {...args}
          />
          <pre style={{ marginTop: '1rem' }}>
            <strong>DateField Value:</strong>
            {'Day:' +
              value.day +
              ' Month:' +
              value.month +
              ' Year:' +
              value.year}
          </pre>
        </div>
      </I18nProvider>
    );
  },
};

export const MinMax: Story = {
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        label="Date Picker"
        description="Determine min and max value for date picker"
        minValue={new CalendarDate(2019, 6, 5)}
        maxValue={new CalendarDate(2019, 6, 20)}
        {...args}
      />
    </I18nProvider>
  ),
};
