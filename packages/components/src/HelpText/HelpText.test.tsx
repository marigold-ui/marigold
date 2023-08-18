import { screen, within } from '@testing-library/react';
import React from 'react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { HelpText } from './HelpText';

const theme: Theme = {
  name: 'test',
  components: {
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva('h-3 w-3'),
    },
  },
};

const { render } = setup({ theme });

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
    <HelpText
      data-testid="help-text"
      description="This is a help text description"
    />
  );

  const element = screen.getByTestId('help-text');
  expect(element.className).toMatchInlineSnapshot(`"flex items-center gap-1"`);
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

test('icon styles via theme', () => {
  render(
    <HelpText
      data-testid="help-text"
      error={true}
      size="small"
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByTestId('help-text');
  const icon = within(element).getByRole('presentation');

  expect(icon.getAttribute('class')).toMatchInlineSnapshot(
    `"flex-none fill-current h-3 w-3"`
  );
});
