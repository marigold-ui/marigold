/* eslint-disable testing-library/no-node-access */
import { DatePicker } from './DatePicker';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { CalendarDate, CalendarDateTime } from '@internationalized/date';

function getTextValue(el: HTMLElement): any {
  if (
    el.className?.includes?.('DatePicker-placeholder') &&
    !el?.parentElement?.className.includes('is-placeholder')
  ) {
    return '';
  }
  return [...el.childNodes]
    .map(el =>
      el?.nodeType === 3 ? el.textContent : getTextValue(el as HTMLElement)
    )
    .join('');
}

describe('DatePicker', function () {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

  describe('basics', () => {
    test('renders date picker with specified date', () => {
      render(<DatePicker label="Date" value={new CalendarDate(2019, 2, 3)} />);

      const combobox = screen.getAllByRole('group')[0];
      expect(combobox).toBeVisible();
      expect(combobox).not.toHaveAttribute('aria-disabled');
      expect(combobox).not.toHaveAttribute('aria-invalid');

      const segments = screen.getAllByRole('spinbutton');
      expect(segments.length).toBe(3);
      expect(getTextValue(segments[0])).toBe('02');
      expect(segments[0].getAttribute('aria-label')).toBe('month');
      expect(segments[0].getAttribute('aria-valuenow')).toBe('2');
      expect(segments[0].getAttribute('aria-valuetext')).toBe('2 – February');
      expect(segments[0].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[0].getAttribute('aria-valuemax')).toBe('12');

      expect(getTextValue(segments[1])).toBe('03');
      expect(segments[1].getAttribute('aria-label')).toBe('day');
      expect(segments[1].getAttribute('aria-valuenow')).toBe('3');
      expect(segments[1].getAttribute('aria-valuetext')).toBe('3');
      expect(segments[1].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[1].getAttribute('aria-valuemax')).toBe('28');

      expect(getTextValue(segments[2])).toBe('2019');
      expect(segments[2].getAttribute('aria-label')).toBe('year');
      expect(segments[2].getAttribute('aria-valuenow')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuetext')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[2].getAttribute('aria-valuemax')).toBe('9999');
    });

    test('renders a datepicker with granularity="second"', () => {
      render(
        <DatePicker
          label="Date"
          value={new CalendarDateTime(2019, 2, 3)}
          granularity="second"
        />
      );

      const combobox = screen.getAllByRole('group')[0];
      expect(combobox).toBeVisible();
      expect(combobox).not.toHaveAttribute('aria-disabled');
      expect(combobox).not.toHaveAttribute('aria-invalid');

      const segments = screen.getAllByRole('spinbutton');

      expect(segments.length).toBe(7);
      expect(getTextValue(segments[0])).toBe('02');
      expect(segments[0].getAttribute('aria-label')).toBe('month');
      expect(segments[0].getAttribute('aria-valuenow')).toBe('2');
      expect(segments[0].getAttribute('aria-valuetext')).toBe('2 – February');
      expect(segments[0].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[0].getAttribute('aria-valuemax')).toBe('12');

      expect(getTextValue(segments[1])).toBe('03');
      expect(segments[1].getAttribute('aria-label')).toBe('day');
      expect(segments[1].getAttribute('aria-valuenow')).toBe('3');
      expect(segments[1].getAttribute('aria-valuetext')).toBe('3');
      expect(segments[1].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[1].getAttribute('aria-valuemax')).toBe('28');

      expect(getTextValue(segments[2])).toBe('2019');
      expect(segments[2].getAttribute('aria-label')).toBe('year');
      expect(segments[2].getAttribute('aria-valuenow')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuetext')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[2].getAttribute('aria-valuemax')).toBe('9999');

      expect(getTextValue(segments[3])).toBe('12');
      expect(segments[3].getAttribute('aria-label')).toBe('hour');
      expect(segments[3].getAttribute('aria-valuenow')).toBe('0');
      expect(segments[3].getAttribute('aria-valuetext')).toBe('12 AM');
      expect(segments[3].getAttribute('aria-valuemin')).toBe('0');
      expect(segments[3].getAttribute('aria-valuemax')).toBe('11');

      expect(getTextValue(segments[4])).toBe('00');
      expect(segments[4].getAttribute('aria-label')).toBe('minute');
      expect(segments[4].getAttribute('aria-valuenow')).toBe('0');
      expect(segments[4].getAttribute('aria-valuetext')).toBe('00');
      expect(segments[4].getAttribute('aria-valuemin')).toBe('0');
      expect(segments[4].getAttribute('aria-valuemax')).toBe('59');

      expect(getTextValue(segments[5])).toBe('00');
      expect(segments[5].getAttribute('aria-label')).toBe('second');
      expect(segments[5].getAttribute('aria-valuenow')).toBe('0');
      expect(segments[5].getAttribute('aria-valuetext')).toBe('00');
      expect(segments[5].getAttribute('aria-valuemin')).toBe('0');
      expect(segments[5].getAttribute('aria-valuemax')).toBe('59');

      expect(getTextValue(segments[6])).toBe('AM');
      expect(segments[6].getAttribute('aria-label')).toBe('AM/PM');
      expect(segments[6].getAttribute('aria-valuetext')).toBe('AM');
    });

    test('renders the calendar when date picker is open', () => {
      render(<DatePicker label="date picker" open />);
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    test('does not render calendar when date picker is not open', () => {
      render(<DatePicker />);
      const heading = screen.queryByRole('heading');
      expect(heading).not.toBeInTheDocument();
    });
    test('supports autoFocus', () => {
      render(<DatePicker label="Date" autoFocus />);
      expect(document.activeElement).toBe(screen.getAllByRole('spinbutton')[0]);
    });
    test('passes through data attributes', () => {
      render(<DatePicker label="Date" data-testid="foo" />);
      expect(screen.getByTestId('foo')).toHaveAttribute('role', 'group');
    });
  });
});
