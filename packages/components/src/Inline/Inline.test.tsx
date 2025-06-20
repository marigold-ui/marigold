/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { setup } from '../test.utils';
import { Inline } from './Inline';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(''),
    },
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
      icon: cva(''),
    },
    Input: {
      input: cva('border-blue-700'),
      icon: cva(),
      action: cva(),
    },
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'size-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

const { render } = setup({ theme });

test('default space is "none"', () => {
  render(
    <Inline>
      <p>first</p>
      <p>second</p>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveClass(`gap-0`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <Inline space={2}>
      <p>first</p>
      <p>second</p>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveClass(`gap-2`);
});

test('supports nesting', () => {
  render(
    <Inline space={1}>
      <Inline space={2} data-testid="leftInline">
        <p>first</p>
        <p>second</p>
      </Inline>
      <Inline space={2} data-testid="rightInline">
        <p>third</p>
        <p>fourth</p>
      </Inline>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  const leftInline = screen.getByTestId('leftInline').parentElement;
  expect(first).toHaveClass(`gap-2`);
  expect(leftInline).toHaveClass(`gap-1`);

  const third = screen.getByText(/third/).parentElement;
  const rightInline = screen.getByTestId('rightInline').parentElement;
  expect(third).toHaveClass(`gap-2`);
  expect(rightInline).toHaveClass(`gap-1`);
});

test('supports a standalone element', () => {
  render(
    <Inline>
      <p>element</p>
    </Inline>
  );
  const element = screen.getByText(/element/).parentElement;
  expect(element).toHaveClass(`gap-0`);
});

test('supports a non React.Fragment element', () => {
  render(
    <Inline space={2}>
      <p>element</p>
      Text
    </Inline>
  );
  const textElement = screen.getByText(/Text/);
  expect(textElement).toHaveClass(`gap-2`);
});

test('renders div per default', () => {
  render(<Inline data-testid="inline">first</Inline>);

  const inline = screen.getByTestId('inline');
  expect(inline instanceof HTMLDivElement).toBeTruthy();
});

test('adjusts vertical alignment when input fields display helper text or error message', () => {
  render(
    <Inline data-testid="inline" space={4} dynamicAlign>
      <TextField
        width={'auto'}
        label="My label is great."
        description={'this is description'}
      />
      <Button>Submit</Button>
    </Inline>
  );

  const inline = screen.getByTestId('inline');
  expect(inline.className).toMatchInlineSnapshot(
    `"gap-4 items-end [&:has([slot=description])]:items-center [&:has([slot=errorMessage])]:items-center"`
  );
});
