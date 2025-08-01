import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { DateValue } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { I18nProvider } from '@react-aria/i18n';
import { Stack } from '../Stack';
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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        'Width of the date picker input field, for that we use Tailwind tokens',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Set the date picker required.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: 'Open the date Picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Sets error message for the date picker.',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Sets help text for the date picker.',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Sets error for the date picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'set readOnly for date picker .',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong!',
    description: 'This is a description help text.',
    disabled: false,
    required: false,
    error: false,
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
        <Stack>
          <DatePicker
            label="Date Picker"
            value={value}
            onChange={newValue => setValue(newValue!)}
            description="Controlled date field"
            errorMessage="This is an error"
            {...args}
          />
          {value ? (
            <pre style={{ marginTop: '1rem' }}>
              <strong>DateField Value:</strong>
              {`Day: ${value.day} Month: ${value.month} Year: ${value.year}`}
            </pre>
          ) : (
            <pre>`No value (${value}).`</pre>
          )}
        </Stack>
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

export const UnavailableDate: Story = {
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        label="Date Picker"
        dateUnavailable={date => date.toDate('Europe/Berlin').getDate() !== 1}
        {...args}
      />
    </I18nProvider>
  ),
};
