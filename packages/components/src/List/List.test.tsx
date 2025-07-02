import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { List } from './List';
import * as stories from './List.stories';

const { Basic } = composeStories(stories);

test('renders an "ul" with "li"s by default', () => {
  render(<Basic />);

  const list = screen.getByRole('list');
  const item = screen.getAllByRole('listitem');

  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(item[0]).toBeInstanceOf(HTMLLIElement);
});

test('renders an "ol" with "li"s', () => {
  render(<Basic as="ol" />);

  const list = screen.getByRole('list');
  const item = screen.getAllByRole('listitem')[0];

  expect(list).toBeInstanceOf(HTMLOListElement);
  expect(item).toBeInstanceOf(HTMLLIElement);
});

test('renders all children', async () => {
  render(<Basic />);

  const items = await screen.findAllByRole('listitem');

  expect(items).toHaveLength(3);
});

test('use base styling from "List" in theme', () => {
  render(<Basic />);

  const list = screen.getByRole('list');

  expect(list).toHaveClass('list-disc');
});
