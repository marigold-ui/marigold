/* eslint-disable testing-library/no-node-access */
import { DatePicker } from './DatePicker';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { CalendarDate } from '@internationalized/date';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

const user = userEvent.setup();

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
    jest.useRealTimers();
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

  describe('events', function () {
    const onBlurSpy = jest.fn();
    const onFocusChangeSpy = jest.fn();
    const onFocusSpy = jest.fn();
    const onKeyDownSpy = jest.fn();
    const onKeyUpSpy = jest.fn();

    afterEach(() => {
      onBlurSpy.mockClear();
      onFocusChangeSpy.mockClear();
      onFocusSpy.mockClear();
      onKeyDownSpy.mockClear();
      onKeyUpSpy.mockClear();
    });

    test('focuses field, move a segment, and open popover and does not blur', async () => {
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button');

      screen.getAllByRole('spinbutton');
      screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await userEvent.tab();
      expect(segments[1]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      user.click(button);
      act(() => jest.runAllTimers());

      const popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should focus field and leave to blur', async () => {
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await userEvent.click(document.body);
      expect(document.body).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open popover and call picker onFocus', async () => {
      render(
        <DatePicker
          label="Date"
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
      act(() => jest.runAllTimers());

      const popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open and close popover and only call blur when focus leaves picker', async () => {
      render(
        <DatePicker
          label="Date"
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
      act(() => jest.runAllTimers());

      const popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
      fireEvent.keyUp(document.activeElement as Element, { key: 'Escape' });
      act(() => jest.runAllTimers());

      await waitFor(() => {
        expect(popover).not.toBeInTheDocument();
      });

      expect(popover).not.toBeInTheDocument();
      expect(document.activeElement).toBe(button);
      expect(button).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await userEvent.tab();
      expect(document.body).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should trigger right arrow key event for segment navigation', async () => {
      render(
        <DatePicker
          label="Date"
          onKeyDown={onKeyDownSpy}
          onKeyUp={onKeyUpSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, {
        key: 'ArrowRight',
      });
      fireEvent.keyUp(document.activeElement as Element, { key: 'ArrowRight' });
      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });

    test('should trigger key event in popover and focus/blur/key events are not called', async () => {
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
          onKeyDown={onKeyDownSpy}
          onKeyUp={onKeyUpSpy}
        />
      );
      let button = screen.getByRole('button');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);
      let popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, {
        key: 'ArrowRight',
      });
      fireEvent.keyUp(document.activeElement as Element, { key: 'ArrowRight' });
      expect(onKeyDownSpy).toHaveBeenCalledTimes(0);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(0);
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('calendar popover', () => {
    test('emits onChange when selecting a date in the calendar in controlled mode', async () => {
      const onChange = jest.fn();
      render(
        <DatePicker value={new CalendarDate(2019, 2, 3)} onChange={onChange} />
      );

      const combobox = screen.getAllByRole('group')[0];
      expect(getTextValue(combobox)).toBe('02/03/2019');

      const button = screen.getByRole('button');
      await user.click(button);

      const popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();

      expect(screen.queryByLabelText('Time')).toBeNull();

      const cells = screen.getAllByRole('gridcell');
      const selected = cells.find(
        cell => cell.getAttribute('aria-selected') === 'true'
      );
      expect(selected?.children[0]).toHaveAttribute(
        'aria-label',
        'Sunday, February 3, 2019 selected'
      );

      await user.click(selected?.nextSibling?.childNodes[0] as Element);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(new CalendarDate(2019, 2, 4));
      expect(getTextValue(combobox)).toBe('02/03/2019'); // controlled
    });
    test('emits onChange when selecting a date in the calendar in uncontrolled mode', async () => {
      let onChange = jest.fn();
      render(
        <DatePicker
          defaultValue={new CalendarDate(2019, 2, 3)}
          onChange={onChange}
        />
      );

      let combobox = screen.getAllByRole('group')[0];
      expect(getTextValue(combobox)).toBe('02/03/2019');

      let button = screen.getByRole('button');
      await user.click(button);

      let popover = screen.getByRole('presentation');
      expect(popover).toBeVisible();

      let cells = screen.getAllByRole('gridcell');
      let selected = cells.find(
        cell => cell.getAttribute('aria-selected') === 'true'
      );
      expect(selected?.children[0])?.toHaveAttribute(
        'aria-label',
        'Sunday, February 3, 2019 selected'
      );

      await user.click(selected?.nextSibling?.childNodes[0] as Element);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(new CalendarDate(2019, 2, 4));
      expect(getTextValue(combobox)).toBe('02/04/2019'); // uncontrolled
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
