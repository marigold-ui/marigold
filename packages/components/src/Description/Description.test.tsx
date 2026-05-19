import { render, screen } from '@testing-library/react';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { Basic } from './Description.stories';

test('renders as a span by default', () => {
  render(<Basic.Component data-testid="description">Hi there</Basic.Component>);

  const el = screen.getByTestId('description');

  expect(el.tagName).toBe('SPAN');
  expect(el).toHaveTextContent('Hi there');
});

test('honors `elementType` from a TextContext slot', () => {
  render(
    <Provider
      values={[[TextContext, { slots: { description: { elementType: 'p' } } }]]}
    >
      <Basic.Component data-testid="description">Hi</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('description').tagName).toBe('P');
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

  expect(screen.getByTestId('description')).toHaveClass('context-class');
});
