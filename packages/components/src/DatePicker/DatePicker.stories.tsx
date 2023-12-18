/* eslint-disable react-hooks/rules-of-hooks */
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateValue } from 'react-aria-components';

import { I18nProvider } from '@react-aria/i18n';

import { DatePicker } from './DatePicker';

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
    width: {
      control: {
        type: 'text',
      },
      description: 'width of the date picker input field',
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
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <I18nProvider locale="de-DE">
        <DatePicker
          label="Date Picker"
          description="This is description"
          errorMessage="This is an error"
          {...args}
        />
      </I18nProvider>
    );
  },
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState(today(getLocalTimeZone()) as DateValue);

    return (
      <I18nProvider locale="de-DE">
        <div className="flex items-center gap-4">
          <DatePicker
            label="Date Picker"
            value={value}
            defaultValue={value}
            onChange={() => setValue}
            description="Controlled date field"
            errorMessage="This is an error"
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
        errorMessage="This is an error"
        minValue={new CalendarDate(2019, 6, 5)}
        maxValue={new CalendarDate(2019, 6, 20)}
        {...args}
      />
    </I18nProvider>
  ),
};
