import React from 'react';
import { screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { List } from './List';

import { setup } from '../test.utils';
const theme: Theme = {
  name: 'test',
  components: {
    List: {
      ul: cva('list-disc', {
        variants: {
          variant: {
            yellow: 'bg-yellow-200',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      ol: cva('list-decimal', {
        variants: {
          variant: {
            yellow: 'bg-yellow-200',
          },
        },
      }),
      item: cva('p-4'),
    },
  },
};

const { render } = setup({ theme });

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
    <List data-testid="list">
      <List.Item data-testid="one">one</List.Item>
      <List.Item data-testid="two">two</List.Item>
      <List.Item data-testid="three">three</List.Item>
    </List>
  );
  const list = screen.getByTestId('list');
  expect(list).toHaveClass('list-disc');

  const item = screen.getByTestId('one');
  expect(item).toHaveClass(`p-4`);
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
  expect(list).toHaveClass(`bg-yellow-200 p-1`);

  const item = screen.getByTestId('one');
  expect(item).toHaveClass(`p-4`);
});
