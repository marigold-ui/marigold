import React from 'react';
import { render } from '@testing-library/react';
import { Box } from './Box';

/**
 * test cases for box component
 */

test('render a <div> by default', () => {
  const { getByText } = render(<Box>I am Box!</Box>);
  const result = getByText('I am Box!');

  expect(result instanceof HTMLDivElement).toBeTruthy();
});

test('change rendered element via "as" prop', () => {
  const { getByText } = render(<Box as="span">I am Box!</Box>);
  const result = getByText('I am Box!');

  expect(result instanceof HTMLSpanElement).toBeTruthy();
});

test('pass down all HTML attributes', () => {
  const { getByText } = render(
    <Box id="id" disabled>
      I am Box!
    </Box>
  );
  const result = getByText('I am Box!');

  expect(result.getAttribute('id')).toEqual('id');
  expect(result.getAttribute('disabled')).toMatch('');
});

test('apply some base css styling for normalization', () => {
  const { getByText } = render(<Box>I am Box!</Box>);
  const element = getByText('I am Box!');

  expect(element).toHaveStyle('box-sizing: border-box');
  expect(element).toHaveStyle('margin: 0');
  expect(element).toHaveStyle('min-width: 0');
});

test('forward ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" type="button" ref={ref}>
      I am a button!
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

// TODO: better description
test('apply base styling for custom components', () => {
  const Button: React.FC = ({ children }) => (
    <Box as="button" css={{ border: '1px solid black' }}>
      {children}
    </Box>
  );

  const { getByText } = render(<Button>I am Custom Button!</Button>);
  const element = getByText('I am Custom Button!');

  expect(element).toHaveStyle('border: 1px solid black');
});

// test('allow to apply styling via "css" prop', () => {});

// test('apply custom styling in box component', () => {});

// test('apply styling based on styled-system', () => {});

// test('compose multiple styles', () => {});

// test('accept true and false in styling a component with a color', () => {});

test('render a button component with primary style from a theme via key', () => {});

test('render a button component with secondary style from a theme via variant', () => {});

test('render a button component with primary style from a theme and change a style element', () => {});
