import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import { usePageFocus } from './usePageFocus';
import { FocusOnRouteChange } from './Page.stories';

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
