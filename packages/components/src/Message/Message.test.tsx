import React from 'react';
import { render, screen, within } from '@testing-library/react';
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
  fonts: {
    body: 'Oswald',
  },
  components: {
    Message: {
      base: {
        container: {
          color: 'primary',
        },
      },
      variant: {
        info: {
          container: {
            alignItems: 'center',
          },
          content: {
            color: 'black',
          },
        },
        warning: {
          container: {
            color: 'orange',
          },
          content: {
            alignItems: 'right',
          },
          title: {
            fontFamily: 'body',
          },
        },
        error: {
          container: {
            color: 'red',
          },
          content: {
            alignItems: 'left',
          },
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

test('message container supports base styling and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="Default">
        Default
      </Message>
    </ThemeProvider>
  );

  const message = screen.getByTestId(/messages/);
  expect(message).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('accepts a variant with parts and an icon', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="info" variant="warning">
        Danger
      </Message>
    </ThemeProvider>
  );
  const container = screen.getByTestId('messages');
  const title = screen.getByText('info');
  const content = screen.getByText('Danger');
  const icon = within(container).getByRole(/presentation/);

  expect(container).toHaveStyle(`color: orange`);
  expect(content).toHaveStyle(`align-items: right`);
  expect(title).toHaveStyle(`font-family: Oswald`);

  expect(icon).toBeInTheDocument();
});

test('accepts size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages" messageTitle="error" size="small">
        error
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveStyle(`padding: ${theme.spaces.small}px`);
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
