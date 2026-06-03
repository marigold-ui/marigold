import { CalendarDate, DateFormatter } from '@internationalized/date';
import { useState } from 'react';
import { DateValue, I18nProvider } from 'react-aria-components';
import { expect, fn, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Key } from '@react-types/shared';
import { Stack } from '../Stack/Stack';
import { Tag } from '../TagGroup/Tag';
import { Calendar } from './Calendar';

const meta = preview.meta({
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
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
  args: {
    defaultValue: new CalendarDate(2025, 8, 7),
  },
});

export const Basic = meta.story({
  render: args => <Calendar {...args} data-testid="selectedDate" />,
});

export const Controlled = meta.story({
  render: args => {
    const [value, setValue] = useState<DateValue>(new CalendarDate(2019, 6, 5));
    return (
      <>
        <Calendar {...args} value={value} onChange={setValue} autoFocus />
        <pre style={{ marginTop: '1rem' }} data-testid="selectedDate">
          <strong>DateField Value:</strong>
          {'Day:' + value.day + ' Month:' + value.month + ' Year:' + value.year}
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

export const MonthYearSelection = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    defaultValue: new CalendarDate(2019, 6, 5),
    onChange: fn(),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('year'));
    await userEvent.click(canvas.getByText('2018'));

    await userEvent.click(canvas.getByTestId('month'));
    await userEvent.click(canvas.getByText('Feb'));

    await expect(canvas.getByTestId('year')).toHaveTextContent('2018');
    await expect(canvas.getByTestId('month')).toHaveTextContent('Feb');
  },
});

export const ConstrainedDateRange = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 5, 5),
    maxValue: new CalendarDate(2020, 5, 20),
    onChange: fn(),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const monthButton = canvas.getByTestId('month');
    const yearButton = canvas.getByTestId('year');

    await userEvent.click(monthButton);
    await userEvent.click(yearButton);

    await expect(monthButton).toBeDisabled();
    await expect(yearButton).toBeDisabled();

    await expect(monthButton).toHaveAttribute(
      'aria-label',
      'May not selectable'
    );
    await expect(yearButton).toHaveAttribute(
      'aria-label',
      '2020 not selectable'
    );
  },
});

export const MonthSelectionAccessibility = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    defaultValue: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Jan' }));

    const monthOptions = canvas.getAllByRole('option');
    const janOption = monthOptions.find(opt => opt.textContent === 'Jan');
    const febOption = monthOptions.find(opt => opt.textContent === 'Feb');
    const marOption = monthOptions.find(opt => opt.textContent === 'Mar');

    // Selection/disabled state is announced via RAC's `aria-selected` /
    // `aria-disabled`; the accessible name stays the plain month name (no suffix).
    await expect(janOption).toHaveAttribute('aria-selected', 'true');
    await expect(janOption).toHaveAccessibleName('Jan');

    await expect(febOption).toHaveAccessibleName('Feb');
    await expect(febOption).not.toHaveAttribute('aria-disabled');

    await expect(marOption).toHaveAccessibleName('Mar');
    await expect(marOption).toHaveAttribute('aria-disabled', 'true');
  },
});

export const MonthSelectionWithMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    defaultValue: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Jan' }));

    await userEvent.click(canvas.getByText('Mar'));
    await userEvent.click(canvas.getByText('Dec'));

    await userEvent.click(canvas.getByText('Feb'));

    await expect(
      canvas.queryByRole('listbox', { name: 'month' })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Feb' })
    ).toBeInTheDocument();
  },
});

export const YearSelectionWithMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2021, 2, 15),
    defaultValue: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '2020' }));

    // Only in-range years are rendered.
    const years = within(canvas.getByRole('listbox', { name: 'year' }))
      .getAllByRole('option')
      .map(option => option.textContent);
    await expect(years).toEqual(['2020', '2021']);
    await expect(canvas.queryByText('2019')).not.toBeInTheDocument();
    await expect(canvas.queryByText('2022')).not.toBeInTheDocument();

    // The focused year is marked selected.
    const focusedYear = within(
      canvas.getByRole('listbox', { name: 'year' })
    ).getByText('2020');
    await expect(focusedYear.closest('[role="option"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await userEvent.click(canvas.getByText('2021'));

    await expect(
      canvas.queryByRole('listbox', { name: 'year' })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2021' })
    ).toBeInTheDocument();
  },
});

