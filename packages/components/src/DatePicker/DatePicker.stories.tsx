import { CalendarDate } from '@internationalized/date';
import { useState } from 'react';
import { DateValue } from 'react-aria-components';
import { expect, spyOn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { I18nProvider } from '@react-aria/i18n';
import { Stack } from '../Stack/Stack';
import { DatePicker } from './DatePicker';

const meta = preview.meta({
  title: 'Components/DatePicker',
  component: DatePicker,
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
});

export const Basic: any = meta.story({
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

export const Controlled: any = meta.story({
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

export const MinMax: any = meta.story({
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
});

export const UnavailableDate: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker
        label="Date Picker"
        dateUnavailable={date => date.toDate('Europe/Berlin').getDate() !== 1}
        {...args}
      />
    </I18nProvider>
  ),
});

export const Mobile: any = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'mobile1' },
  },
  render: args => (
    <I18nProvider locale="de-DE">
      <DatePicker label="Pick a date" {...args} />
    </I18nProvider>
  ),
});

Mobile.test(
  'Mobile DatePicker interaction',
  async ({ canvas, step, userEvent }: any) => {
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

      expect(dialog).toBeVisible();
    });

    await step('Verify calendar is visible', async () => {
      const calendar = await canvas.findByRole('grid');

      expect(calendar).toBeVisible();
    });

    await step('Select a date from calendar', async () => {
      const dateButton = await canvas.findByRole('button', { name: /15/i });

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
  async ({ canvas, step, userEvent }: any) => {
    const trigger = canvas.getByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);

      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Verify calendar grid is visible', async () => {
      const calendar = await canvas.findByRole('grid');

      expect(calendar).toBeVisible();
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
