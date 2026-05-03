import { render, screen } from '@testing-library/react';
import {
  ListBox,
  ListBoxItem,
  Provider,
  TextContext,
} from 'react-aria-components';
import { Basic } from './TextValue.stories';

test('renders as a span by default', () => {
  render(<Basic.Component data-testid="text-value">Apple</Basic.Component>);
  const el = screen.getByTestId('text-value');
  expect(el.tagName).toBe('SPAN');
  expect(el).toHaveTextContent('Apple');
});

test('respects the "as" prop', () => {
  render(
    <Basic.Component as="div" data-testid="text-value">
      Apple
    </Basic.Component>
  );
  expect(screen.getByTestId('text-value').tagName).toBe('DIV');
});

test('participates in TextContext via the default "label" slot', () => {
  render(
    <Provider
      values={[
        [TextContext, { slots: { label: { className: 'context-class' } } }],
      ]}
    >
      <Basic.Component data-testid="text-value">Apple</Basic.Component>
    </Provider>
  );
  expect(screen.getByTestId('text-value')).toHaveClass('context-class');
});

test('lets a custom slot pick up its own context entry', () => {
  render(
    <Provider
      values={[
        [
          TextContext,
          { slots: { custom: { className: 'custom-context-class' } } },
        ],
      ]}
    >
      <Basic.Component slot="custom" data-testid="text-value">
        Apple
      </Basic.Component>
    </Provider>
  );
  expect(screen.getByTestId('text-value')).toHaveClass('custom-context-class');
});

test('makes the option accessible name resolve from its children inside a ListBoxItem', () => {
  render(
    <ListBox aria-label="Fruits">
      <ListBoxItem id="apple">
        <Basic.Component>Apple</Basic.Component>
      </ListBoxItem>
    </ListBox>
  );
  expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
});
