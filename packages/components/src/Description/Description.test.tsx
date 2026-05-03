import { render, screen } from '@testing-library/react';
import { Provider, TextContext } from 'react-aria-components';
import { Basic } from './Description.stories';

test('renders as a paragraph by default', () => {
  render(<Basic.Component data-testid="description">Hi there</Basic.Component>);
  const el = screen.getByTestId('description');
  expect(el.tagName).toBe('P');
  expect(el).toHaveTextContent('Hi there');
});

test('respects the "as" prop', () => {
  render(
    <Basic.Component as="span" data-testid="description">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('description').tagName).toBe('SPAN');
});

test('applies theme classes for the muted variant', () => {
  render(
    <Basic.Component variant="muted" data-testid="description">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('description')).toHaveClass('text-tertiary');
});

test('applies theme classes for the size prop', () => {
  render(
    <Basic.Component size="sm" data-testid="description">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('description')).toHaveClass('text-sm');
});

test('participates in TextContext via the default "description" slot', () => {
  render(
    <Provider
      values={[
        [
          TextContext,
          { slots: { description: { className: 'context-class' } } },
        ],
      ]}
    >
      <Basic.Component data-testid="description">Hi</Basic.Component>
    </Provider>
  );
  const el = screen.getByTestId('description');
  expect(el).toHaveClass('context-class');
  expect(el).toHaveClass('text-secondary');
});

test('sets a CSS color variable from the color prop', () => {
  render(
    <Basic.Component color="emerald" data-testid="description">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('description').getAttribute('style')).toContain(
    'var(--color-emerald, emerald)'
  );
});
