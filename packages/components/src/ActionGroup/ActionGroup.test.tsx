import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components';
import { Basic as ActionButtonBasic } from '../ActionButton/ActionButton.stories';
import { ActionButtonContext } from '../ActionButton/Context';
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
  test('group "size" wins over a child\'s explicit size prop', () => {
    render(<CascadePrecedence.Component />);

    const btn = screen.getByRole('button', { name: 'Outsized' });

    expect(btn).toHaveClass('h-control-small');
    expect(btn).not.toHaveClass('h-control-large');
  });

  test('local "variant" wins over the group\'s variant', () => {
    render(<CascadePrecedence.Component />);

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass(
      'text-destructive-accent'
    );
    expect(screen.getByRole('button', { name: 'Outsized' })).not.toHaveClass(
      'text-destructive-accent'
    );
  });

  test('local "disabled={false}" re-enables a button inside a disabled group', () => {
    render(<CascadePrecedence.Component />);

    expect(screen.getByRole('button', { name: 'Outsized' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save' })).not.toBeDisabled();
  });
});

test('ActionMenu trigger inside ActionGroup follows group "size" precedence', () => {
  render(<WithActionMenu.Component />);

  const menuTrigger = screen.getByRole('button', { name: 'More actions' });

  expect(menuTrigger).toHaveClass('h-control-small');
  expect(menuTrigger).not.toHaveClass('h-control-large');
});

describe('layout boundary scrub', () => {
  test('a bare ActionButton picks up the positional className from ActionButtonContext', () => {
    render(
      <Provider values={[[ActionButtonContext, { className: 'positional' }]]}>
        <ActionButtonBasic.Component aria-label="Bare">
          Bare
        </ActionButtonBasic.Component>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Bare' })).toHaveClass(
      'positional'
    );
  });

  test('ActionButtons inside an ActionGroup do NOT pick up the positional className', () => {
    render(
      <Provider values={[[ActionButtonContext, { className: 'positional' }]]}>
        <Basic.Component />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).not.toHaveClass('positional');
    }
  });
});
