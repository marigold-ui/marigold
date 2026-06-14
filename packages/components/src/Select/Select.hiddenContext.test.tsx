import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Basic } from './Select.stories';

// DSTSUP-261 regression test.
//
// On mobile, `Select` builds its collection in a hidden pass before rendering
// for real. `Tray` skips its modal during that pass via `useIsHidden()`, which
// reads the `HiddenContext` that react-aria-components' `Select`
// (`createHideableComponent`) sets. Provider and consumer only share that
// context when `react-aria` resolves to a single version. If two `react-aria`
// generations are installed, `useIsHidden()` reads an orphan context that is
// never flipped to `true`. Without further protection the guard never fires,
// a second (empty) tray modal leaks, and the two modals `inert` each other so
// the option becomes unselectable.
//
// We can't install two react-aria generations inside a single test, so we
// simulate the split: force `useIsHidden` to stay `false` (blind to the hidden
// pass), exactly like reading a context the collection renderer never sets.
// `Tray`'s DOM-probe safety net must catch this: the hidden pass renders into
// the collection's `<template>` (a detached DocumentFragment), so the probe is
// never connected to the document and the duplicate modal must not mount —
// regardless of how react-aria versions resolve.
const hidden = vi.hoisted(() => ({ isHidden: false }));
vi.mock('@react-aria/collections', async importActual => {
  const actual = await importActual<typeof import('@react-aria/collections')>();
  return { ...actual, useIsHidden: () => hidden.isHidden };
});

const user = userEvent.setup();
window.matchMedia = mockMatchMedia(['(width < 640px)']);

// Import the existing story instead of hand-rolling a fixture (CLAUDE.md:
// "Don't create test fixtures/themes — import stories"). `Basic` is labelled
// "Favorite", ships the Star Wars / Star Trek options, and wires the theme via
// its decorator path; `renderWithOverlay` adds the portal container the tray
// modal needs.
const renderSelect = () => renderWithOverlay(<Basic.Component />);

test('split HiddenContext (useIsHidden blind to hidden pass) does not leak a duplicate tray modal', async () => {
  // `false` everywhere mimics the Tray reading a different react-aria
  // generation's context than the Select's collection renderer sets.
  hidden.isHidden = false;
  renderSelect();

  await user.click(screen.getByLabelText(/Favorite/i));
  const dialog = await screen.findByRole('dialog');

  // The broken DOM signature from the ticket was two overlay dialogs, only one
  // of which holds the listbox. The DOM probe must suppress the hidden-pass
  // copy, leaving exactly one populated tray modal.
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  expect(within(dialog).getByRole('listbox')).toBeInTheDocument();

  // No leaked twin modal means the real tray is not `inert`-ed: tapping an
  // option commits the selection and closes the tray.
  await user.click(within(dialog).getByRole('option', { name: 'Star Trek' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(screen.getByLabelText(/Favorite/i)).toHaveTextContent('Star Trek');
});
