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
  const message = screen.getByTitle(/messages/);

  expect(message).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="info" variant="info">
        Danger
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTitle(/info/);

  expect(message).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message title="messages">Default</Message>
    </ThemeProvider>
  );
  const message = screen.getByTitle(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message className="custom-class-name" title="message">
        message
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTitle(/message/);

  expect(message.className).toMatch('custom-class-name');
});
