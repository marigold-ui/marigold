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

test('apply custom styling in box component', () => {});

test('apply styling based on styled-system', () => {});

test('accept true and false in styling a component with a color', () => {});

test('compose multiple styles', () => {});

test('use ref to reference to a defined html button element', () => {});

test('render a button component with primary style from a theme via key', () => {});

test('render a button component with secondary style from a theme via variant', () => {});

test('render a button component with primary style from a theme and change a style element', () => {});
