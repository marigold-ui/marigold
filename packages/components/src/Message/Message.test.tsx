import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Message } from '@marigold/components';

const theme = {
  messages: {
    info: {
      alignItems: 'center',
    },
    warning: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" title="Default">
        Default
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" title="info" variant="warning">
        Danger
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" title="messages">
        Default
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message
        className="custom-class-name"
        data-testid="message"
        title="message"
      >
        message
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/message/);

  expect(message.className).toMatch('custom-class-name');
});
