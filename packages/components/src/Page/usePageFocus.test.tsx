import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';
import { FocusOnRouteChange, FocusWithoutHeading } from './Page.stories';
import { usePageFocus } from './usePageFocus';

describe('usePageFocus', () => {
  // Regression test: React StrictMode runs an effect's setup → cleanup → setup
  // on mount while preserving refs, which broke an earlier "first mount"
  // boolean guard (the second setup saw it as already flipped and stole
  // focus). RTL's default render doesn't reproduce that, so it's wrapped here.
  test('does not steal focus on the initial mount under StrictMode', () => {
    render(
      <StrictMode>
        <FocusOnRouteChange.Component />
      </StrictMode>
    );

    const h1 = screen.getByRole('heading', { level: 1, name: 'Billing' });

    expect(h1).not.toHaveFocus();
  });

  test('does not steal focus on the initial mount without a heading', () => {
    render(
      <StrictMode>
        <FocusWithoutHeading.Component />
      </StrictMode>
    );

    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  test('moves focus to the new page heading on a route change', async () => {
    const user = userEvent.setup();
    render(<FocusOnRouteChange.Component />);

    await user.click(screen.getByRole('button', { name: 'Open Team members' }));

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Team members',
    });
    expect(heading).toHaveFocus();
    // Made programmatically focusable, not tabbable.
    expect(heading).toHaveAttribute('tabindex', '-1');
  });

  test('falls back to the main landmark when the page has no heading', async () => {
    const user = userEvent.setup();
    render(<FocusWithoutHeading.Component />);
    // The breadcrumb repeats the section name, so scope to the sidebar's nav.
    const nav = within(
      screen.getByRole('navigation', { name: 'Settings sections' })
    );

    await user.click(nav.getByRole('link', { name: 'Team members' }));

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveFocus();
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