export const YearSelectionWithMinOnly = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2025, 1, 1),
    defaultValue: new CalendarDate(2025, 6, 15),
  },
});

YearSelectionWithMinOnly.test(
  'clamps the year list at minValue and keeps a forward window',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2025' }));

    const years = within(canvas.getByRole('listbox', { name: 'year' }))
      .getAllByRole('option')
      .map(option => option.textContent);

    await expect(years[0]).toBe('2025');
    await expect(years.length).toBeGreaterThan(1);
    await expect(canvas.queryByText('2024')).not.toBeInTheDocument();
  }
);

export const YearSelectionWithMaxOnly = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    maxValue: new CalendarDate(2025, 12, 31),
    defaultValue: new CalendarDate(2023, 6, 15),
  },
});

YearSelectionWithMaxOnly.test(
  'keeps the maxValue year reachable and renders no later years',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2023' }));

    const years = within(canvas.getByRole('listbox', { name: 'year' }))
      .getAllByRole('option')
      .map(option => option.textContent);

    await expect(years[years.length - 1]).toBe('2025');
    await expect(years.length).toBeGreaterThan(1);
    await expect(canvas.queryByText('2026')).not.toBeInTheDocument();

    // The max year can actually be selected from the dropdown.
    await userEvent.click(canvas.getByText('2025'));
    await expect(
      canvas.queryByRole('listbox', { name: 'year' })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2025' })
    ).toBeInTheDocument();
  }
);

export const LeapYearSelection = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    defaultValue: new CalendarDate(2024, 2, 29),
  },
});

// Switching from a Feb 29 focus to a non-leap year must clamp to Feb 28.
LeapYearSelection.test(
  'selecting a non-leap year from a Feb 29 focus resolves cleanly',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2024' }));
    await userEvent.click(canvas.getByText('2023'));

    await expect(
      canvas.queryByRole('listbox', { name: 'year' })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2023' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Feb' })
    ).toBeInTheDocument();
  }
);

export const YearPickerScrollsToFocused = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    // Unbounded: focused year ±20, so it sits mid-list, taller than the viewport.
    defaultValue: new CalendarDate(2025, 8, 7),
  },
});

// The focused year must be centered when the picker opens.
YearPickerScrollsToFocused.test(
  'opens with the focused year centered',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2025' }));

    const listbox = canvas.getByRole('listbox', { name: 'year' });
    const focused = within(listbox)
      .getByText('2025')
      .closest('[role="option"]');

    await waitFor(() => {
      const listRect = listbox.getBoundingClientRect();
      const itemRect = focused!.getBoundingClientRect();
      const listCenter = listRect.top + listRect.height / 2;
      const itemCenter = itemRect.top + itemRect.height / 2;

      // Selected year sits near the vertical center of the list, not at an edge.
      expect(listbox.scrollTop).toBeGreaterThan(0);
      expect(Math.abs(itemCenter - listCenter)).toBeLessThan(itemRect.height);
    });
  }
);

export const TwoMonths = meta.story({
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 2, 15),
  },
  render: args => <Calendar {...args} />,
});

