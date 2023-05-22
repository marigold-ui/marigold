import React from 'react';
import { screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Message } from './Message';

import { cva } from 'class-variance-authority';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
    Message: {
      container: cva('text-blue-500', {
        variants: {
          variant: {
            info: 'items-start',
            warning: 'text-orange-700',
            error: 'text-error-text',
          },
          size: { small: 'p-1' },
        },
      }),
      content: cva('', {
        variants: {
          variant: {
            info: 'text-black',
            warning: 'items-end',
            error: 'items-start',
          },
          size: { small: 'p-1' },
        },
      }),
      title: cva('', {
        variants: {
          variant: {
            warning: 'font-bold',
          },
          size: { small: 'p-1' },
        },
      }),
      icon: cva('', {
        variants: {
          size: { small: 'p-1' },
        },
      }),
    },
  },
};

const { render } = setup({ theme });

test('message container supports base styling and themeSection', () => {
  render(
    <Message data-testid="messages" messageTitle="Default">
      Default
    </Message>
  );

  const message = screen.getByTestId('messages');
  expect(message).toHaveClass(`text-blue-500`);
});

test('accepts a variant with parts and an icon', () => {
  render(
    <Message data-testid="messages" messageTitle="info" variant="warning">
      Danger
    </Message>
  );
  const container = screen.getByTestId('messages');
  const title = screen.getByText('info');
  const content = screen.getByText('Danger');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = container.firstChild;

  expect(container).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-[min-content_1fr] grid-rows-2 text-orange-700"
      data-testid="messages"
    >
      <div
        class="hidden"
      >
        <svg
          viewBox="0 0 24 24"
        >
          <path
            d="M19.2 3H4.8C3.81 3 3.009 3.81 3.009 4.8L3 21L6.6 17.4H19.2C20.19 17.4 21 16.59 21 15.6V4.8C21 3.81 20.19 3 19.2 3ZM12.9 13.8H11.1V12H12.9V13.8ZM12.9 10.2001H11.1V6.60008H12.9V10.2001Z"
          />
        </svg>
      </div>
      <div
        class="font-bold"
      >
        info
      </div>
      <div
        class="col-span-full items-end"
      >
        Danger
      </div>
    </div>
  `);
  expect(content).toMatchInlineSnapshot(`
    <div
      class="col-span-full items-end"
    >
      Danger
    </div>
  `);
  expect(title).toMatchInlineSnapshot(`
    <div
      class="font-bold"
    >
      info
    </div>
  `);

  expect(icon).toBeInTheDocument();
});

test('accepts error variant', () => {
  render(
    <Message data-testid="messages" messageTitle="error" variant="error">
      Error
    </Message>
  );

  const content = screen.getByText('Error');

  expect(content).toHaveClass(`items-start`);
});

test('accepts size', () => {
  render(
    <Message data-testid="messages" messageTitle="error" size="small">
      error
    </Message>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveClass(`p-1`);
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
