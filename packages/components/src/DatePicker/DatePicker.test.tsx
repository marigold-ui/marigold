/* eslint-disable testing-library/no-node-access */
import { DatePicker } from './DatePicker';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { CalendarDate } from '@internationalized/date';

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
    });
  });
});
