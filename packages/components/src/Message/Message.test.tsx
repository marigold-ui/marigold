import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Message } from './Message';

const theme = {
  colors: {
    primary: 'hotpink',
  },
  spaces: {
    small: '10px',
    medium: '20px',
  },
  components: {
    message: {
      base: {
        color: 'primary',
      },
      variant: {
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
      size: {
        small: {
          p: 'small',
        },
      },
    },
  },
};

test('supports base styling and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="Default">
        Default
      </Message>
    </ThemeProvider>
  );

  const message = screen.getByTestId(/messages/);
  console.log(message.style);

  expect(message).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('accepts variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="info" variant="warning">
        Danger
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: right`);
});

test('accepts other third variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="error" variant="error">
        error
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`align-items: left`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="messages">
        Default
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});
