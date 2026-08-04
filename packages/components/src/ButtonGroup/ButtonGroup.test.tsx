import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components/slots';
import { Basic as ButtonBasic } from '../Button/Button.stories';
import { ButtonContext } from '../Button/Context';
import {
  ActionMenuLocalSize,
  Basic,
  CascadePrecedence,
  DisabledCascade,
  WithActionMenu,
} from './ButtonGroup.stories';

test('renders ButtonGroup as a toolbar', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('toolbar', { name: 'Item actions' })
  ).toBeInTheDocument();
});

describe('layout', () => {
  test('a standalone group lays its buttons out as a spaced flex row', () => {
    render(<Basic.Component />);

    const toolbar = screen.getByRole('toolbar', { name: 'Item actions' });
    expect(toolbar).toHaveClass('flex', 'items-center', 'gap-1');
  });

  test('a positional className from a container coexists with the layout', () => {
    render(
      <Provider
        values={[
          [ButtonContext, { className: 'self-center [grid-area:actions]' }],
        ]}
      >
        <Basic.Component />
      </Provider>
    );

    const toolbar = screen.getByRole('toolbar', { name: 'Item actions' });
    // Container positioning is applied to the group itself...
    expect(toolbar).toHaveClass('[grid-area:actions]', 'self-center');
    // ...without dropping the group's own flex layout.
    expect(toolbar).toHaveClass('flex', 'gap-1');
  });
});

test('cascades disabled to children inside ButtonGroup', () => {
  render(<DisabledCascade.Component />);

  const buttons = screen.getAllByRole('button');

  for (const button of buttons) {
    expect(button).toBeDisabled();
  }
});

describe('cascade precedence (local always wins)', () => {
  test('local "size" wins over the group\'s size', () => {
    render(<CascadePrecedence.Component />);

    const btn = screen.getByRole('button', { name: 'Outsized' });

    expect(btn).toHaveClass('h-control-large');
    expect(btn).not.toHaveClass('h-control-small');
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

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save' })).not.toBeDisabled();
  });
});

test('ActionMenu trigger inside ButtonGroup inherits the group size', () => {
  render(<WithActionMenu.Component />);

  const menuTrigger = screen.getByRole('button', { name: 'More actions' });

  // With no local size, the ActionMenu trigger inherits the group's `small`.
  expect(menuTrigger).toHaveClass('h-control-small');
  expect(menuTrigger).not.toHaveClass('h-control-large');
});

test('ActionMenu trigger inside ButtonGroup follows local-wins size precedence', () => {
  render(<ActionMenuLocalSize.Component />);

  const menuTrigger = screen.getByRole('button', { name: 'More actions' });

  // An explicit local `size` on the ActionMenu wins over the group's `small`.
  expect(menuTrigger).toHaveClass('h-control-large');
  expect(menuTrigger).not.toHaveClass('h-control-small');
});

describe('positional className boundary', () => {
  test('a bare Button picks up the positional className from ButtonContext', () => {
    render(
      <Provider values={[[ButtonContext, { className: 'positional' }]]}>
        <ButtonBasic.Component aria-label="Bare">Bare</ButtonBasic.Component>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Bare' })).toHaveClass(
      'positional'
    );
  });

  test('Buttons inside a ButtonGroup do NOT inherit the positional className', () => {
    render(
      <Provider values={[[ButtonContext, { className: 'positional' }]]}>
        <Basic.Component />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).not.toHaveClass('positional');
    }
  });
});
