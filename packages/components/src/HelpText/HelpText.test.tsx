import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { HelpText } from './HelpText';

import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    HelpText: tv({
      slots: {
        container: ['text-gray-800 data-[error]:text-red-700'],
        icon: [''],
      },
      variants: {
        variant: {
          one: {
            container: ['text-green-800'],
          },
        },
        size: {
          small: {
            icon: ['13'],
          },
        },
      },
    }),
  },
};

test('render description', () => {
  render(<HelpText description="This is a help text description" />);

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('render description even if error message is defined', () => {
  render(
    <HelpText
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('uses description base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        description="This is a help text description"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  expect(element).toHaveClass(
    'flex items-center gap-1 text-gray-800 data-[error]:text-red-700',
    { exact: true }
  );
});

test('renders error message when error is set', () => {
  render(
    <HelpText
      error={true}
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();

  const descrption = screen.queryByText('This is a help text description');
  expect(descrption).not.toBeInTheDocument();
});

test('renders icon when when error message is shown', () => {
  render(
    <HelpText
      data-testid="help-text"
      error={true}
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByTestId('help-text');
  const icon = within(element).getByRole('presentation');
  expect(icon).toBeInTheDocument();
});

test('icon has a default size', () => {
  render(
    <HelpText
      data-testid="help-text"
      error={true}
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByTestId('help-text');
  const icon = within(element).getByRole('presentation');

  expect(icon).toHaveAttribute('width', '16px');
});

test('icon can be sized via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        error={true}
        size="small"
        description="This is a help text description"
        errorMessage="Something went wrong"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  const icon = within(element).getByRole('presentation');

  expect(icon).toHaveAttribute('width', '13px');
  expect(icon).toHaveAttribute('height', '13px');
  expect(icon).toMatchInlineSnapshot(`
    <svg
      class="flex-none fill-current"
      height="13px"
      role="presentation"
      viewBox="0 0 24 24"
      width="13px"
    >
      <path
        d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z"
      />
    </svg>
  `);
});
