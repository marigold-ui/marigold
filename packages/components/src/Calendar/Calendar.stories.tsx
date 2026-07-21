import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  isSameDay,
  today,
} from '@internationalized/date';
import { useState } from 'react';
import { DateValue } from 'react-aria-components/Calendar';
import { I18nProvider } from 'react-aria-components/I18nProvider';
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
      <I18nProvider locale="en-US">
        <div id="storybook-root">
          <Story />
        </div>
      </I18nProvider>
    ),
  ],
  parameters: {
    surface: false,
  },
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
  tags: ['component-test'],
  render: args => <Calendar {...args} data-testid="selectedDate" />,
});

Basic.test(
  'Selects a month and year from the dropdowns',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      defaultValue: new CalendarDate(2019, 6, 5),
      onChange: fn(),
    },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2019' }));
    await userEvent.click(canvas.getByText('2018'));

    await userEvent.click(canvas.getByRole('button', { name: 'Jun' }));
    await userEvent.click(canvas.getByText('Feb'));

    await expect(
      canvas.getByRole('button', { name: '2018' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Feb' })
    ).toBeInTheDocument();
  }
);

Basic.test(
  'Disables the month and year pickers outside the allowed range',
  {
    args: {
      minValue: new CalendarDate(2020, 5, 5),
      maxValue: new CalendarDate(2020, 5, 20),
      onChange: fn(),
    },
  },
  async ({ canvas, userEvent }) => {
    // Only May 2020 is in range, so neither picker can be changed.
    const monthButton = canvas.getByRole('button', {
      name: 'May not selectable',
    });
    const yearButton = canvas.getByRole('button', {
      name: '2020 not selectable',
    });

    await userEvent.click(monthButton);
    await userEvent.click(yearButton);

    await expect(monthButton).toBeDisabled();
    await expect(yearButton).toBeDisabled();
  }
);

Basic.test(
  'Skips out-of-range months and selects an in-range one',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      minValue: new CalendarDate(2020, 1, 15),
      maxValue: new CalendarDate(2020, 2, 15),
      defaultValue: new CalendarDate(2020, 1, 30),
    },
  },
  async ({ canvas, userEvent }) => {
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
  }
);

Basic.test(
  'Lists only in-range years and selects one',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      minValue: new CalendarDate(2020, 1, 15),
      maxValue: new CalendarDate(2021, 2, 15),
      defaultValue: new CalendarDate(2020, 1, 30),
    },
  },
  async ({ canvas, userEvent }) => {
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
  }
);

Basic.test(
  'Clamps the year list at minValue and keeps a forward window',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      minValue: new CalendarDate(2025, 1, 1),
      defaultValue: new CalendarDate(2025, 6, 15),
    },
  },
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

Basic.test(
  'Keeps the maxValue year reachable and renders no later years',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      maxValue: new CalendarDate(2025, 12, 31),
      defaultValue: new CalendarDate(2023, 6, 15),
    },
  },
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

// A wide bounded range must reach both ends. `CalendarYearPicker` centers a
// fixed window on the focused year and clamps it, so `visibleYears` has to be
// large enough to span the whole range, not just a handful of years.
Basic.test(
  'Reaches both ends of a wide bounded year range',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      minValue: new CalendarDate(1900, 1, 1),
      maxValue: new CalendarDate(2100, 12, 31),
      defaultValue: new CalendarDate(2000, 6, 15),
    },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '2000' }));

    const years = within(canvas.getByRole('listbox', { name: 'year' }))
      .getAllByRole('option')
      .map(option => option.textContent);

    await expect(years[0]).toBe('1900');
    await expect(years[years.length - 1]).toBe('2100');
    await expect(canvas.queryByText('1899')).not.toBeInTheDocument();
    await expect(canvas.queryByText('2101')).not.toBeInTheDocument();
  }
);

// Switching from a Feb 29 focus to a non-leap year must clamp to Feb 28.
Basic.test(
  'Selecting a non-leap year from a Feb 29 focus resolves cleanly',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      defaultValue: new CalendarDate(2024, 2, 29),
    },
  },
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

Basic.test(
  'Opens with the focused year centered',
  {
    args: {
      // Unbounded: focused year ±20, so it sits mid-list, taller than the viewport.
      defaultValue: new CalendarDate(2025, 8, 7),
    },
  },
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

Basic.test(
  'Opens with a focused month',
  {
    args: {
      defaultValue: new CalendarDate(2025, 8, 7),
    },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Aug' }));

    const listbox = canvas.getByRole('listbox', { name: 'month' });
    const focused = within(listbox).getByText('Aug').closest('[role="option"]');

    expect(focused).toHaveFocus();
  }
);

Basic.test(
  'Announces selected and disabled months to assistive tech',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      minValue: new CalendarDate(2020, 1, 15),
      maxValue: new CalendarDate(2020, 2, 15),
      defaultValue: new CalendarDate(2020, 1, 30),
    },
  },
  async ({ canvas, userEvent }) => {
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
  }
);

export const Controlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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

export const Disabled = Basic.extend({
  args: {
    disabled: true,
  },
});

export const ReadOnly = Basic.extend({
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    readOnly: true,
  },
});

export const TwoMonths = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 2, 15),
  },
  render: args => <Calendar {...args} />,
});

