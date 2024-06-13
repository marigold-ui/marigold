import { screen } from '@testing-library/react';
import { createRef } from 'react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Message } from './Message';

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
    <Message data-testid="messages">
      <Message.Title>Default</Message.Title>
      <Message.Content>Default Content</Message.Content>
    </Message>
  );

  const message = screen.getByTestId('messages');
  expect(message).toHaveClass(`text-blue-500`);
});

test('accepts a variant with parts and an icon and support grid areas', () => {
  render(
    <Message data-testid="messages" variant="warning">
      <Message.Title>info</Message.Title>
      <Message.Content>Danger</Message.Content>
    </Message>
  );
  const container = screen.getByTestId('messages');
  const title = screen.getByText('info');
  const content = screen.getByText('Danger');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = container.firstChild;

  expect(container.className).toMatchInlineSnapshot(
    `"grid auto-rows-min text-orange-700"`
  );
  expect(content.className).toMatchInlineSnapshot(
    `"[grid-area:content] items-end"`
  );
  expect(title.className).toMatchInlineSnapshot(
    `"[grid-area:title] font-bold"`
  );

  expect(icon).toBeInTheDocument();
});

test('accepts error variant', () => {
  render(
    <Message data-testid="messages" variant="error">
      <Message.Title>error</Message.Title>
      <Message.Content>Error</Message.Content>
    </Message>
  );

  const content = screen.getByText('Error');

  expect(content).toHaveClass(`items-start`);
});

test('accepts size', () => {
  render(
    <Message data-testid="messages" size="small">
      <Message.Title>error</Message.Title>
      <Message.Content>Error</Message.Content>
    </Message>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveClass(`p-1`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Message data-testid="messages">
        <Message.Title>messages</Message.Title>
        <Message.Content>default</Message.Content>
      </Message>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});
