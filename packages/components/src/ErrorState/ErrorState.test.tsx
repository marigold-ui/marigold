/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext } from '../Button/Context';
import { Basic, Compact, WithRetry } from './ErrorState.stories';

test('renders with title and description', () => {
  render(<Basic.Component />);

  expect(screen.getByText("We can't load this data")).toBeInTheDocument();
  expect(
    screen.getByText('Something went wrong on our side. Your data is safe.')
  ).toBeInTheDocument();
});

test('renders the title as a semantic heading (default level 3)', () => {
  render(<Basic.Component />);

  const heading = screen.getByRole('heading', {
    name: "We can't load this data",
  });
  expect(heading.tagName).toBe('H3');
});

test('supports configuring the heading level', () => {
  render(<Basic.Component headingLevel={2} />);

  const heading = screen.getByRole('heading', {
    name: "We can't load this data",
  });
  expect(heading.tagName).toBe('H2');
});

test('passes role through to the container (region tier)', () => {
  render(<Compact.Component />);

  const alert = screen.getByRole('alert');
  expect(alert).toContainElement(
    screen.getByRole('heading', { name: "Invoices didn't load" })
  );
});

test('forwards a ref and supports being focused (page tier)', () => {
  const ref = createRef<HTMLDivElement>();
  render(<Basic.Component ref={ref} tabIndex={-1} />);

  ref.current?.focus();

  expect(ref.current).toBe(document.activeElement);
});

test('renders the retry action', () => {
  render(<WithRetry.Component />);

  expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
});

test('scopes the action from an inherited ButtonContext cascade', () => {
  render(
    <Provider values={[[ButtonContext, { className: 'leaked-grid' }]]}>
      <WithRetry.Component />
    </Provider>
  );

  expect(screen.getByRole('button', { name: 'Try again' })).not.toHaveClass(
    'leaked-grid'
  );
});

test('renders SVG illustration', () => {
  render(<Basic.Component />);

  expect(screen.getByTestId('error-state-illustration')).toBeInTheDocument();
});