TwoMonths.test(
  'Navigates forward and back across visible months',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      visibleDuration: { months: 2 },
      defaultValue: new CalendarDate(2025, 1, 15),
      onChange: fn(),
    },
  },
  async ({ canvas, userEvent }) => {
    const nextButtons = canvas.getAllByRole('button', { name: /next/i });
    await userEvent.click(nextButtons[0]);

    await expect(canvas.getByText('March 2025')).toBeInTheDocument();
    await expect(canvas.getByText('April 2025')).toBeInTheDocument();

    const prevButtons = canvas.getAllByRole('button', { name: /previous/i });
    await userEvent.click(prevButtons[0]);

    await expect(canvas.getByText('January 2025')).toBeInTheDocument();
    await expect(canvas.getByText('February 2025')).toBeInTheDocument();
  }
);

TwoMonths.test(
  'Advances one month at a time when pageBehavior is single',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    tags: ['component-test'],
    args: {
      visibleDuration: { months: 2 },
      pageBehavior: 'single',
      defaultValue: new CalendarDate(2025, 1, 15),
    },
  },
  async ({ canvas, userEvent }) => {
    const nextButtons = canvas.getAllByRole('button', { name: /next/i });
    await userEvent.click(nextButtons[0]);

    await expect(canvas.getByText('February 2025')).toBeInTheDocument();
    await expect(canvas.getByText('March 2025')).toBeInTheDocument();
  }
);

export const ThreeMonths = meta.story({
  args: {
    visibleDuration: { months: 3 },
    width: '1/2',
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

export const ThreeMonthsFullWidth = meta.story({
  args: {
    visibleDuration: { months: 3 },
    width: 'full',
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

interface SelectedDate {
  id: string;
  date: DateValue;
}

export const MultipleSelection = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
      <Stack space={4}>
        <Calendar {...args} onChange={handleDateSelect} />
        <Tag.Group
          label="Selected Dates"
          items={selectedDates}
          onRemove={handleRemove}
        >
          {(item: SelectedDate) => (
            <Tag id={item.id}>{formatter.format(item.date.toDate('UTC'))}</Tag>
          )}
        </Tag.Group>
      </Stack>
    );
  },
});

MultipleSelection.test(
  'Selects and removes multiple dates',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
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
  }
);

export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Event date',
    onChange: fn(),
    // A fixed month in the past keeps the Chromatic baseline off the moving
    // current month and its "today" cell.
    defaultValue: new CalendarDate(2026, 3, 12),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar
        {...args}
        presets={[
          'today',
          'yesterday',
          'tomorrow',
          { label: 'Kickoff', value: new CalendarDate(2026, 8, 1) },
        ]}
      />
    </I18nProvider>
  ),
});

Presets.test(
  'presets render as a labeled listbox',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const listbox = canvas.getByRole('listbox', { name: 'Quick selection' });
    const option = canvas.getByRole('option', { name: 'Kickoff' });

    await expect(listbox).toBeVisible();
    await expect(option).toBeVisible();
  }
);

Presets.test(
  'selecting a preset sets the date and marks the option selected',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ args, canvas, userEvent }) => {
    const option = canvas.getByRole('option', { name: 'Tomorrow' });

    await userEvent.click(option);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(
      isSameDay(date, today(getLocalTimeZone()).add({ days: 1 }))
    ).toBe(true);
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);

Presets.test(
  'selecting a preset jumps the visible month to its date',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('option', { name: 'Kickoff' }));

    await expect(
      canvas.getByRole('button', { name: 'Aug' })
    ).toBeInTheDocument();
  }
);

export const PresetsWithMinValue = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    'aria-label': 'Event date',
    minValue: today(getLocalTimeZone()),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar {...args} presets={['yesterday', 'today']} />
    </I18nProvider>
  ),
});

PresetsWithMinValue.test(
  'a preset outside minValue/maxValue is disabled',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const yesterdayOption = canvas.getByRole('option', {
      name: 'Yesterday',
    });
    const todayOption = canvas.getByRole('option', { name: 'Today' });

    await expect(yesterdayOption).toHaveAttribute('aria-disabled', 'true');
    await expect(todayOption).not.toHaveAttribute('aria-disabled');
  }
);

// Small screens swap the rail for a "Quick selection" row that opens the
// preset list in a tray. Fixed preset values (instead of the relative
// built-ins) keep the resolved-date sublabels and the visible month stable,
// so Chromatic can snapshot the open tray without daily diffs.
export const PresetsMobile = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true, viewports: [320] } },
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  args: {
    'aria-label': 'Event date',
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar
        {...args}
        defaultValue={new CalendarDate(2027, 1, 5)}
        presets={[
          { label: 'Kickoff', value: new CalendarDate(2027, 1, 5) },
          { label: 'Review', value: new CalendarDate(2027, 1, 19) },
          { label: 'Release', value: new CalendarDate(2027, 2, 2) },
        ]}
      />
    </I18nProvider>
  ),
});

PresetsMobile.test(
  'opens the quick selection tray',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Quick selection' })
    );
    const tray = await canvas.findByRole('dialog');

    await expect(
      within(tray).getByRole('listbox', { name: 'Quick selection' })
    ).toBeVisible();
    // The preset matching the calendar value shows as selected.
    await expect(
      within(tray).getByRole('option', { name: 'Kickoff' })
    ).toHaveAttribute('aria-selected', 'true');
  }
);
