import { CalendarDate, isWeekend } from '@internationalized/date';
import { useState } from 'react';
import { DateValue, I18nProvider, RangeValue } from 'react-aria-components';
import { expect, fn, within } from 'storybook/test';
import preview from '.storybook/preview';
import { useLocale } from '@react-aria/i18n';
import { RangeCalendar } from './RangeCalendar';

const meta = preview.meta({
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  decorators: [
    Story => (
      <I18nProvider locale="en-US">
        <div id="storybook-root">
          <Story />
        </div>
      </I18nProvider>
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
    error: {
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
  tags: ['component-test'],
  render: args => <RangeCalendar {...args} />,
});

Basic.test(
  'Selects a date range by clicking start and end',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      defaultValue: {
        start: new CalendarDate(2019, 6, 5),
        end: new CalendarDate(2019, 6, 5),
      },
      onChange: fn(),
    },
  },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText(/Monday, June 10, 2019/i));
    await userEvent.click(canvas.getByLabelText(/Saturday, June 15, 2019/i));

    await expect(args.onChange).toHaveBeenCalled();
    const lastCall = (args.onChange as ReturnType<typeof fn>).mock.calls.at(
      -1
    )?.[0];
    await expect(lastCall.start).toEqual(new CalendarDate(2019, 6, 10));
    await expect(lastCall.end).toEqual(new CalendarDate(2019, 6, 15));
  }
);

Basic.test(
  'Opens and closes the month dropdown',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await step('month dropdown is closed initially', async () => {
      await expect(
        canvas.queryByRole('listbox', { name: 'month' })
      ).not.toBeInTheDocument();
    });

    await step('opens when the month button is clicked', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Aug' }));
      await expect(
        canvas.getByRole('listbox', { name: 'month' })
      ).toBeInTheDocument();
    });

    await step('closes after selecting an option', async () => {
      const monthOptions = canvas.getByRole('listbox', {
        name: 'month',
      });
      const options = within(monthOptions).getAllByRole('option');
      await userEvent.click(options[2]);

      await expect(
        canvas.queryByRole('listbox', { name: 'month' })
      ).not.toBeInTheDocument();
    });
  }
);

Basic.test('Opens the year dropdown', async ({ canvas, userEvent, step }) => {
  await step('year dropdown is closed initially', async () => {
    await expect(
      canvas.queryByRole('listbox', { name: 'year' })
    ).not.toBeInTheDocument();
  });

  await step('opens when the year button is clicked', async () => {
    await userEvent.click(canvas.getByRole('button', { name: '2025' }));
    await expect(
      canvas.getByRole('listbox', { name: 'year' })
    ).toBeInTheDocument();
  });
});

Basic.test(
  'year picker is clamped to minValue/maxValue',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      minValue: new CalendarDate(2025, 1, 1),
      maxValue: new CalendarDate(2027, 12, 31),
      defaultValue: {
        start: new CalendarDate(2025, 6, 5),
        end: new CalendarDate(2025, 6, 10),
      },
    },
  },
  async ({ canvas, userEvent, step }) => {
    await step('open the year dropdown', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '2025' }));
    });

    await step('only in-range years are rendered', async () => {
      const years = within(canvas.getByRole('listbox', { name: 'year' }))
        .getAllByRole('option')
        .map(option => option.textContent);

      await expect(years).toEqual(['2025', '2026', '2027']);
      await expect(canvas.queryByText('2024')).not.toBeInTheDocument();
      await expect(canvas.queryByText('2028')).not.toBeInTheDocument();
    });
  }
);

Basic.test(
  'Commits a month selection via touch',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const tap = (target: Element) =>
      userEvent.pointer([{ keys: '[TouchA>]', target }, { keys: '[/TouchA]' }]);

    await step('opens the month dropdown via touch', async () => {
      await tap(canvas.getByRole('button', { name: 'Aug' }));
      await expect(
        canvas.getByRole('listbox', { name: 'month' })
      ).toBeInTheDocument();
    });

    await step('commits a month selection via touch', async () => {
      const monthOptions = canvas.getByRole('listbox', {
        name: 'month',
      });
      const march = within(monthOptions).getByRole('option', { name: /Mar/i });

      await tap(march);

      // Dropdown closes and the grid switches to the tapped month.
      await expect(
        canvas.queryByRole('listbox', { name: 'month' })
      ).not.toBeInTheDocument();
      await expect(
        canvas.getByRole('button', { name: 'Mar' })
      ).toBeInTheDocument();
    });
  }
);

