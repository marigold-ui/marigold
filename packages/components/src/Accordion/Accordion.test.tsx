/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Accordion } from './Accordion';
import { Headline } from '../Headline';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

const theme = {
  colors: {
    blue: '#0ea5e9',
    teal: '#5eead4',
  },
  fontSizes: {
    'small-1': 12,
  },
  sizes: {
    none: 0,
    large: 200,
  },
};

let items = [
  { key: 'one', title: 'one title', children: 'one children' },
  { key: 'two', title: 'two title', children: 'two children' },
  { key: 'three', title: 'three title', children: 'three children' },
];

test('render Accordion and Item', () => {
  render(
    <Accordion data-testid="accordion">
      <Accordion.Item title="Information">
        <Headline>item</Headline>
      </Accordion.Item>
    </Accordion>
  );

  const accordion = screen.getByTestId('accordion');
  expect(accordion).toBeInTheDocument();

  const item = accordion.firstChild;
  expect(item).toBeInTheDocument();
});

test('item opens content by click', () => {
  render(
    <Accordion data-testid="accordion">
      <Accordion.Item title="Information">
        <Headline>item</Headline>
      </Accordion.Item>
    </Accordion>
  );

  const button = screen.getByText('Information');

  console.log(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('render dynamically accordion items', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion children={items} data-testid="accordion">
        {items.map(item => (
          <Accordion.Item key={item.key} title={item.title}>
            {item.children}
          </Accordion.Item>
        ))}
      </Accordion>
    </ThemeProvider>
  );

  const button = screen.getByText('one title');

  console.log(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const content = screen.getByText('one children');
  expect(content).toBeInTheDocument();
});
