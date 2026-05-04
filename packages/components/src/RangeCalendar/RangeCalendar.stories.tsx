import { CalendarDate, isWeekend } from '@internationalized/date';
import { useState } from 'react';
import { DateValue, RangeValue } from 'react-aria-components';
import { expect, fn, within } from 'storybook/test';
import preview from '.storybook/preview';
import { useLocale } from '@react-aria/i18n';
import { RangeCalendar } from './RangeCalendar';

const meta = preview.meta({
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the RangeCalendar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Make the RangeCalendar not editable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Mark the value as invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    allowsNonContiguousRanges: {
      control: { type: 'boolean' },
      description:
        'Allow ranges that span unavailable dates by treating them as gaps',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the RangeCalendar',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'fit' },
      },
    },
  },
  args: {
    defaultValue: {
      start: new CalendarDate(2025, 8, 7),
      end: new CalendarDate(2025, 8, 14),
    },
  },
});

export const Basic = meta.story({
  render: args => <RangeCalendar {...args} />,
});

export const Controlled = meta.story({
  render: args => {
    const [value, setValue] = useState<RangeValue<DateValue> | null>({
      start: new CalendarDate(2019, 6, 5),
      end: new CalendarDate(2019, 6, 12),
    });
    return (
      <>
        <RangeCalendar {...args} value={value} onChange={setValue} autoFocus />
        <pre style={{ marginTop: '1rem' }} data-testid="selectedRange">
          <strong>RangeCalendar Value:</strong>
          {value
            ? ` ${value.start.toString()} → ${value.end.toString()}`
            : ' (none)'}
        </pre>
      </>
    );
  },
});

export const Disabled = meta.story({
  ...Basic.input,
  args: {
    disabled: true,
  },
});

export const ReadOnly = meta.story({
  ...Basic.input,
  args: {
    readOnly: true,
  },
});

export const WithError = meta.story({
  ...Basic.input,
  args: {
    invalid: true,
    errorMessage: 'Please select a valid date range.',
  },
});

export const Unavailable = meta.story({
  args: {
    defaultValue: {
      start: new CalendarDate(2025, 8, 4),
      end: new CalendarDate(2025, 8, 6),
    },
  },
  render: args => {
    const { locale } = useLocale();
    return (
      <RangeCalendar
        {...args}
        dateUnavailable={date => isWeekend(date, locale)}
      />
    );
  },
});

export const NonContiguous = meta.story({
  args: {
    allowsNonContiguousRanges: true,
  },
  render: args => {
    const { locale } = useLocale();
    const [value, setValue] = useState<RangeValue<DateValue> | null>({
      start: new CalendarDate(2025, 8, 4),
      end: new CalendarDate(2025, 8, 8),
    });

    const isUnavailable = (date: DateValue) => isWeekend(date, locale);

    const selectedDates: DateValue[] = [];
    if (value) {
      let cursor = value.start;
      while (cursor.compare(value.end) <= 0) {
        if (!isUnavailable(cursor)) selectedDates.push(cursor);
        cursor = cursor.add({ days: 1 });
      }
    }

    return (
      <>
        <RangeCalendar
          {...args}
          value={value}
          onChange={setValue}
          dateUnavailable={isUnavailable}
        />
        <pre style={{ marginTop: '1rem' }} data-testid="selectedRange">
          <strong>RangeCalendar Value:</strong>
          {value
            ? ` ${value.start.toString()} → ${value.end.toString()}`
            : ' (none)'}
        </pre>
        <pre style={{ marginTop: '0.5rem' }} data-testid="selectedDates">
          <strong>Selected dates (excluding unavailable):</strong>
          {selectedDates.length
            ? ` ${selectedDates.map(d => d.toString()).join(', ')}`
            : ' (none)'}
        </pre>
      </>
    );
  },
});

export const TwoMonths = meta.story({
  args: {
    visibleDuration: { months: 2 },
    defaultValue: {
      start: new CalendarDate(2025, 2, 15),
      end: new CalendarDate(2025, 3, 5),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

export const ThreeMonths = meta.story({
  args: {
    visibleDuration: { months: 3 },
    defaultValue: {
      start: new CalendarDate(2025, 5, 20),
      end: new CalendarDate(2025, 7, 10),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

export const TwoMonthsMobile: any = meta.story({
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: {
    visibleDuration: { months: 2 },
    defaultValue: {
      start: new CalendarDate(2025, 2, 15),
      end: new CalendarDate(2025, 3, 5),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

export const ThreeMonthsMobile: any = meta.story({
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: {
    visibleDuration: { months: 3 },
    defaultValue: {
      start: new CalendarDate(2025, 5, 20),
      end: new CalendarDate(2025, 7, 10),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

export const MultiMonthNavigation = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: {
      start: new CalendarDate(2025, 1, 15),
      end: new CalendarDate(2025, 1, 20),
    },
    onChange: fn(),
  },
  render: args => <RangeCalendar {...args} />,
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement);

    await step('navigates forward two months', async () => {
      const nextButtons = canvas.getAllByRole('button', { name: /next/i });
      await userEvent.click(nextButtons[0]);
    });

    await step('shows March and April after navigating forward', async () => {
      await expect(canvas.getByText('March 2025')).toBeInTheDocument();
      await expect(canvas.getByText('April 2025')).toBeInTheDocument();
    });

    await step('navigates back two months', async () => {
      const prevButtons = canvas.getAllByRole('button', { name: /previous/i });
      await userEvent.click(prevButtons[0]);
    });

    await step('shows January and February after navigating back', async () => {
      await expect(canvas.getByText('January 2025')).toBeInTheDocument();
      await expect(canvas.getByText('February 2025')).toBeInTheDocument();
    });
  },
});
