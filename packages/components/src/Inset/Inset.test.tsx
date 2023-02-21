/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Text } from '../Text';

import { Inset } from './Inset';

const theme = {
  space: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
};

test('does not have a default spacing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inset>
        <Text>first</Text>
        <Text>second</Text>
      </Inset>
    </ThemeProvider>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).not.toHaveStyle(`padding: 0`);
  expect(inset).not.toHaveStyle(`padding-top: 0`);
  expect(inset).not.toHaveStyle(`padding-left: 0`);
});

test('allows to add spacing equally on all sides', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inset space="small">
        <Text>first</Text>
        <Text>second</Text>
      </Inset>
    </ThemeProvider>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveStyle(`padding: ${theme.space.small}px`);
});

test('allows to add horizontal spacing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inset spaceX="medium">
        <Text>first</Text>
        <Text>second</Text>
      </Inset>
    </ThemeProvider>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveStyle(`padding-left: ${theme.space.medium}px`);
  expect(inset).toHaveStyle(`padding-right: ${theme.space.medium}px`);
});

test('allows to add vertical spacing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inset spaceY="large">
        <Text>first</Text>
        <Text>second</Text>
      </Inset>
    </ThemeProvider>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveStyle(`padding-top: ${theme.space.large}px`);
  expect(inset).toHaveStyle(`padding-bottom: ${theme.space.large}px`);
});

test('allows to add different vertical/horizontal spacing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inset spaceX="large" spaceY="small">
        <Text>first</Text>
        <Text>second</Text>
      </Inset>
    </ThemeProvider>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveStyle(`padding-left: ${theme.space.large}px`);
  expect(inset).toHaveStyle(`padding-right: ${theme.space.large}px`);
  expect(inset).toHaveStyle(`padding-top: ${theme.space.small}px`);
  expect(inset).toHaveStyle(`padding-bottom: ${theme.space.small}px`);
});
