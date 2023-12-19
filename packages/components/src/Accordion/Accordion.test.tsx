/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Headline } from '../Headline';
import { setup } from '../test.utils';
import { Accordion } from './Accordion';

const theme: Theme = {
  name: 'test',
  components: {
    Accordion: {
      button: cva('', {
        variants: {
          variant: {
            one: 'bg-blue-600',
          },
          size: {
            large: 'p-8',
          },
        },
      }),
      item: cva('', {
        variants: {
          variant: {
            one: 'bg-blue-100',
          },
        },
      }),
    },
    Button: cva('w-full'),
    Headline: cva(),
  },
};

const { render } = setup({ theme });

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
      <Accordion.Item title="Settings">settings</Accordion.Item>
    </Accordion>
  );

  const item = screen.getByText('Information');
  expect(item).toBeInTheDocument();
  const itemtwo = screen.getByText('Settings');
  expect(itemtwo).toBeInTheDocument();
  expect(item).toBeValid();
  expect(itemtwo).toBeValid();
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

test('accepts variant and size classnames', () => {
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
  expect(button.className).toMatchInlineSnapshot(
    `"inline-flex items-center justify-center gap-[0.5ch] bg-blue-600 p-8"`
  );
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const item = screen.getByText('infos');
  expect(item.className).toMatchInlineSnapshot(`"text-[--color] text-left"`);
});

test('default full width', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion data-testid="accordion">
        <Accordion.Item title="Information">
          <Headline>infos</Headline>
        </Accordion.Item>
      </Accordion>
    </ThemeProvider>
  );

  const button = screen.getByText('Information');

  expect(button.className).toMatchInlineSnapshot(
    `"inline-flex items-center justify-center gap-[0.5ch]"`
  );
});

test('support default expanded keys', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion data-testid="accordion" defaultExpandedKeys={['one']}>
        <Accordion.Item key={'one'} title="Information">
          <Headline>infos</Headline>
        </Accordion.Item>
        <Accordion.Item key={'two'} title="Settings">
          <Headline>settings</Headline>
        </Accordion.Item>
      </Accordion>
    </ThemeProvider>
  );

  const button = screen.getByText('Information');

  expect(button).toHaveAttribute('aria-expanded', 'true');
  const item = screen.getByText('infos');
  expect(item).toBeInTheDocument();

  const buttontwo = screen.getByText('Settings');
  expect(buttontwo).toHaveAttribute('aria-expanded', 'false');
});

test('support default expanded keys (more than one)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Accordion
        data-testid="accordion"
        selectionMode="multiple"
        defaultExpandedKeys={['two', 'one']}
      >
        <Accordion.Item key={'one'} title="Information">
          <Headline>infos</Headline>
        </Accordion.Item>
        <Accordion.Item key={'two'} title="Settings">
          <Headline>settings</Headline>
        </Accordion.Item>
      </Accordion>
    </ThemeProvider>
  );

  const item = screen.getByText('infos');
  expect(item).toBeInTheDocument();

  const itemtwo = screen.getByText('settings');
  expect(itemtwo).toBeInTheDocument();
});