export const Disabled = Basic.extend({
  args: {
    disabled: true,
  },
});

export const ReadOnly = Basic.extend({
  tags: ['component-test'],
  args: {
    readOnly: true,
    onChange: fn(),
  },
});

ReadOnly.test(
  'Does not commit a selection when read only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      defaultValue: {
        start: new CalendarDate(2019, 6, 5),
        end: new CalendarDate(2019, 6, 10),
      },
    },
  },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText(/Saturday, June 15, 2019/i));

    await expect(args.onChange).not.toHaveBeenCalled();
  }
);

export const WithErrorMessage = meta.story({
  ...Basic.input,
  args: {
    error: true,
    errorMessage: 'Please select a valid date range.',
  },
});

export const WithDescription = Basic.extend({
  args: {
    description: 'Pick a start and end date for your reservation.',
  },
});

export const Unavailable = meta.story({
  tags: ['component-test'],
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

Unavailable.test(
  'Marks weekend dates as unavailable',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const cells = canvas.getAllByRole('gridcell');
    const unavailable = cells.find(
      cell => cell.getAttribute('aria-disabled') === 'true'
    );

    await expect(unavailable).toBeDefined();
  }
);

export const NonContiguous = meta.story({
  args: {
    allowsNonContiguousRanges: true,
  },
  render: args => {
    const { locale } = useLocale();
    const [value, setValue] = useState<RangeValue<DateValue> | null>({
      start: new CalendarDate(2025, 8, 4),
      end: new CalendarDate(2025, 8, 15),
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
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: {
      start: new CalendarDate(2025, 2, 15),
      end: new CalendarDate(2025, 3, 5),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

TwoMonths.test(
  'Navigates forward and back across two visible months',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      defaultValue: {
        start: new CalendarDate(2025, 1, 15),
        end: new CalendarDate(2025, 1, 20),
      },
    },
  },
  async ({ canvas, userEvent, step }) => {
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
  }
);

TwoMonths.test(
  'Selects a range spanning two visible months',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      onChange: fn(),
    },
  },
  async ({ args, canvas, userEvent }) => {
    const grids = canvas.getAllByRole('grid');
    const startCell = within(grids[0]).getByLabelText(
      /Thursday, February 20, 2025/i
    );
    const endCell = within(grids[1]).getByLabelText(/Monday, March 10, 2025/i);

    await userEvent.click(startCell);
    await userEvent.click(endCell);

    await expect(args.onChange).toHaveBeenCalled();
    const lastCall = (args.onChange as ReturnType<typeof fn>).mock.calls.at(
      -1
    )?.[0];
    await expect(lastCall.start).toEqual(new CalendarDate(2025, 2, 20));
    await expect(lastCall.end).toEqual(new CalendarDate(2025, 3, 10));
  }
);

export const ThreeMonths = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 3 },
    defaultValue: {
      start: new CalendarDate(2025, 5, 20),
      end: new CalendarDate(2025, 7, 10),
    },
  },
  render: args => <RangeCalendar {...args} />,
});

// Regression (DST-1412): at full width each month's date table must fill its
// flex-1 column. It previously rendered narrower than the column, leaving empty
// space that the month header floated over.
ThreeMonths.test(
  'Fills each month column at full width',
  {
    args: { width: 'full' },
  },
  async ({ canvas }) => {
    const grids = canvas.getAllByRole('grid');
    await expect(grids).toHaveLength(3);

    for (const grid of grids) {
      // The grid table sits directly inside its `calendarMonth` flex column.
      const column = grid.parentElement as HTMLElement;
      const gridWidth = grid.getBoundingClientRect().width;
      const columnWidth = column.getBoundingClientRect().width;

      await expect(gridWidth).toBeGreaterThan(0);
      // The date table spans the full width of its column (no empty gap).
      await expect(Math.abs(columnWidth - gridWidth)).toBeLessThanOrEqual(1);
    }
  }
);

export const TwoMonthsMobile = meta.story({
  globals: {
    viewport: { value: 'extraSmallScreen' },
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

export const ThreeMonthsMobile = meta.story({
  globals: {
    viewport: { value: 'extraSmallScreen' },
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
