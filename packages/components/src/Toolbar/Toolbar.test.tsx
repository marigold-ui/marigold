import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  Basic,
  GroupDisabled,
  Groups,
  KeyboardNavigation,
  WithoutAccessibleName,
} from './Toolbar.stories';

test('renders with role="toolbar" and an accessible name', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('toolbar', { name: 'Event filters' })
  ).toBeInTheDocument();
});

test('lays children out as a horizontal flex row', () => {
  render(<KeyboardNavigation.Component />);

  const toolbar = screen.getByRole('toolbar', { name: 'Item actions' });
  expect(toolbar).toHaveClass('flex', 'w-full', 'items-center');
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
});
