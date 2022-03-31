import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { HelpText } from './HelpText';

const theme = {
  sizes: {
    none: 0,
    small: 14,
  },
  colors: {
    text: 'black',
    error: 'red',
    disabled: 'grey',
  },
  helpText: {
    description: {
      color: 'text',
    },
    error: {
      color: 'error',
    },
    disabled: {
      color: 'disabled',
    },
    icon: {
      size: 'small',
    },
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

test('uses description variant by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        description="This is a help text description"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  expect(element).toHaveStyle(`color: ${theme.colors.text}`);
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

test('uses error variant when error is set', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        error={true}
        description="This is a help text description"
        errorMessage="Something went wrong"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  expect(element).toHaveStyle(`color: ${theme.colors.error}`);
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
  const icon = within(element).getByRole(/presentation/);
  expect(icon).toBeInTheDocument();
});

test('icon can be sized via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        error={true}
        description="This is a help text description"
        errorMessage="Something went wrong"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  const icon = within(element).getByRole(/presentation/);
  expect(icon).toHaveStyle(`width: ${theme.sizes.small}px`);
});

test('uses disabled variant when disabled is set', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        disabled={true}
        description="This is a help text description"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  expect(element).toHaveStyle(`color: ${theme.colors.disabled}`);
});
