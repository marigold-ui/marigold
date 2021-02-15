import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Message } from '@marigold/components';

const theme = {
  messages: {
    info: {
      alignItems: 'center',
    },
    warning: {
      alignItems: 'right',
    },
    error: {
      alignItems: 'left',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Message data-testid="messages" messageTitle="Default">
        Default
      </Message>
    </MarigoldProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Message data-testid="messages" messageTitle="info" variant="warning">
        Danger
      </Message>
    </MarigoldProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: right`);
});

test('accepts other third variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Message data-testid="messages" messageTitle="error" variant="error">
        error
      </Message>
    </MarigoldProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: left`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Message data-testid="messages" messageTitle="messages">
        Default
      </Message>
    </MarigoldProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Message
        className="custom-class-name"
        data-testid="message"
        messageTitle="message"
      >
        message
      </Message>
    </MarigoldProvider>
  );
  const message = screen.getByTestId(/message/);

  expect(message.className).toMatch('custom-class-name');
});
