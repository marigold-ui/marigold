/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, OpenPopover } from './Popover.stories';

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

test('renders open popover', () => {
  renderWithOverlay(<OpenPopover.Component />);

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  renderWithOverlay(<Basic.Component />);

  const popover = screen.queryByTestId('popover');
  expect(popover).not.toBeInTheDocument();
});

test('popover has children', () => {
  renderWithOverlay(<OpenPopover.Component />);

  const popover = screen.getByTestId('popover');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
});

test('popover is small screen', () => {
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  renderWithOverlay(<OpenPopover.Component />);

  const popover = screen.getByTestId('popover');

  expect(popover.className).toMatchInlineSnapshot(
    `"fixed! top-auto! bottom-0! left-0! max-h-fit! w-full z-30 group/popover outline-0 placement-top:mb-1 placement-bottom:mt-1 placement-right:ml-1 placement-left:mr-1 min-w-(--trigger-width)"`
  );
  expect(popover).toBeInTheDocument();
});
