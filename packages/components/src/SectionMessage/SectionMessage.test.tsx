import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Provider } from 'react-aria-components/slots';
import { afterEach, vi } from 'vitest';
import { announce } from '@react-aria/live-announcer';
import { ButtonContext } from '../Button/Context';
import { Basic, WithAction, WithDescription } from './SectionMessage.stories';

vi.mock('@react-aria/live-announcer', () => ({
  announce: vi.fn(),
}));

afterEach(() => {
  vi.mocked(announce).mockClear();
});

const user = userEvent.setup();

test('message container supports base styling and themeSection', () => {
  render(<Basic.Component data-testid="messages" />);

  const message = screen.getAllByTestId('messages')[0];
  expect(message).toBeInTheDocument();
});

test('accepts a variant with parts and an icon and support grid areas', () => {
  render(<Basic.Component data-testid="messages" variant="warning" />);

  const container = screen.getAllByTestId('messages')[0];
  const title = screen.getAllByText('Danger Zone!')[0];
  // eslint-disable-next-line testing-library/no-node-access
  const icon = container.firstChild;

  expect(container).toHaveClass('grid');
  expect(title).toHaveClass('[grid-area:title]');
  expect(icon).toBeInTheDocument();
});

test('renders the title as a semantic heading (default level 3)', () => {
  render(<Basic.Component />);

  const heading = screen.getAllByRole('heading', { name: 'Danger Zone!' })[0];
  expect(heading.tagName).toBe('H3');
});

test('supports configuring the heading level', () => {
  render(<Basic.Component headingLevel={2} />);

  const heading = screen.getAllByRole('heading', { name: 'Danger Zone!' })[0];
  expect(heading.tagName).toBe('H2');
});

test('container is a group labelled by the title', () => {
  render(<Basic.Component />);

  const container = screen.getAllByRole('group', { name: 'Danger Zone!' })[0];
  const heading = screen.getAllByRole('heading', { name: 'Danger Zone!' })[0];
  expect(heading).toHaveAttribute('id');
  expect(container).toHaveAttribute('aria-labelledby', heading.id);
});

test('renders an optional description via the description slot', () => {
  render(<WithDescription.Component />);

  const description = screen.getAllByText(
    'All files were copied to the archive.'
  )[0];
  expect(description.tagName).toBe('P');
  expect(description).toHaveClass('[grid-area:description]');
});

test('accepts error variant', () => {
  render(<Basic.Component data-testid="messages" variant="error" />);

  const content = screen.getAllByText('Hello, I am a simple message.')[0];
  expect(content).toBeInTheDocument();
});

test('accepts size', () => {
  render(<Basic.Component data-testid="messages" size="small" />);

  const message = screen.getAllByTestId(/messages/)[0];
  expect(message).toBeInTheDocument();
});

test('announces assertively when variant is "error"', () => {
  render(<Basic.Component data-testid="messages" variant="error" />);

  expect(announce).toHaveBeenCalledWith(expect.any(String), 'assertive');
});

test('passes the title and content text to the announcer', () => {
  render(<Basic.Component data-testid="messages" variant="error" />);

  expect(announce).toHaveBeenCalledWith(
    expect.stringContaining('Danger Zone!'),
    'assertive'
  );
  expect(announce).toHaveBeenCalledWith(
    expect.stringContaining('Hello, I am a simple message.'),
    'assertive'
  );
});

test('does not announce non-error variants by default', () => {
  render(<Basic.Component data-testid="messages" variant="success" />);

  expect(announce).not.toHaveBeenCalled();
});

test('announces politely when `announce` is set on a non-error variant', () => {
  render(<Basic.Component data-testid="messages" variant="success" announce />);

  expect(announce).toHaveBeenCalledWith(expect.any(String), 'polite');
});

test('does not announce when `announce={false}` overrides the error default', () => {
  render(
    <Basic.Component data-testid="messages" variant="error" announce={false} />
  );

  expect(announce).not.toHaveBeenCalled();
});

test('scopes content action buttons from an inherited ButtonContext cascade', () => {
  render(
    <Provider values={[[ButtonContext, { className: 'leaked-grid' }]]}>
      <WithAction.Component />
    </Provider>
  );

  expect(
    screen.getAllByRole('button', { name: 'Upgrade plan' })[0]
  ).not.toHaveClass('leaked-grid');
});

test('allow to close message with button in message', async () => {
  render(
    <Basic.Component data-testid="messages" variant="error" closeButton />
  );

  const message = screen.getAllByTestId(/messages/);
  const button = screen.getAllByRole('button')[0];

  expect(message[0]).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-label');

  await user.click(button);

  expect(message[0]).not.toBeInTheDocument();
});

test('support controlled dismiss message', async () => {
  const Controlled = () => {
    const [open, setOpen] = useState(true);

    return (
      <Basic.Component
        data-testid="messages"
        closeButton
        open={open}
        onOpenChange={setOpen}
      />
    );
  };
  render(<Controlled />);
  const message = screen.getAllByTestId(/messages/);
  const button = screen.getAllByRole('button')[0];

  expect(message[0]).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  await user.click(button);
  expect(message[0]).not.toBeInTheDocument();
});
