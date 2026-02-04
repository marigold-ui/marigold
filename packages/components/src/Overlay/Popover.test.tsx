/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, OpenPopover } from './Popover.stories';

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

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
