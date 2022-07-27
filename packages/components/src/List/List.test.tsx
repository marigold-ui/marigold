import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { List } from './List';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 16,
  },
  colors: {
    grey: '#dee2e6',
    yellow: '#fff9db',
  },
  components: {
    List: {
      base: {
        ul: {
          listStyle: 'none',
        },
        ol: {
          listStyle: 'none',
        },
        item: {
          p: 'medium-1',
        },
      },
      variant: {
        yellow: {
          ul: {
            bg: 'yellow',
          },
          item: {
            bg: 'grey',
          },
        },
      },
      size: {
        small: {
          ul: {
            p: 'small-1',
          },
        },
      },
    },
  },
};

test('renders an "ul" with "li"s by default', () => {
  render(
    <List data-testid="list">
      <List.Item data-testid="one">one</List.Item>
      <List.Item data-testid="two">two</List.Item>
      <List.Item data-testid="three">three</List.Item>
    </List>
  );

  const list = screen.getByTestId('list');
  expect(list).toBeInstanceOf(HTMLUListElement);

  const item = screen.getByTestId('one');
  expect(item).toBeInstanceOf(HTMLLIElement);
});

test('renders an "ol" with "li"s', () => {
  render(
    <List as="ol" data-testid="list">
      <List.Item data-testid="one">one</List.Item>
      <List.Item data-testid="two">two</List.Item>
      <List.Item data-testid="three">three</List.Item>
    </List>
  );

  const list = screen.getByTestId('list');
  expect(list).toBeInstanceOf(HTMLOListElement);

  const item = screen.getByTestId('one');
  expect(item).toBeInstanceOf(HTMLLIElement);
});

test('renders all children', async () => {
  render(
    <List as="ol" data-testid="list">
      <List.Item data-testid="one">one</List.Item>
      <List.Item data-testid="two">two</List.Item>
      <List.Item data-testid="three">three</List.Item>
    </List>
  );

  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('use base styling from "List" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <List data-testid="list">
        <List.Item data-testid="one">one</List.Item>
        <List.Item data-testid="two">two</List.Item>
        <List.Item data-testid="three">three</List.Item>
      </List>
    </ThemeProvider>
  );
  const list = screen.getByTestId('list');
  expect(list).toHaveStyle('list-style: none');

  const item = screen.getByTestId('one');
  expect(item).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});

test('accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <List data-testid="list" variant="yellow" size="small">
        <List.Item data-testid="one">one</List.Item>
        <List.Item data-testid="two">two</List.Item>
        <List.Item data-testid="three">three</List.Item>
      </List>
    </ThemeProvider>
  );
  const list = screen.getByTestId('list');
  expect(list).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(list).toHaveStyle(`padding: ${theme.space['small-1']}px`);

  const item = screen.getByTestId('one');
  expect(item).toHaveStyle(`background-color: ${theme.colors.grey}`);
});
