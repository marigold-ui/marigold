import { screen } from '@testing-library/react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { HelpText } from './_HelpText';

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

test('render nothing', async () => {
  render(<HelpText data-testid="help-text" />);

  const element = screen.queryByTestId('help-text');
  expect(element).not.toBeInTheDocument();
});

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

  const element = screen.getByText('This is a help text description');
  expect(element.className).toMatchInlineSnapshot(`"react-aria-Text"`);
});

// don't tested error messages because it can't be shown (react-aria-components)
