import { render, screen } from '@testing-library/react';
import { Basic } from './List.stories';

test('renders an "ul" with "li"s by default', () => {
  render(<Basic.Component />);

  const list = screen.getByRole('list');
  const item = screen.getAllByRole('listitem');

  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(item[0]).toBeInstanceOf(HTMLLIElement);
});

test('renders an "ol" with "li"s', () => {
  render(<Basic.Component as="ol" />);

  const list = screen.getByRole('list');
  const item = screen.getAllByRole('listitem')[0];

  expect(list).toBeInstanceOf(HTMLOListElement);
  expect(item).toBeInstanceOf(HTMLLIElement);
});

test('renders all children', async () => {
  render(<Basic.Component />);

  const items = await screen.findAllByRole('listitem');

  expect(items).toHaveLength(3);
});

test('use base styling from "List" in theme', () => {
  render(<Basic.Component />);

  const list = screen.getByRole('list');

  expect(list).toHaveClass('list-disc');
});
