import { CalendarDate, DateValue } from '@internationalized/date';
import { useState } from 'storybook/preview-api';
import { I18nProvider } from '@react-aria/i18n';
import preview from '../../../../config/storybook/.storybook/preview';
import { DateField } from './DateField';

const meta = preview.meta({
  title: 'Components/DateField',
  component: DateField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Date Field label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the DateField invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'Width of the field',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'My Label',
    description: 'This is a help text description',
    error: false,
    errorMessage: 'Something went wrong',
    readOnly: false,
    disabled: false,
    required: false,
  },
});

export const Basic = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField {...args} />
    </I18nProvider>
  ),
});

export const ControlledDateField = meta.story({
  render: args => {
    const [value, setValue] = useState<DateValue>(new CalendarDate(1970, 1, 1));
    return (
      <I18nProvider locale="de-DE">
        <DateField
          label="Date Field"
          value={value}
          onChange={newValue => setValue(newValue!)}
          {...args}
        />
        <pre>
          <strong>DateField Value: </strong>
          {value &&
            'day:' +
              value?.day +
              ' month: ' +
              value?.month +
              ' year:' +
              value?.year}
        </pre>
      </I18nProvider>
    );
  },
});

export const BritishLocal = meta.story({
  render: args => (
    <I18nProvider locale="en-GB">
      <DateField {...args} />
    </I18nProvider>
  ),
});
