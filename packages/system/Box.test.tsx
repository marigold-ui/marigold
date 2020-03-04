import React from 'react';
import { render } from '@testing-library/react';
import { Box } from './Box';

/**
 * test cases for box component
 */

test('render a default box component without any props', () => {
  const { getByText } = render(<Box>I am a div!</Box>);

  const btn = getByText('I am a div!');
  expect(btn instanceof HTMLDivElement).toBeTruthy();
});

test('change box component via "as" prop to button', () => {
  const { getByText } = render(
    <Box as="button" type="button">
      I am a button!
    </Box>
  );
  const btn = getByText('I am a button!');

  expect(btn instanceof HTMLButtonElement).toBeTruthy();
});

test('apply custom styling in box component', () => {
  const Component: React.FC = ({ children }) => (
    <Box css={{ display: 'flex' }}>{children}</Box>
  );
  const { getByText } = render(<Component>TEST</Component>);

  expect(getByText('TEST')).toHaveStyle('display: flex');
});

test('apply styling based on styled-system', () => {});

test('accept true and false in styling a component with a color', () => {
  const Component: React.FC<{ bool?: boolean }> = ({ bool, children }) => (
    <Box css={bool && { color: 'red' }}>{children}</Box>
  );
  const { getByText, rerender } = render(
    <Component bool={false}>TEST</Component>
  );

  expect(getByText('TEST')).not.toHaveStyle('color: red');

  rerender(<Component bool={true}>TEST</Component>);
  expect(getByText('TEST')).toHaveStyle('color: red');
});

test('compose multiple styles', () => {
  const { getByText } = render(
    <Box css={[{ color: 'red', padding: 1 }, { color: 'hotpink' }]}>
      COMPOSE
    </Box>
  );

  const node = getByText('COMPOSE');
  expect(node).toHaveStyle('color: hotpink');
  expect(node).toHaveStyle('padding: 4px');
});

test('use ref to reference to a defined html button element', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" type="button" ref={ref}>
      I am a button!
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('render a button component with primary style from a theme via key', () => {});

test('render a button component with secondary style from a theme via variant', () => {});

test('render a button component with primary style from a theme and change a style element', () => {});
