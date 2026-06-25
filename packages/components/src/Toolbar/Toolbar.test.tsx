import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { vi } from 'vitest';
import {
  Basic,
  GroupDisabled,
  Groups,
  IconActions,
  WithoutAccessibleName,
} from './Toolbar.stories';

test('renders with role="toolbar" and an accessible name', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('toolbar', { name: 'Event filters' })
  ).toBeInTheDocument();
});

test('lays children out as a horizontal flex row', () => {
  render(<Basic.Component />);

  const toolbar = screen.getByRole('toolbar', { name: 'Event filters' });

  expect(toolbar).toHaveClass('flex', 'w-full', 'items-center');
});

test('forwards ref to the toolbar element', () => {
  const ref: RefObject<HTMLDivElement | null> = { current: null };

  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBe(screen.getByRole('toolbar'));
});

test('renders trailing buttons as visible actions, not collapsed', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('button', { name: 'All filters' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'More actions' })
  ).not.toBeInTheDocument();
});

test('renders an icon action as a button labelled by its `label`', () => {
  render(<IconActions.Component />);

  // With room for all (the measurement layer reports no overflow), each icon
  // action is a button whose accessible name comes from its `label`.
  expect(
    screen.getByRole('button', { name: 'Download report' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Delete report' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'More actions' })
  ).not.toBeInTheDocument();
});

test('renders a vertical separator in the horizontal bar', () => {
  render(<Basic.Component />);

  const separator = screen.getByRole('separator');

  expect(separator).toBeInTheDocument();
  expect(separator).toHaveAttribute('aria-orientation', 'vertical');
});

describe('Toolbar.Group', () => {
  test('renders each group with role="group" and its label', () => {
    render(<Groups.Component />);

    expect(
      screen.getByRole('group', { name: 'Text style' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Alignment' })
    ).toBeInTheDocument();
  });

  test('leaves nested buttons enabled when not disabled', () => {
    render(<Groups.Component />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeEnabled();
    }
  });

  test('cascades disabled to nested buttons', () => {
    render(<GroupDisabled.Component />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
    }
  });
});

describe('accessible name warning', () => {
  test('warns in dev when neither aria-label nor aria-labelledby is set', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<WithoutAccessibleName.Component />);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('<Toolbar> should have an `aria-label`')
    );

    warn.mockRestore();
  });

  test('does not warn when an accessible name is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Basic.Component />);

    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('<Toolbar> should have an `aria-label`')
    );

    warn.mockRestore();
  });
});
