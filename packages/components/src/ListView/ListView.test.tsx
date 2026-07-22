import type { Ref } from 'react';
import { theme } from '@marigold/theme-rui';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Description } from '../Description/Description';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { ListView } from './ListView';
import {
  Basic,
  EmptyState,
  NotificationsFeed,
  ResourceListWithMenu,
  TeamRosterWithStatus,
  WithTitle,
} from './ListView.stories';

const user = userEvent.setup({ pointerEventsCheck: 0 });

describe('ListView', () => {
  describe('rendering', () => {
    test('renders a non-form grid with the expected number of rows', () => {
      render(<Basic.Component />);

      const grid = screen.getByRole('grid', { name: 'Recent files' });
      const rows = screen.getAllByRole('row');

      expect(grid).toBeInTheDocument();
      expect(rows).toHaveLength(3);
    });

    test('rows have no aria-selected — ListView has no selection', () => {
      render(<Basic.Component />);

      for (const row of screen.getAllByRole('row')) {
        expect(row).not.toHaveAttribute('aria-selected');
      }
    });

    test('forwards refs to the underlying HTMLElement', () => {
      const ref: { current: HTMLDivElement | null } = { current: null };

      render(<Basic.Component ref={ref as Ref<HTMLDivElement>} />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('keyboard navigation', () => {
    test('arrow keys move focus between rows, skipping the disabled row', async () => {
      render(<Basic.Component />);

      const rows = screen.getAllByRole('row');
      rows[0].focus();
      expect(rows[0]).toHaveFocus();

      // rows[1] ("Budget draft") is in `disabledKeys` and is skipped.
      await user.keyboard('{ArrowDown}');
      expect(rows[2]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(rows[0]).toHaveFocus();
    });

    test('tab reaches a nested interactive control inside the focused row', async () => {
      render(<NotificationsFeed.Component />);

      const rows = screen.getAllByRole('row');
      rows[0].focus();

      await user.tab();

      const [muteSwitch] = screen.getAllByRole('switch', {
        name: 'Mute this thread',
      });
      expect(muteSwitch).toHaveFocus();
    });
  });

  describe('interactive rows (must-support scenarios)', () => {
    test('notifications: mutes and dismisses a row without navigating away', async () => {
      // Arrange
      render(<NotificationsFeed.Component />);
      const [muteSwitch] = screen.getAllByRole('switch', {
        name: 'Mute this thread',
      });

      // Assert (initial state)
      expect(muteSwitch).not.toBeChecked();

      // Act
      await user.click(muteSwitch);

      // Assert
      expect(muteSwitch).toBeChecked();

      // Act
      const [dismissButton] = screen.getAllByRole('button', {
        name: 'Dismiss',
      });
      await user.click(dismissButton);

      // Assert
      // The row's own content is still present — dismissing is a consumer
      // concern (removing the item from data), not something ListView does.
      expect(
        screen.getByRole('row', { name: /build finished/i })
      ).toBeInTheDocument();
    });

    test('resource list: opens the row action menu and exposes its items', async () => {
      // Arrange
      render(<ResourceListWithMenu.Component />);
      const trigger = screen.getByRole('button', {
        name: 'Quarterly report actions',
      });

      // Assert (initial state)
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      // Act
      await user.click(trigger);

      // Assert
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );
    });

    test('settings-style toggle: switches a row control in place', async () => {
      // Arrange
      render(<TeamRosterWithStatus.Component />);
      const notifySwitch = screen.getByRole('switch', {
        name: 'Notify Alex Kim',
      });

      // Assert (initial state)
      expect(notifySwitch).not.toBeChecked();

      // Act
      await user.click(notifySwitch);

      // Assert
      expect(notifySwitch).toBeChecked();
    });
  });

  describe('textValue', () => {
    test('warns in development when children is not a string and textValue is missing', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MarigoldProvider theme={theme}>
          <ListView aria-label="Test">
            <ListView.Item id="row">
              <Description>No textValue provided</Description>
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('`textValue` is required')
      );

      warnSpy.mockRestore();
    });
  });

  describe('emptyState', () => {
    test('renders the emptyState content when there are no items', () => {
      render(<EmptyState.Component />);

      expect(screen.getByText('No resources yet.')).toBeInTheDocument();
      // RAC's GridList still renders one structural row to host the empty
      // state (for the grid's live region), so assert there's exactly that
      // one row rather than zero rows outright.
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });
  });

  describe('Title as span', () => {
    test('a row using <Title> does not emit a document heading', () => {
      render(<WithTitle.Component />);

      expect(screen.queryAllByRole('heading')).toHaveLength(0);
      expect(screen.getByText('Jane Cooper').tagName).toBe('SPAN');
    });
  });
});