export const ThreeMonths = meta.story({
  args: {
    visibleDuration: { months: 3 },
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

// Regression (DST-1412): the third month previously overflowed when the wrapper was constrained to 50% of its parent.
export const ThreeMonthsHalfWidth = meta.story({
  args: {
    visibleDuration: { months: 3 },
    width: '1/2',
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

// Regression (DST-1412): header text previously floated over empty space because the date table didn't fill its flex-1 column.
export const ThreeMonthsFullWidth = meta.story({
  args: {
    visibleDuration: { months: 3 },
    width: 'full',
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

export const MultiMonthNavigation = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 1, 15),
    onChange: fn(),
  },
  render: args => <Calendar {...args} />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const nextButtons = canvas.getAllByRole('button', { name: /next/i });
    await userEvent.click(nextButtons[0]);

    await expect(canvas.getByText('March 2025')).toBeInTheDocument();
    await expect(canvas.getByText('April 2025')).toBeInTheDocument();

    const prevButtons = canvas.getAllByRole('button', { name: /previous/i });
    await userEvent.click(prevButtons[0]);

    await expect(canvas.getByText('January 2025')).toBeInTheDocument();
    await expect(canvas.getByText('February 2025')).toBeInTheDocument();
  },
});

export const MultiMonthSinglePageBehavior = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    pageBehavior: 'single',
    defaultValue: new CalendarDate(2025, 1, 15),
  },
  render: args => <Calendar {...args} />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const nextButtons = canvas.getAllByRole('button', { name: /next/i });
    await userEvent.click(nextButtons[0]);

    await expect(canvas.getByText('February 2025')).toBeInTheDocument();
    await expect(canvas.getByText('March 2025')).toBeInTheDocument();
  },
});

interface SelectedDate {
  id: string;
  date: DateValue;
}

export const MultipleSelection = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 2, 15),
    onChange: fn(),
  },
  render: args => {
    const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);

    const formatter = new DateFormatter('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const handleDateSelect = (date: DateValue | null) => {
      if (!date) return;

      args.onChange?.(date);

      const dateId = `${date.year}-${date.month}-${date.day}`;
      const exists = selectedDates.some(d => d.id === dateId);

      if (exists) {
        setSelectedDates(prev => prev.filter(d => d.id !== dateId));
      } else {
        setSelectedDates(prev => [...prev, { id: dateId, date }]);
      }
    };

    const handleRemove = (keys: Set<Key>) => {
      setSelectedDates(prev => prev.filter(d => !keys.has(d.id)));
    };

    return (
      <I18nProvider locale="en-US">
        <Stack space={4}>
          <Calendar {...args} onChange={handleDateSelect} />
          <Tag.Group
            label="Selected Dates"
            items={selectedDates}
            onRemove={handleRemove}
          >
            {(item: SelectedDate) => (
              <Tag id={item.id}>
                {formatter.format(item.date.toDate('UTC'))}
              </Tag>
            )}
          </Tag.Group>
        </Stack>
      </I18nProvider>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const grids = canvas.getAllByRole('grid');
    const firstGrid = within(grids[0]);
    const secondGrid = within(grids[1]);

    const day10Feb = firstGrid.getByRole('button', {
      name: /Monday, February 10, 2025/i,
    });
    day10Feb.focus();
    await userEvent.keyboard('{Enter}');

    const day20Feb = firstGrid.getByRole('button', {
      name: /Thursday, February 20, 2025/i,
    });
    day20Feb.focus();
    await userEvent.keyboard('{Enter}');

    const day5Mar = secondGrid.getByRole('button', {
      name: /Wednesday, March 5, 2025/i,
    });
    day5Mar.focus();
    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(canvas.getByText('Feb 10, 2025')).toBeInTheDocument()
    );
    await expect(canvas.getByText('Feb 20, 2025')).toBeInTheDocument();
    await expect(canvas.getByText('Mar 5, 2025')).toBeInTheDocument();

    const feb10Tag = canvas.getByText('Feb 10, 2025');
    await userEvent.click(within(feb10Tag).getByRole('button'));

    await waitFor(() =>
      expect(canvas.queryByText('Feb 10, 2025')).not.toBeInTheDocument()
    );
    await expect(canvas.getByText('Feb 20, 2025')).toBeInTheDocument();
    await expect(canvas.getByText('Mar 5, 2025')).toBeInTheDocument();
  },
});
