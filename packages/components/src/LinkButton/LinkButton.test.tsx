import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroup } from '../ActionGroup/ActionGroup';
import { Basic } from './LinkButton.stories';

test('renders children', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('link')).toHaveTextContent('Link Button');
});

test('renders <a> element', () => {
  render(<Basic.Component href="www.reservix.net" />);

  expect(screen.getByRole('link')).toHaveAttribute('href', 'www.reservix.net');
});

test('forwards additional props', () => {
  render(<Basic.Component data-testid="custom-link" />);

  expect(screen.getByTestId('custom-link')).toBeInTheDocument();
});

test('supports fullWidth', () => {
  render(<Basic.Component fullWidth />);

  expect(screen.getByRole('link')).toHaveClass('w-full');
});

test('inherits variant and size from ActionButtonContext provider', () => {
  render(
    <Provider
      values={[[ActionButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('link')).toHaveClass('h-control-large');
});

test('explicit size overrides ActionButtonContext size', () => {
  render(
    <Provider
      values={[[ActionButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <Basic.Component size="small" data-testid="link">
        Edit
      </Basic.Component>
    </Provider>
  );

  const link = screen.getByTestId('link');

  expect(link).toHaveClass('h-control-small');
  expect(link).not.toHaveClass('h-control-large');
});

test('inherits size from enclosing ActionGroup (group wins over local)', () => {
  render(
    <ActionGroup aria-label="Row actions" size="small">
      <Basic.Component size="large" data-testid="link">
        Edit
      </Basic.Component>
    </ActionGroup>
  );

  expect(screen.getByTestId('link')).toHaveClass('h-control-small');
});

test('local variant wins over ActionGroup variant', () => {
  render(
    <ActionGroup aria-label="Row actions" variant="ghost">
      <Basic.Component variant="destructive-ghost" data-testid="link">
        Delete
      </Basic.Component>
    </ActionGroup>
  );

  expect(screen.getByTestId('link')).toHaveClass('text-destructive-accent');
});

test('inherits ghost baseline from ActionGroup with no explicit variant', () => {
  render(
    <ActionGroup aria-label="Row actions">
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </ActionGroup>
  );

  expect(screen.getByTestId('link')).toHaveClass('hover:ui-state-hover-ghost');
});

test('absorbs className from ActionButtonContext', () => {
  render(
    <Provider
      values={[[ActionButtonContext, { className: 'positional-class' }]]}
    >
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('link')).toHaveClass('positional-class');
});
