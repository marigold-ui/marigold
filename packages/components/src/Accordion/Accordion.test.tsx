/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Accordion } from './Accordion';
import { Headline } from '../Headline';

const theme = {
  colors: {
    blue: '#0ea5e9',
    teal: '#5eead4',
  },
  fontSizes: {
    'small-1': 12,
  },
  space: {
    none: 0,
    large: 12,
  },
  components: {
    Accordion: {
      variant: {
        one: {
          item: {
            bg: 'teal',
          },
          button: {
            bg: 'blue',
          },
        },
      },
      size: {
        large: {
          button: {
            p: 'large',
          },
        },
      },
    },
  },
};

let items = [
  { key: 'one', title: 'one title', children: 'one children' },
  { key: 'two', title: 'two title', children: 'two children' },
  { key: 'three', title: 'three title', children: 'three children' },
];

test('render Accordion and more than one Item', () => {
  render(
    <Accordion data-testid="accordion">
      <Accordion.Item title="Information">
        <Headline>infos</Headline>
      </Accordion.Item>
      <Accordion.Item title="Settings">
        <Headline>settings</Headline>
      </Accordion.Item>
    </Accordion>
  );

  const item = screen.getByText('Information');
  expect(item).toBeInTheDocument();
  const itemtwo = screen.getByText('Settings');
  expect(itemtwo).toBeInTheDocument();
});

test('render Accordion and just one Item', () => {
  render(
    <Accordion>
      <Accordion.Item title="Information">
        <Headline>infos</Headline>
      </Accordion.Item>
    </Accordion>
  );

  const item = screen.getByText('Information');
  expect(item).toBeInTheDocument();
});

test('item opens content by click', () => {
  render(
    <Accordion data-testid="accordion">
      <Accordion.Item title="Information">
        <Headline>item</Headline>
      </Accordion.Item>
      <Accordion.Item title="Settings">
        <Headline>settings</Headline>
      </Accordion.Item>
    </Accordion>
  );

  const button = screen.getByText('Information');
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('render dynamically accordion items', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion data-testid="accordion">
        {items.map(item => (
          <Accordion.Item key={item.key} title={item.title}>
            {item.children}
          </Accordion.Item>
        ))}
      </Accordion>
    </ThemeProvider>
  );

  const button = screen.getByText('one title');

  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const content = screen.getByText('one children');
  expect(content).toBeInTheDocument();
});

test('accepts variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion data-testid="accordion">
        <Accordion.Item title="Information" variant="one" size="large">
          <Headline>infos</Headline>
        </Accordion.Item>
      </Accordion>
    </ThemeProvider>
  );

  const button = screen.getByText('Information');

  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(button).toHaveStyle(`background-color: ${theme.colors.blue}`);
  expect(button).toHaveStyle(`padding: ${theme.space.large}px`);
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const item = screen.getByText('infos');
  expect(item).toHaveStyle(`background-color: ${theme.colors.teal})`);
});
