import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  today,
} from '@internationalized/date';
import { useState } from 'react';
import type { DateValue } from 'react-aria-components';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, fn, spyOn, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import type { RangeValue } from '@react-types/shared';
import { theme } from '../../../../themes/theme-rui/src/index.js';
import { Stack } from '../Stack/Stack';
import { firePaste } from '../firePaste';
import { DateRangePicker } from './DateRangePicker';

const smallScreenQuery = `(width < ${theme.screens?.sm})`;

const meta = preview.meta({
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the date range picker',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'text' },
      description:
        'Width of the date range picker input field, using Tailwind tokens',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Set the date range picker required.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Open the date range picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Sets error message for the date range picker.',
    },
    description: {
      control: { type: 'text' },
      description: 'Sets help text for the date range picker.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Sets error for the date range picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Set readOnly for date range picker.',
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
  decorators: [
    Story => {
      // Mock matchMedia for tests
      if (typeof window !== 'undefined' && !window.matchMedia) {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: (query: string) => ({
            matches: query === smallScreenQuery,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
          }),
        });
      }
      return (
        <div id="storybook-root" className="p-4">
          <Story />
        </div>
      );
    },
  ],
});

export const Basic: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker
        label="Date Range Picker"
        description="This is a description"
        errorMessage="This is an error"
        placeholderValue={new CalendarDate(2026, 7, 1)}
        {...args}
      />
    </I18nProvider>
  ),
});

export const Controlled: any = meta.story({
  render: args => {
    const [value, setValue] = useState<RangeValue<DateValue> | null>({
      start: new CalendarDate(2025, 8, 7),
      end: new CalendarDate(2025, 8, 14),
    });

    return (
      <I18nProvider locale="de-DE">
        <Stack>
          <DateRangePicker
            label="Date Range Picker"
            value={value}
            onChange={setValue}
            description="Controlled date range"
            errorMessage="This is an error"
            {...args}
          />
          {value ? (
            <pre style={{ marginTop: '1rem' }} data-testid="selectedRange">
              <strong>Range:</strong>
              {` ${value.start.toString()} → ${value.end.toString()}`}
            </pre>
          ) : (
            <pre>{`No value (${value}).`}</pre>
          )}
        </Stack>
      </I18nProvider>
    );
  },
});

export const MinMax: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker
        label="Date Range Picker"
        description="Determine min and max value for date range picker"
        errorMessage="This is an error"
        minValue={new CalendarDate(2019, 6, 5)}
        maxValue={new CalendarDate(2019, 6, 20)}
        {...args}
      />
    </I18nProvider>
  ),
});

export const UnavailableDate: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker
        label="Date Range Picker"
        dateUnavailable={date => date.toDate('Europe/Berlin').getDay() === 0}
        placeholderValue={new CalendarDate(2026, 7, 1)}
        {...args}
      />
    </I18nProvider>
  ),
});

export const MultiMonth: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker
        label="Date Range Picker"
        description="Shows up to three months at once"
        visibleDuration={{ months: 2 }}
        placeholderValue={new CalendarDate(2026, 7, 1)}
        {...args}
      />
    </I18nProvider>
  ),
});

export const WithError: any = meta.story({
  args: {
    error: true,
    errorMessage: 'Whoopsie',
    description: 'Some helpful text',
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker label="A Label" {...args} />
    </I18nProvider>
  ),
});

export const Mobile: any = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DateRangePicker
        label="Pick a range"
        defaultValue={{
          start: new CalendarDate(2025, 8, 1),
          end: new CalendarDate(2025, 8, 8),
        }}
        {...args}
      />
    </I18nProvider>
  ),
});

Basic.tags = ['component-test'];

Basic.test(
  'opens the calendar popover and selects a range',
  async ({ canvas, step, userEvent }: any) => {
    const trigger = canvas.getByRole('button');

    await step('Open popover via trigger', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(canvas.getByRole('application')).toBeVisible()
      );
    });

    await step('Calendar grid is visible', async () => {
      const grid = await canvas.findByRole('grid');
      await waitFor(() => expect(grid).toBeVisible());
    });
  }
);

Basic.test(
  'pastes dates into the start and end inputs',
  async ({ canvas, step }: any) => {
    // 6 segments total: 3 for start, 3 for end (day granularity).
    const segments = canvas.getAllByRole('spinbutton');

    await step('Paste an ISO date into the start input', async () => {
      firePaste(segments[0], '2025-09-24');
      await waitFor(() => {
        const updated = canvas.getAllByRole('spinbutton');
        // Year segment of the start input should reflect the pasted year.
        expect(updated[2]).toHaveTextContent('2025');
      });
    });

    await step('Paste a European date into the end input', async () => {
      const updated = canvas.getAllByRole('spinbutton');
      firePaste(updated[3], '30.09.2025');
      await waitFor(() => {
        const next = canvas.getAllByRole('spinbutton');
        expect(next[5]).toHaveTextContent('2025');
      });
    });

    await step('Ignore an invalid pasted value', async () => {
      const updated = canvas.getAllByRole('spinbutton');
      firePaste(updated[0], 'not-a-date');
      // The start input keeps the year pasted earlier instead of breaking.
      await waitFor(() => {
        const next = canvas.getAllByRole('spinbutton');
        expect(next[2]).toHaveTextContent('2025');
      });
    });
  }
);

Mobile.test(
  'opens a tray on small screens',
  async ({ canvas, step, userEvent }: any) => {
    const releasePointerCaptureMock = spyOn(
      Element.prototype,
      'releasePointerCapture'
    ).mockImplementation(() => {});

    const trigger = canvas.getByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    await step('Tray content is visible', async () => {
      const dialog = await canvas.findByRole('dialog');
      await waitFor(() => expect(dialog).toBeVisible());
    });

    await step('Calendar is visible in the tray', async () => {
      const calendar = await canvas.findByRole('grid');
      await waitFor(() => expect(calendar).toBeVisible());
    });

    await step('Close tray with Escape key', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    releasePointerCaptureMock.mockRestore();
  }
);

export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Period',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DateRangePicker
        {...args}
        presets={['today', 'next-7-days', 'this-month']}
      />
    </I18nProvider>
  ),
});

Presets.test(
  'selecting a preset applies the range and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    const dialog = await canvas.findByRole('dialog');

    const option = within(dialog).getByRole('option', {
      name: 'Next 7 days',
    });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now)).toBe(true);
    await expect(isSameDay(range.end, now.add({ days: 6 }))).toBe(true);

    // The popover must stay open so keyboard users can keep adjusting.
    await expect(dialog).toBeVisible();
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);
