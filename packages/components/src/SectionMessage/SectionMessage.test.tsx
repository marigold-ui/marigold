import { screen } from '@testing-library/react';
import { createRef } from 'react';

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
    <SectionMessage data-testid="messages" messageTitle="Default">
      Default
    </SectionMessage>
  );

  const message = screen.getByTestId('messages');
  expect(message).toHaveClass(`text-blue-500`);
});

test('accepts a variant with parts and an icon', () => {
  render(
    <SectionMessage
      data-testid="messages"
      messageTitle="info"
      variant="warning"
    >
      Danger
    </SectionMessage>
  );
  const container = screen.getByTestId('messages');
  const title = screen.getByText('info');
  const content = screen.getByText('Danger');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = container.firstChild;

  expect(container.className).toMatchInlineSnapshot(
    `"grid auto-rows-min grid-cols-[min-content_auto] gap-1 text-orange-700"`
  );
  expect(content.className).toMatchInlineSnapshot(`"col-start-2 items-end"`);
  expect(title.className).toMatchInlineSnapshot(
    `"col-start-2 row-start-1 self-center font-bold"`
  );

  expect(icon).toBeInTheDocument();
});

test('accepts error variant', () => {
  render(
    <SectionMessage data-testid="messages" messageTitle="error" variant="error">
      Error
    </SectionMessage>
  );

  const content = screen.getByText('Error');

  expect(content).toHaveClass(`items-start`);
});

test('accepts size', () => {
  render(
    <SectionMessage data-testid="messages" messageTitle="error" size="small">
      error
    </SectionMessage>
  );
  const message = screen.getByTestId(/messages/);

  expect(message).toHaveClass(`p-1`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <SectionMessage data-testid="messages" messageTitle="messages">
        Default
      </SectionMessage>
    </ThemeProvider>
  );
  const message = screen.getByTestId(/messages/);

  expect(message instanceof HTMLDivElement).toBeTruthy();
});

test('forwards ref', () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <ThemeProvider theme={theme}>
      <SectionMessage data-testid="messages" messageTitle="messages" ref={ref}>
        Default
      </SectionMessage>
    </ThemeProvider>
  );

  expect(ref.current instanceof HTMLDivElement).toBeTruthy();
});
