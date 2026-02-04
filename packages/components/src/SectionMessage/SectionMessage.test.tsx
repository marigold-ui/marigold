import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { SectionMessage } from './SectionMessage';

const theme: Theme = {
  name: 'test',
  components: {
    CloseButton: cva({ base: 'size-4' }),
    SectionMessage: {
      container: cva({
        base: 'text-blue-500',
        variants: {
          variant: {
            info: 'items-start',
            warning: 'text-orange-700',
            error: 'text-error-text',
          },
          size: { small: 'p-1' },
        },
      }),
      content: cva({
        base: '',
        variants: {
          variant: {
            info: 'text-black',
            warning: 'items-end',
            error: 'items-start',
          },
          size: { small: 'p-1' },
        },
      }),
      title: cva({
        base: '',
        variants: {
          variant: {
            warning: 'font-bold',
          },
          size: { small: 'p-1' },
        },
      }),
      icon: cva({
        base: '',
        variants: {
          size: { small: 'p-1' },
        },
      }),
      close: cva({ base: '' }),
    },
  },
};

const { render } = setup({ theme });
const user = userEvent.setup();

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

test('allow to close message with button in message', async () => {
  render(
    <ThemeProvider theme={theme}>
      <SectionMessage data-testid="messages" variant="error" closeButton>
        <SectionMessage.Title>messages</SectionMessage.Title>
        <SectionMessage.Content>default</SectionMessage.Content>
      </SectionMessage>
    </ThemeProvider>
  );
  const message = screen.getAllByTestId(/messages/);
  const button = screen.getByRole('button');

  expect(message[0]).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-label');

  await user.click(button);

  expect(message[0]).not.toBeInTheDocument();
});

test('support controlled dismiss message', async () => {
  const Controlled = () => {
    const [close, setClose] = useState(false);

    return (
      <ThemeProvider theme={theme}>
        <SectionMessage
          data-testid="messages"
          closeButton
          close={!close}
          onCloseChange={setClose}
        >
          <SectionMessage.Title>messages</SectionMessage.Title>
          <SectionMessage.Content>default</SectionMessage.Content>
        </SectionMessage>
      </ThemeProvider>
    );
  };
  render(<Controlled />);
  const message = screen.getAllByTestId(/messages/);
  const button = screen.getByRole('button');

  expect(message[0]).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  await user.click(button);
  expect(message[0]).not.toBeInTheDocument();
});
