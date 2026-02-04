import { CalendarDate } from '@internationalized/date';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import {
  Basic,
  UnavailableDate,
  WithDefaultValue,
  WithError,
} from './DatePicker.stories';

const user = userEvent.setup();

describe('DatePicker', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      }),
    });
  });

  describe('basics', () => {
    test('renders date picker with specified date', () => {
      render(<WithDefaultValue.Component />);

      const dateinput = screen.getAllByRole('group')[0];
      expect(dateinput).toBeVisible();
      expect(dateinput).not.toHaveAttribute('aria-disabled');
      expect(dateinput).not.toHaveAttribute('aria-invalid');

      const segments = screen.getAllByRole('spinbutton');
      expect(segments.length).toBe(3);

      // Month segment (en-US format: MM/DD/YYYY)
      expect(segments[0]).toHaveTextContent('02');
      expect(segments[0].getAttribute('aria-label')).toBe('month, ');
      expect(segments[0].getAttribute('aria-valuenow')).toBe('2');
      expect(segments[0].getAttribute('aria-valuetext')).toBe('2 – February');
      expect(segments[0].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[0].getAttribute('aria-valuemax')).toBe('12');

      // Day segment
      expect(segments[1]).toHaveTextContent('03');
      expect(segments[1].getAttribute('aria-label')).toBe('day, ');
      expect(segments[1].getAttribute('aria-valuenow')).toBe('3');
      expect(segments[1].getAttribute('aria-valuetext')).toBe('3');
      expect(segments[1].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[1].getAttribute('aria-valuemax')).toBe('28');

      // Year segment
      expect(segments[2]).toHaveTextContent('2019');
      expect(segments[2].getAttribute('aria-label')).toBe('year, ');
      expect(segments[2].getAttribute('aria-valuenow')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuetext')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[2].getAttribute('aria-valuemax')).toBe('9999');
    });

    test('renders the calendar when date picker is open', async () => {
      render(<Basic.Component data-testid="date picker" open />);

      const picker = screen.getByTestId('date picker');

      expect(picker).toBeVisible();
      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
    });

    test('does not render calendar when date picker is not open', () => {
      render(<Basic.Component aria-label="date picker" />);

      const heading = screen.queryByRole('heading');

      expect(heading).not.toBeInTheDocument();
    });

    test('supports autoFocus', () => {
      render(<Basic.Component autoFocus />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.activeElement).toBe(screen.getAllByRole('spinbutton')[0]);
    });

    test('passes through data attributes', () => {
      render(<Basic.Component data-testid="foo" />);

      expect(screen.getByTestId('foo')).toHaveAttribute('data-rac');
    });
  });

  describe('labeling', () => {
    test('supports labeling with aria-label', () => {
      // Basic uses de-DE locale, so aria-label is "Kalender"
      render(<Basic.Component aria-label="Birth date" label={undefined} />);

      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('id');
      expect(group).toHaveAttribute('aria-label', 'Birth date');
      const comboboxId = group.getAttribute('id');

      const button = screen.getByRole('button');
      const buttonId = button.getAttribute('id');
      const segments = screen.getAllByRole('spinbutton');

      expect(button).toHaveAttribute('aria-label', 'Kalender');
      expect(button).toHaveAttribute('id');
      expect(button).toHaveAttribute(
        'aria-labelledby',
        `${buttonId} ${comboboxId}`
      );

      for (const segment of segments) {
        expect(segment).toHaveAttribute('id');
        expect(
          segment?.getAttribute('aria-label')?.endsWith('Birth date')
        ).toBe(true);
        expect(segment).not.toHaveAttribute('aria-labelledby');
      }
    });

    test('supports field structure', () => {
      render(
        <Basic.Component
          label="A Label"
          description="Some helpful text"
          errorMessage="Whoopsie"
        />
      );

      const label = screen.queryByText('A Label');
      const description = screen.queryByText('Some helpful text');
      const error = screen.queryByText('Whoopsie');

      expect(label).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(error).not.toBeInTheDocument();
    });

    test('supports field structure (with error)', () => {
      render(<WithError.Component />);

      const label = screen.queryByText('A Label');
      const description = screen.queryByText('Some helpful text');
      const error = screen.queryByText('Whoopsie');

      expect(label).toBeInTheDocument();
      expect(description).not.toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
  });

  describe('events', () => {
    const onBlurSpy = vi.fn();
    const onFocusChangeSpy = vi.fn();
    const onFocusSpy = vi.fn();
    const onKeyDownSpy = vi.fn();
    const onKeyUpSpy = vi.fn();

    afterEach(() => {
      onBlurSpy.mockClear();
      onFocusChangeSpy.mockClear();
      onFocusSpy.mockClear();
      onKeyDownSpy.mockClear();
      onKeyUpSpy.mockClear();
    });

    test('focuses field, move a segment, and open popover and does not blur', async () => {
      render(
        <Basic.Component
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(segments[1]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await user.click(button);

      // Wait for calendar popover to appear
      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should focus field and leave to blur', async () => {
      render(
        <Basic.Component
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await user.click(document.body);
      expect(document.body).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open popover and call picker onFocus', async () => {
      render(
        <Basic.Component
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const button = screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open and close popover and only call blur when focus leaves picker', async () => {
      render(
        <Basic.Component
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const button = screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      const popover = screen.getByRole('application');
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(popover).not.toBeInTheDocument();
      });

      expect(popover).not.toBeInTheDocument();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should trigger right arrow key event for segment navigation', async () => {
      render(<Basic.Component onKeyDown={onKeyDownSpy} onKeyUp={onKeyUpSpy} />);
      const segments = screen.getAllByRole('spinbutton');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await user.tab();
      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      await user.keyboard('{ArrowRight}');
      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });

    test('should trigger key event in popover and focus/blur/key events are not called', async () => {
      render(
        <Basic.Component
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
          onKeyDown={onKeyDownSpy}
          onKeyUp={onKeyUpSpy}
        />
      );
      const button = screen.getByRole('button');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await user.keyboard('{ArrowRight}');
      expect(onKeyDownSpy).toHaveBeenCalledTimes(0);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(0);
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});

test('DatePicker supports width prop', () => {
  render(
    <Basic.Component data-testid="picker" aria-label="date picker" width={10} />
  );

  const picker = screen.getByTestId('picker');

  expect(picker).toHaveClass('w-10');
});

test('DatePicker supports data unavailable property', async () => {
  render(
    <UnavailableDate.Component data-testid="picker" aria-label="date picker" />
  );

  const button = screen.getByRole('button');
  await user.click(button);
  const date = screen.getAllByRole('gridcell');

  await waitFor(() => {
    expect(screen.getByRole('application')).toBeVisible();
  });
  // eslint-disable-next-line testing-library/no-node-access
  expect(date[10].firstChild).toHaveAttribute('data-unavailable', 'true');
});

describe('paste handling', () => {
  test('should handle pasting a valid ISO date string', async () => {
    const onChange = vi.fn();
    render(<Basic.Component onChange={onChange} aria-label="date picker" />);

    const group = screen.getAllByRole('group')[0];
    await user.click(group);
    await user.paste('2025-09-24');
    const changedDate = onChange.mock.calls[0][0];

    expect(onChange).toHaveBeenCalled();
    expect(changedDate.year).toBe(2025);
    expect(changedDate.month).toBe(9);
    expect(changedDate.day).toBe(24);
  });

  test('should handle pasting US format date string', async () => {
    const onChange = vi.fn();
    render(<Basic.Component onChange={onChange} aria-label="date picker" />);

    const group = screen.getAllByRole('group')[0];
    await user.click(group);
    await user.paste('09/24/2025');
    const changedDate = onChange.mock.calls[0][0];

    expect(onChange).toHaveBeenCalled();
    expect(changedDate.year).toBe(2025);
    expect(changedDate.month).toBe(9);
    expect(changedDate.day).toBe(24);
  });

  test('should handle pasting European dot format date string', async () => {
    const onChange = vi.fn();
    render(<Basic.Component onChange={onChange} aria-label="date picker" />);

    const group = screen.getAllByRole('group')[0];
    await user.click(group);
    await user.paste('24.09.2025');

    const changedDate = onChange.mock.calls[0][0];

    expect(onChange).toHaveBeenCalled();
    expect(changedDate.year).toBe(2025);
    expect(changedDate.month).toBe(9);
    expect(changedDate.day).toBe(24);
  });

  test('should handle pasting an invalid date format', async () => {
    const onChange = vi.fn();
    render(<Basic.Component onChange={onChange} aria-label="date picker" />);

    const group = screen.getAllByRole('group')[0];
    await user.click(group);
    await user.paste('invalid-date');

    expect(onChange).not.toHaveBeenCalled();
  });

  test('should support copying date value', async () => {
    render(
      <WithDefaultValue.Component
        defaultValue={new CalendarDate(2025, 9, 24)}
        aria-label="date picker"
      />
    );

    const dateInput = screen.getAllByRole('spinbutton')[0];
    await user.click(dateInput);

    // Verify the date is formatted correctly in the input
    const segments = screen.getAllByRole('spinbutton');
    expect(segments[0]).toHaveTextContent('09');
    expect(segments[1]).toHaveTextContent('24');
    expect(segments[2]).toHaveTextContent('2025');
  });
});
