import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack, Text } from '@marigold/components';
import flattenChildren from 'react-flatten-children';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

const theme = {
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
};

test('supports default space prop', () => {
  render(
    <Stack title="stack">
      <Text>stack</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack).toHaveStyle(`padding: 0px`);
});

test('supports custom space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack space={4} title="stack">
        <Text>stack</Text>
      </Stack>
    </ThemeProvider>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack).toHaveStyle(`padding: 32px`);
});

test('supports two children', () => {
  render(
    <Stack align="right" title="stack">
      <Text title="stackContent">stack</Text>
      <Text title="stackContent2">secondStack</Text>
    </Stack>
  );
  const stack = screen.getByText(/stack/);
  const secondStack = screen.getByText(/secondStack/);

  expect(stack).toBeDefined();
  expect(secondStack).toBeDefined();
});

test('renders correct HTML element', () => {
  render(
    <Stack title="stack">
      <Text>sdf</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Stack className="custom-class-name" title="stack">
      <Text>text</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack.className).toMatch('custom-class-name');
});

test('flatten children works', () => {
  const children = [<>test1</>, <>test2</>];

  flattenChildren(children).map(child => {
    render(<div>{child}</div>);
  });

  const stack = screen.getByText(/test1/);
  const stack2 = screen.getByText(/test2/);
  expect(stack).toBeDefined();
  expect(stack2).toBeDefined();
});
