import { render, screen } from '@testing-library/react';
import {
  Basic,
  CascadePrecedence,
  DisabledCascade,
  WithActionMenu,
} from './ActionGroup.stories';

test('renders ActionGroup as a toolbar', () => {
  render(<Basic.Component />);
  expect(
    screen.getByRole('toolbar', { name: 'Item actions' })
  ).toBeInTheDocument();
});

test('cascades disabled to children inside ActionGroup', () => {
  render(<DisabledCascade.Component />);
  const buttons = screen.getAllByRole('button');
  for (const button of buttons) {
    expect(button).toBeDisabled();
  }
});

describe('cascade precedence', () => {
  beforeEach(() => render(<CascadePrecedence.Component />));

  test('group "size" wins over a child\'s explicit size prop', () => {
    const btn = screen.getByRole('button', { name: 'Outsized' });
    expect(btn).toHaveClass('h-control-small');
    expect(btn).not.toHaveClass('h-control-large');
  });

  test('local "variant" wins over the group\'s variant', () => {
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass(
      'text-destructive-accent'
    );
    expect(screen.getByRole('button', { name: 'Outsized' })).not.toHaveClass(
      'text-destructive-accent'
    );
  });

  test('local "disabled={false}" re-enables a button inside a disabled group', () => {
    expect(screen.getByRole('button', { name: 'Outsized' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save' })).not.toBeDisabled();
  });
});

test('ActionMenu trigger inside ActionGroup follows group "size" precedence', () => {
  render(<WithActionMenu.Component />);
  const menuTrigger = screen.getByRole('button', { name: 'More actions' });
  // Group size="small" wins over the ActionMenu's local size="large"
  expect(menuTrigger).toHaveClass('h-control-small');
  expect(menuTrigger).not.toHaveClass('h-control-large');
});
