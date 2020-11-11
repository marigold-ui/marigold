import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Message } from '@marigold/components';

const theme = {
  content: {
    messages: {
      alignItems: 'center',
    },
    info: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="messages">Default</Message>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/messages/);

  expect(alert).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="info" variant="info">
        Danger
      </Message>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/info/);

  expect(alert).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="messages">Default</Message>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/messages/);

  expect(alert instanceof HTMLDivElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="messages" css={{ alignItems: 'left' }}>
        Default
      </Message>
    </ThemeProvider>
  );
  const alert = screen.getByTitle(/messages/);

  expect(alert).toHaveStyle(`align-items: center`);
  expect(alert).not.toHaveStyle(`align-items: left`);
});
