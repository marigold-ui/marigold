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
import { theme } from '../../../../themes/theme-rui/src/index.js';
import { Stack } from '../Stack/Stack';
import { DatePicker } from './DatePicker';

const smallScreenQuery = `(width < ${theme.screens?.sm})`;

const meta = preview.meta({
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

export const Basic = meta.story({
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
});

export const Controlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [value, setValue] = useState(
      new CalendarDate(2025, 8, 7) as DateValue
    );

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
});

export const MinMax = meta.story({
  args: {
    open: true,
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        {...args}
        label="Date Picker"
        description="Determine min and max value for date picker"
        errorMessage="This is an error"
        minValue={new CalendarDate(2019, 6, 5)}
        maxValue={new CalendarDate(2019, 6, 20)}
      />
    </I18nProvider>
  ),
});

export const UnavailableDate = meta.story({
  args: {
    open: true,
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        label="Date Picker"
        defaultValue={new CalendarDate(2019, 6, 1)}
        dateUnavailable={date => date.day !== 1}
        {...args}
      />
    </I18nProvider>
  ),
});

export const WithDefaultValue = meta.story({
  render: args => (
    <I18nProvider locale="en-US">
      <DatePicker
        label="Date"
        defaultValue={new CalendarDate(2019, 2, 3)}
        {...args}
      />
    </I18nProvider>
  ),
});

export const WithError = meta.story({
  args: {
    error: true,
    errorMessage: 'Whoopsie',
    description: 'Some helpful text',
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker label="A Label" {...args} />
    </I18nProvider>
  ),
});

export const Mobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        label="Pick a date"
        defaultValue={new CalendarDate(2025, 8, 1)}
        {...args}
      />
    </I18nProvider>
  ),
});

Mobile.test(
  'Open Tray',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    const trigger = await canvas.findByRole('button');

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
);

Mobile.test(
  'Mobile DatePicker interaction',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step, userEvent }) => {
    // Mock releasePointerCapture to handle invalid pointer IDs in Firefox tests
    const releasePointerCaptureMock = spyOn(
      Element.prototype,
      'releasePointerCapture'
    ).mockImplementation(() => {});

    const trigger = canvas.getByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    await step('Verify tray content is visible', async () => {
      const dialog = await canvas.findByRole('dialog');

      await waitFor(() => expect(dialog).toBeVisible());
    });

    await step('Verify calendar is visible', async () => {
      const calendar = await canvas.findByRole('grid');

      await waitFor(() => expect(calendar).toBeVisible());
    });

    await step('Select a date from calendar', async () => {
      const dateButton = await canvas.findByRole('button', {
        name: /15\. August/i,
      });

      await userEvent.click(dateButton);
    });

    await step('Close tray with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    await step('Verify date is displayed in input', async () => {
      const input = canvas.getByRole('group');

      await waitFor(() => expect(input).toHaveTextContent('15'));
    });

    releasePointerCaptureMock.mockRestore();
  }
);

Mobile.test(
  'Mobile DatePicker keyboard navigation',
  async ({ canvas, step, userEvent }) => {
    const trigger = canvas.getByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);

      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Verify calendar grid is visible and focused', async () => {
      const calendar = await canvas.findByRole('grid');

      await waitFor(() => {
        expect(calendar).toBeVisible();
        const focusedCell = calendar.querySelector('[tabindex="0"]');
        expect(focusedCell).not.toBeNull();
      });

      // Ensure focus is on the calendar cell
      const focusedCell = calendar.querySelector(
        '[tabindex="0"]'
      ) as HTMLElement;
      focusedCell.focus();
    });

    await step('Navigate calendar with arrow keys', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
    });

    await step('Select date with Enter key', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('Close tray with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  }
);

export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Event date',
    onChange: fn(),
  },
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <I18nProvider locale="en-US">
      <DatePicker {...args} presets={['today', 'tomorrow']} />
    </I18nProvider>
  ),
});

Presets.test(
  'selecting a preset applies the date and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    const dialog = await canvas.findByRole('dialog');
    const option = within(dialog).getByRole('option', { name: 'Tomorrow' });

    await userEvent.click(option);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(
      isSameDay(date, today(getLocalTimeZone()).add({ days: 1 }))
    ).toBe(true);
    await expect(dialog).toBeVisible();
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);

// Inside the small-screen picker tray, "Quick selection" swaps the grid for
// the preset list in place. Fixed preset values (instead of the relative
// built-ins) keep the resolved-date sublabels and the visible month stable,
// so Chromatic can snapshot the open preset view without daily diffs.
export const PresetsMobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  // Chromatic ignores the Storybook viewport global and captures at its
  // 1200px default, where the small-screen UI (and this story's play)
  // doesn't exist. Pin its capture to phone width.
  parameters: { chromatic: { disableSnapshot: true, viewports: [320] } },
  args: {
    label: 'Event date',
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DatePicker
        {...args}
        defaultValue={new CalendarDate(2027, 3, 2)}
        presets={[
          { label: 'Kickoff', value: new CalendarDate(2027, 3, 2) },
          { label: 'Review', value: new CalendarDate(2027, 3, 16) },
          { label: 'Release', value: new CalendarDate(2027, 3, 30) },
        ]}
      />
    </I18nProvider>
  ),
});

PresetsMobile.test(
  'switches the tray to the quick selection view',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    const tray = await canvas.findByRole('dialog');
    await within(tray).findByRole('grid');

    await userEvent.click(
      within(tray).getByRole('button', { name: 'Quick selection' })
    );

    // The preset list replaces the grid inside the same tray, topped by a
    // Back row.
    await expect(
      within(tray).getByRole('listbox', { name: 'Quick selection' })
    ).toBeVisible();
    await expect(
      within(tray).getByRole('button', { name: 'Back' })
    ).toBeVisible();
    await expect(within(tray).queryByRole('grid')).not.toBeInTheDocument();
    // The preset matching the picker value shows as selected.
    await expect(
      within(tray).getByRole('option', { name: 'Kickoff' })
    ).toHaveAttribute('aria-selected', 'true');
  }
);
