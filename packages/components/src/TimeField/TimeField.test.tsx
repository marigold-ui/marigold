import { parseTime } from '@internationalized/date';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { TimeField } from './TimeField';

const theme: Theme = {
  name: 'test',
  components: {
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-300',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(),
    },
    HelpText: {
      container: cva(),
      icon: cva(),
    },
    Input: {
      input: cva(), // leer lassen, wenn du's nicht brauchst
      icon: cva(),
      segment: cva('bg-white text-gray-700'),
      action: cva('p-3', {
        variants: {
          size: {
            small: 'p-1',
          },
        },
      }),
    },
    Field: cva(),
  },
};

const { render } = setup({ theme });

let onBlurSpy = vi.fn();
let onFocusChangeSpy = vi.fn();
let onFocusSpy = vi.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
});

test('renders TimeField with label and description', () => {
  render(<TimeField label="Time" description="Pick a time" />);
  expect(screen.getByText('Time')).toBeInTheDocument();
  expect(screen.getByText('Pick a time')).toBeInTheDocument();
});

test('shows error message instead of description', () => {
  render(
    <TimeField
      label="Time"
      description="Pick a time"
      error
      errorMessage="Invalid time"
    />
  );
  expect(screen.queryByText('Pick a time')).not.toBeInTheDocument();
  expect(screen.getByText('Invalid time')).toBeInTheDocument();
});

test('renders TimeField with default value and reacts to focus', async () => {
  render(
    <TimeField
      label="Time"
      defaultValue={parseTime('13:45')}
      onBlur={onBlurSpy}
      onFocus={onFocusSpy}
      onFocusChange={onFocusChangeSpy}
    />
  );

  const segments = screen.getAllByRole('spinbutton');
  expect(segments.length).toBeGreaterThanOrEqual(2); // hour and minute, maybe AM/PM
  expect(segments[0]).toHaveTextContent(/13|1/); // depending on hourCycle
  expect(segments[1]).toHaveTextContent('45');

  expect(onFocusSpy).not.toHaveBeenCalled();
  expect(onFocusChangeSpy).not.toHaveBeenCalled();
  expect(onBlurSpy).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(segments[0]).toHaveFocus();

  expect(onFocusSpy).toHaveBeenCalled();
  expect(onFocusChangeSpy).toHaveBeenCalled();
  expect(onBlurSpy).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(segments[1]).toHaveFocus();
});

test('supports variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <TimeField
        data-testid="time-field"
        label="Label"
        description="Description"
        variant="lime"
        size="small"
      />
    </ThemeProvider>
  );

  const label = screen.getByText('Label');
  expect(label.className).toMatchInlineSnapshot(
    `"text-lime-300 p-1 inline-flex w-[var(--labelWidth)]"`
  );

  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByTestId('time-field').className).toMatchInlineSnapshot(
    `"group/field w-full"`
  );
});

test('renders readOnly, disabled, required states', () => {
  const { rerender } = render(<TimeField label="Time" readOnly />);
  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-readonly',
    'true'
  );

  rerender(<TimeField label="Time" disabled />);
  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-disabled',
    'true'
  );

  rerender(<TimeField label="Time" required />);
  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-required',
    'true'
  );
});

test('renders TimeField with granularity of second', () => {
  render(
    <TimeField
      label="Time"
      granularity="second"
      defaultValue={parseTime('13:45:30')}
    />
  );

  const segments = screen.getAllByRole('spinbutton');
  expect(segments.length).toBeGreaterThanOrEqual(3);

  expect(segments[0]).toHaveTextContent(/13|1/);
  expect(segments[1]).toHaveTextContent('45');
  expect(segments[2]).toHaveTextContent('30');
});

test('renders TimeField with 12-hour format (hourCycle="12")', () => {
  render(
    <TimeField label="Time" hourCycle={12} defaultValue={parseTime('13:45')} />
  );

  const segments = screen.getAllByRole('spinbutton');

  const hourSegment = segments.find(seg =>
    /^(0?[1-9]|1[0-2])$/.test(seg.textContent || '')
  );
  const ampmSegment = segments.find(seg =>
    /(AM|PM)/i.test(seg.textContent || '')
  );

  expect(hourSegment).toBeDefined();
  expect(ampmSegment).toBeDefined();
});
