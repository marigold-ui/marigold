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
  // Precondition, not a second assertion: `hydrateRoot` on markup that never
  // contained the trigger would client-render one anyway and the test below
  // would still pass, silently no longer covering hydration.
  expect(within(container).getAllByLabelText('Edit').length).toBeGreaterThan(0);

  let root: Root | null = null;
  await act(async () => {
    root = hydrateRoot(container, <EditableCell.Component />);
  });

  // Query the trigger *after* hydration rather than reusing the node captured
  // from the server markup. As of react-aria-components 1.20.0 the Table
  // subtree is re-created during hydration instead of being hydrated in place
  // (the emitted markup is byte-identical, but the DOM nodes are new), so a
  // pre-hydration reference goes stale. Node identity is a RAC implementation
  // detail; what this test guards is the DST-1507 behaviour below — that the
  // editor actually opens once the client has taken over.
  const editButton = within(container).getAllByLabelText('Edit')[0];

  try {
    await user.click(editButton);

    expect(editButton.isConnected).toBe(true);
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
