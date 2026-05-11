import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-aria-components';
import { Basic } from './ActionButton.stories';
import { ActionButtonContext } from './Context';

const user = userEvent.setup();

test('renders an action button by default with the ghost variant', () => {
  render(<Basic.Component data-testid="action">Click</Basic.Component>);

  const btn = screen.getByTestId('action');

  expect(btn.tagName).toBe('BUTTON');
  expect(btn).toHaveTextContent('Click');
});

test('forwards a ref to the underlying button', () => {
  const ref = { current: null as HTMLButtonElement | null };

  render(
    <Basic.Component ref={ref} data-testid="action">
      Click
    </Basic.Component>
  );

  expect(ref.current).not.toBeNull();
  expect(ref.current?.tagName).toBe('BUTTON');
});

test('disabled prop maps to RAC isDisabled', async () => {
  const onPress = vi.fn();
  render(
    <Basic.Component disabled onPress={onPress} data-testid="action">
      Click
    </Basic.Component>
  );

  await user.click(screen.getByTestId('action'));

  expect(onPress).not.toHaveBeenCalled();
});

test('inherits variant and size from ActionButtonContext provider', () => {
  render(
    <Provider
      values={[[ActionButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <Basic.Component data-testid="action">Click</Basic.Component>
    </Provider>
  );

  // 'large' size compound variant adds 'h-control-large'
  expect(screen.getByTestId('action')).toHaveClass('h-control-large');
});

test('explicit size overrides ActionButtonContext size', () => {
  render(
    <Provider
      values={[[ActionButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <Basic.Component size="small" data-testid="action">
        Click
      </Basic.Component>
    </Provider>
  );

  const btn = screen.getByTestId('action');

  expect(btn).toHaveClass('h-control-small');
  expect(btn).not.toHaveClass('h-control-large');
});
