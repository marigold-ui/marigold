import { render, screen } from '@testing-library/react';
import { KeyboardContext } from 'react-aria-components/Keyboard';
import { Provider } from 'react-aria-components/slots';
import { Basic } from './Keyboard.stories';

test('renders as a kbd element', () => {
  render(<Basic.Component>⌘K</Basic.Component>);

  const el = screen.getByText('⌘K');

  expect(el.tagName).toBe('KBD');
});

test('picks up className from KeyboardContext', () => {
  render(
    <Provider values={[[KeyboardContext, { className: 'context-class' }]]}>
      <Basic.Component>⌘K</Basic.Component>
    </Provider>
  );

  expect(screen.getByText('⌘K')).toHaveClass('context-class');
});
