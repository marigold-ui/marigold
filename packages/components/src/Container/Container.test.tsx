import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Container, Text } from '@marigold/components';

const theme = {
  layout: {
    container: {
      margin: 0,
    },
    notcontainer: {
      margin: '2px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Container title="container">
        <Text>sdf</Text>
      </Container>
    </MarigoldProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container).toHaveStyle(`margin: 0`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Container variant="notcontainer" title="container">
        <Text>sdf</Text>
      </Container>
    </MarigoldProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container).toHaveStyle(`margin: 2px`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Container title="container">
        <Text>sdf</Text>
      </Container>
    </MarigoldProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container instanceof HTMLDivElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Container css={{ margin: '10px' }} title="container">
        <Text>sdf</Text>
      </Container>
    </MarigoldProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container).toHaveStyle(`margin: 0`);
  expect(container).not.toHaveStyle(`margin: 10px`);
});
