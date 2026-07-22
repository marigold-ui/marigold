import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePageFocus } from './usePageFocus';
import { FocusOnRouteChange, FocusWithoutHeading } from './Page.stories';

describe('usePageFocus', () => {
  test('does not steal focus on the initial mount', () => {
    render(<FocusOnRouteChange.Component />);

    const h1 = screen.getByRole('heading', { level: 1, name: 'Billing' });

    expect(h1).not.toHaveFocus();
  });

  test('moves focus to the page heading on route change', async () => {
    const user = userEvent.setup();
    render(<FocusOnRouteChange.Component />);

    await user.click(screen.getByRole('button', { name: 'Open Team members' }));

    const h1 = screen.getByRole('heading', { level: 1, name: 'Team members' });

    expect(h1).toHaveFocus();
    // The heading is made programmatically focusable, not part of the tab order.
    expect(h1).toHaveAttribute('tabindex', '-1');
  });

  test('is a no-op when the page has no heading', async () => {
    const user = userEvent.setup();
    render(<FocusWithoutHeading.Component />);

    const button = screen.getByRole('button', { name: 'Change route' });
    await user.click(button);

    // No heading to move to, and focus is left where it was — no throw.
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  test('throws when used outside a Page', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const Orphan = () => {
      usePageFocus('/somewhere');
      return null;
    };

    expect(() => render(<Orphan />)).toThrow(
      /Page sub-components must be used within a <Page> component/
    );

    spy.mockRestore();
  });
});
