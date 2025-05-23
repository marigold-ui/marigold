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
    DateField: {
      field: cva(),
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
test('renders TimeField with default value', () => {
  render(<TimeField label="Time" defaultValue={parseTime('13:45')} />);

  const segments = screen.getAllByRole('spinbutton');

  expect(segments.length).toBeGreaterThanOrEqual(2);
  expect(segments[0]).toHaveTextContent(/13|1/);
  expect(segments[1]).toHaveTextContent('45');
});

test('calls onFocus and onFocusChange when focused', async () => {
  render(
    <TimeField
      label="Time"
      defaultValue={parseTime('13:45')}
      onFocus={onFocusSpy}
      onFocusChange={onFocusChangeSpy}
    />
  );

  await userEvent.tab();

  expect(onFocusSpy).toHaveBeenCalled();
  expect(onFocusChangeSpy).toHaveBeenCalled();
});

test('applies segment-specific styles from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <TimeField label="Time" defaultValue={parseTime('13:45')} />
    </ThemeProvider>
  );

  const segments = screen.getAllByRole('spinbutton');

  segments.forEach(segment => {
    expect(segment.className).toContain('bg-white');
    expect(segment.className).toContain('text-gray-700');
  });
});

test('renders readonly state', () => {
  render(<TimeField label="Time" readOnly />);

  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-readonly',
    'true'
  );
});

test('renders disabled state', () => {
  render(<TimeField label="Time" disabled />);

  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-disabled',
    'true'
  );
});

test('renders required state', () => {
  render(<TimeField label="Time" required />);

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
  expect(segments[2]).toHaveTextContent('30');
});

test('renders TimeField in 12-hour format', () => {
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
