import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Container, Text } from '@marigold/components';

const theme = {
  layout: {
    container: {
      margin: 0,
    },
    notContainer: {
      margin: '2px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Container title="container">
        <Text>sdf</Text>
      </Container>
    </ThemeProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container).toHaveStyle(`margin: 0`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Container variant="notContainer" title="container">
        <Text>sdf</Text>
      </Container>
    </ThemeProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container).toHaveStyle(`margin: 2px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Container title="container">
        <Text>sdf</Text>
      </Container>
    </ThemeProvider>
  );
  const container = screen.getByTitle(/container/);

  expect(container instanceof HTMLDivElement).toBeTruthy();
});
