import { screen, waitFor, within } from '@testing-library/react';
import { act } from 'react';
import type { Root } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import {
  SkeletonRows,
  SkeletonRowsInFragment,
  SkeletonRowsWrappedColumn,
} from './Table.stories';

/**
 * Skeleton rows have to be in the server HTML, or a server-rendered page
 * paints a bare header and jumps once the rows hydrate in.
 */

let root: Root | undefined;
let container: HTMLDivElement | undefined;

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
});

test('renders the skeleton rows on the server', () => {
  container = document.createElement('div');
  container.innerHTML = renderToString(<SkeletonRows.Component />);

  // Header plus three skeleton rows.
  expect(within(container).getAllByRole('row')).toHaveLength(4);
});

test('disables select-all in the server HTML', () => {
  container = document.createElement('div');
  container.innerHTML = renderToString(<SkeletonRows.Component />);

  expect(within(container).getAllByRole('checkbox')[0]).toBeDisabled();
});

test('reads columns inside a Fragment on the server', () => {
  container = document.createElement('div');
  container.innerHTML = renderToString(<SkeletonRowsInFragment.Component />);

  expect(within(container).getAllByRole('row')).toHaveLength(4);
});

test('renders no short rows on the server behind a wrapper component', () => {
  container = document.createElement('div');
  container.innerHTML = renderToString(<SkeletonRowsWrappedColumn.Component />);

  // The table can't count wrapped columns, so it waits for the client.
  const [header, ...rows] = within(container).getAllByRole('row');
  const columns = within(header).getAllByRole('columnheader').length;
  for (const row of rows) {
    const cells =
      within(row).queryAllByRole('gridcell').length +
      within(row).queryAllByRole('rowheader').length;
    expect(cells).toBe(columns);
  }
});

test('hydrates the skeleton rows without a mismatch', async () => {
  const recoverableErrors: unknown[] = [];
  container = document.createElement('div');
  container.innerHTML = renderToString(<SkeletonRows.Component />);
  document.body.appendChild(container);

  act(() => {
    root = hydrateRoot(container!, <SkeletonRows.Component />, {
      onRecoverableError: error => recoverableErrors.push(error),
    });
  });

  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(4);
  });
  expect(recoverableErrors).toEqual([]);
});
