import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Root } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { mockMatchMedia } from '../test.utils';
import { EditableCell } from './Table.stories';

/**
 * Regression guard for DST-1507: inline editing was inert after SSR hydration.
 * React Aria builds the table collection in a separate pass from the one that
 * renders the cell content, so editing state in the build-pass cell stayed
 * bound to the server closures and `setOpen` was a no-op until an unrelated
 * re-render. `TableEditableCell.test.tsx` client-renders and never hits that
 * transition, so this test server-renders, hydrates, then interacts.
 */

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

test('inline editing works after hydrating server-rendered markup', async () => {
  window.matchMedia = mockMatchMedia([]); // desktop → popover editor
  const user = userEvent.setup();

  const container = document.createElement('div');
  container.innerHTML = renderToString(<EditableCell.Component />);
  document.body.appendChild(container);
  const serverEditButton = within(container).getAllByLabelText('Edit')[0];

  let root: Root | null = null;
  await act(async () => {
    root = hydrateRoot(container, <EditableCell.Component />);
  });

  try {
    await user.click(serverEditButton);

    expect(serverEditButton.isConnected).toBe(true);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });
  } finally {
    await act(async () => {
      root?.unmount();
    });
    container.remove();
  }
});
