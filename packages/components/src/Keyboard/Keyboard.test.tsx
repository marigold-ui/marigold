import { render, screen } from '@testing-library/react';
import { KeyboardContext } from 'react-aria-components/Keyboard';
import { Provider } from 'react-aria-components/slots';
import { Basic } from './Keyboard.stories';

test('renders as a kbd element', () => {
  render(<Basic.Component data-testid="keyboard">⌘K</Basic.Component>);

  const el = screen.getByTestId('keyboard');

  expect(el.tagName).toBe('KBD');
  expect(el).toHaveTextContent('⌘K');
});

test('picks up className from KeyboardContext', () => {
  render(
    <Provider values={[[KeyboardContext, { className: 'context-class' }]]}>
      <Basic.Component data-testid="keyboard">⌘K</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('keyboard')).toHaveClass('context-class');
});
