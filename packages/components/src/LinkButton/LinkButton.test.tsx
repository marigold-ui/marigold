import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext } from '../Button/Context';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
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

test('inherits variant and size from ButtonContext provider', () => {
  render(
    <Provider
      values={[[ButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('link')).toHaveClass('h-control-large');
});

test('explicit size overrides ButtonContext size', () => {
  render(
    <Provider
      values={[[ButtonContext, { variant: 'secondary', size: 'large' }]]}
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

test('local size wins over the enclosing ButtonGroup (uniform precedence)', () => {
  render(
    <ButtonGroup aria-label="Row actions" size="small">
      <Basic.Component size="large" data-testid="link">
        Edit
      </Basic.Component>
    </ButtonGroup>
  );

  const link = screen.getByTestId('link');

  expect(link).toHaveClass('h-control-large');
  expect(link).not.toHaveClass('h-control-small');
});

test('local variant wins over ButtonGroup variant', () => {
  render(
    <ButtonGroup aria-label="Row actions" variant="ghost">
      <Basic.Component variant="destructive-ghost" data-testid="link">
        Delete
      </Basic.Component>
    </ButtonGroup>
  );

  expect(screen.getByTestId('link')).toHaveClass('text-destructive-accent');
});

test('inherits secondary baseline from ButtonGroup with no explicit variant', () => {
  render(
    <ButtonGroup aria-label="Row actions">
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </ButtonGroup>
  );

  expect(screen.getByTestId('link')).toHaveClass('ui-soft');
  expect(screen.getByTestId('link')).not.toHaveClass(
    'hover:ui-state-hover-ghost'
  );
});

test('absorbs positional className from ButtonContext', () => {
  render(
    <Provider values={[[ButtonContext, { className: 'positional-class' }]]}>
      <Basic.Component data-testid="link">Edit</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('link')).toHaveClass('positional-class');
});
