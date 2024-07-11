import { screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { SectionMessage } from './SectionMessage';

const theme: Theme = {
  name: 'test',
  components: {
    SectionMessage: {
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
    <SectionMessage data-testid="messages">
      <SectionMessage.Title>Default</SectionMessage.Title>
      <SectionMessage.Content>Default Content</SectionMessage.Content>
    </SectionMessage>
  );

  const message = screen.getByTestId('messages');
  expect(message).toHaveClass(`text-blue-500`);
});

test('accepts a variant with parts and an icon and support grid areas', () => {
  render(
    <SectionMessage data-testid="messages" variant="warning">
      <SectionMessage.Title>info</SectionMessage.Title>
      <SectionMessage.Content>Danger</SectionMessage.Content>
    </SectionMessage>
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
    <SectionMessage data-testid="messages" variant="error">
      <SectionMessage.Title>error</SectionMessage.Title>
      <SectionMessage.Content>Error</SectionMessage.Content>
    </SectionMessage>
  );

  const content = screen.getByText('Error');

  expect(content).toHaveClass(`items-start`);
});

test('accepts size', () => {
  render(
    <SectionMessage data-testid="messages" size="small">
      <SectionMessage.Title>error</SectionMessage.Title>
      <SectionMessage.Content>Error</SectionMessage.Content>
    </SectionMessage>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveClass(`p-1`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <SectionMessage data-testid="messages">
        <SectionMessage.Title>messages</SectionMessage.Title>
        <SectionMessage.Content>default</SectionMessage.Content>
      </SectionMessage>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});

test('set alert role if variant is "error"', () => {
  render(
    <ThemeProvider theme={theme}>
      <SectionMessage data-testid="messages" variant="error">
        <SectionMessage.Title>messages</SectionMessage.Title>
        <SectionMessage.Content>default</SectionMessage.Content>
      </SectionMessage>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveAttribute('role', 'alert');
});
