import React from 'react';
import { screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Message } from './Message';
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

  expect(container.className).toMatchInlineSnapshot(
    `"grid grid-cols-[min-content_1fr] grid-rows-2 text-orange-700"`
  );
  expect(content.className).toMatchInlineSnapshot(`"col-span-full items-end"`);
  expect(title.className).toMatchInlineSnapshot(`"font-bold"`);

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
