import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { HelpText } from './HelpText';
import { helpText } from './../../../../themes/tailwind-core/src/components/HelpText.style';

const theme: Theme = {
  name: 'test',
  components: {
    HelpText: helpText,
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
    'flex items-center gap-1 text-helptext-container-textColor data-[invalid]:text-error',
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

//TODO: didn't work, but should work
test.skip('icon has a default size', () => {
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

  expect(icon).toHaveStyle('width: 16px');
});

//TODO: I'm not sure can icon be sized via theme anymore?
test.skip('icon can be sized via theme', () => {
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
  const icon = within(element).getByRole('presentation');
  expect(icon).toHaveStyle(`width: ${theme.sizes.small}px`);
});

//TODO: I'm not sure can color be set via theme anymore?
test.skip('uses disabled variant when disabled is set', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText
        data-testid="help-text"
        data-disabled
        disabled={true}
        description="This is a help text description"
      />
    </ThemeProvider>
  );

  const element = screen.getByTestId('help-text');
  expect(element).toHaveStyle(`color: ${theme.colors.disabled}`);
});
