/* eslint-disable testing-library/no-node-access */
import { DatePicker } from './DatePicker';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { CalendarDate } from '@internationalized/date';

const getTextValue = (el: HTMLElement): any => {
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
};

describe('DatePicker', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });
  beforeEach(() => {
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

    test('renders the calendar when date picker is open', () => {
      render(<DatePicker label="date picker" open />);
      const tableGrid = screen.getByRole('grid');
      expect(tableGrid).toBeInTheDocument();
    });

    test('does not render calendar when date picker is not open', () => {
      render(<DatePicker aria-label="date picker" />);
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

  describe('labeling', () => {
    test('supports labeling with aria-label', () => {
      render(<DatePicker aria-label="Birth date" />);

      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('id');
      expect(group).toHaveAttribute('aria-label', 'Birth date');
      const comboboxId = group.getAttribute('id');

      const field = screen.getByTestId('date-field');
      expect(field).toHaveAttribute('role', 'presentation');
      expect(field).not.toHaveAttribute('aria-label');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Calendar');
      expect(button).toHaveAttribute('id');
      const buttonId = button.getAttribute('id');
      expect(button).toHaveAttribute(
        'aria-labelledby',
        `${comboboxId} ${buttonId}`
      );

      const segments = screen.getAllByRole('spinbutton');
      for (let segment of segments) {
        expect(segment).toHaveAttribute('id');
        expect(
          segment?.getAttribute('aria-label')?.startsWith('Birth date ')
        ).toBe(true);
        expect(segment).not.toHaveAttribute('aria-labelledby');
      }
    });

    test('supports field structure', () => {
      render(
        <DatePicker
          label="A Label"
          description="Some helpful text"
          errorMessage="Whoopsie"
        />
      );

      const label = screen.queryByText('A Label');
      expect(label).toBeInTheDocument();

      const description = screen.queryByText('Some helpful text');
      expect(description).toBeInTheDocument();

      const error = screen.queryByText('Whoopsie');
      expect(error).not.toBeInTheDocument();
    });

    test('supports field structure (with error)', () => {
      render(
        <DatePicker
          label="A Label"
          description="Some helpful text"
          error={true}
          errorMessage="Whoopsie"
        />
      );

      const label = screen.queryByText('A Label');
      expect(label).toBeInTheDocument();

      const description = screen.queryByText('Some helpful text');
      expect(description).not.toBeInTheDocument();

      const error = screen.queryByText('Whoopsie');
      expect(error).toBeInTheDocument();
    });
  });
});
