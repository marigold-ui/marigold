import { CalendarDate } from '@internationalized/date';
import { render, screen, waitFor } from '@testing-library/react';
import { mockMatchMedia } from '../test.utils';
import { Basic, UnavailableDate, WithError } from './DateRangePicker.stories';

// A fixed range reused across tests that need pre-filled start/end inputs.
const defaultRange = {
  start: new CalendarDate(2019, 2, 3),
  end: new CalendarDate(2019, 2, 10),
};

window.matchMedia = mockMatchMedia([]);

describe('DateRangePicker', () => {
  describe('basics', () => {
    test('renders start and end inputs with the given range', () => {
      render(<Basic.Component defaultValue={defaultRange} />);

      const groups = screen.getAllByRole('group');
      const segments = screen.getAllByRole('spinbutton');

      expect(groups[0]).toBeVisible();
      expect(segments).toHaveLength(6);
      // de-DE format renders each input as DD.MM.YYYY.
      expect(segments[0]).toHaveTextContent('03');
      expect(segments[1]).toHaveTextContent('02');
      expect(segments[2]).toHaveTextContent('2019');
      expect(segments[3]).toHaveTextContent('10');
      expect(segments[4]).toHaveTextContent('02');
      expect(segments[5]).toHaveTextContent('2019');
    });

    test('renders a calendar separator between the inputs', () => {
      render(<Basic.Component defaultValue={defaultRange} />);

      expect(screen.getByText('–')).toBeInTheDocument();
    });

    test('renders the calendar when the picker is open', async () => {
      render(<Basic.Component open />);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      expect(screen.getByRole('grid')).toBeVisible();
    });
  });

  describe('states', () => {
    test('supports a disabled picker', () => {
      render(<Basic.Component disabled />);

      const segments = screen.getAllByRole('spinbutton');

      segments.forEach(segment => {
        expect(segment).toHaveAttribute('aria-disabled', 'true');
      });
    });

    test('shows the error message when invalid', () => {
      render(<WithError.Component />);

      expect(screen.getByText('Whoopsie')).toBeVisible();
    });

    test('marks unavailable dates via dateUnavailable', async () => {
      render(<UnavailableDate.Component open />);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });

      // The story marks Sundays as unavailable. Each day cell exposes a
      // `data-unavailable` flag, so a no-op `dateUnavailable` would set none.
      const cells = screen.getAllByRole('gridcell');
      const unavailable = cells.filter(
        cell =>
          // eslint-disable-next-line testing-library/no-node-access
          (cell.firstChild as HTMLElement | null)?.getAttribute(
            'data-unavailable'
          ) === 'true'
      );

      // At least one Sunday is blocked, and it is selective — not every day.
      expect(unavailable.length).toBeGreaterThan(0);
      expect(unavailable.length).toBeLessThan(cells.length);
    });
  });
});
