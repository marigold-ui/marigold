import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { OverlayProvider } from '@react-aria/overlays';

import { Theme, ThemeProvider, cva, useSmallScreen } from '@marigold/system';

import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';
import { Menu } from './Menu';

// Setup
// ---------------
const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('disabled:bg-disabled-bg p-3'),
    Divider: cva(),

    Menu: {
      container: cva('bg-white focus:text-pink-600', {
        variants: {
          variant: {
            one: 'bg-pink-900',
          },
          size: {
            large: 'p-5',
          },
        },
      }),
      item: cva('text-black focus:text-pink-600', {
        variants: {
          variant: {
            one: 'text-white',
          },
          size: {
            large: 'p-2',
          },
        },
      }),
      section: cva('text-pink-300', {
        variants: {
          variant: {
            one: 'text-black',
          },
        },
      }),
    },
    Underlay: cva(),
    Header: cva(),
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
  },
};

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

afterEach(cleanup);

test('renders the button but no menu by default', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.queryByText('Choose');
  const burger = screen.queryByText('Burger');
  const pizza = screen.queryByText('Pizza');

  expect(button).toBeInTheDocument();
  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

test('opens menu when trigger is clicked', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const burger = screen.getByText('Burger');
  const pizza = screen.getByText('Pizza');

  expect(burger.className).toMatchInlineSnapshot(
    `"text-black focus:text-pink-600"`
  );

  expect(pizza.className).toMatchInlineSnapshot(
    `"text-black focus:text-pink-600"`
  );
});

test('closes menu when item is selected', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  // Select burger from menu
  const burger = screen.getByText('Burger');
  expect(burger).toBeInTheDocument();
  fireEvent.click(burger);

  const pizza = screen.queryByText('Pizza');
  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

test('closes menu when trigger is clicked', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);
  fireEvent.click(button);

  const burger = screen.queryByText('Burger');
  const pizza = screen.queryByText('Pizza');

  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

test('closes menu when clicked outside', async () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Button>outside</Button>

        <Menu label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  await user.click(button);

  const burger = screen.getByText('Burger');
  const pizza = screen.queryByText('Pizza');

  const outside = screen.getByText('outside');
  await user.click(outside);

  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

// test('return selected item')
test('return action item', () => {
  const spy = jest.fn();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose" onAction={spy}>
          <Menu.Item id="burger">Burger</Menu.Item>
          <Menu.Item id="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const burger = screen.getByText('Burger');
  fireEvent.click(burger);

  expect(spy).toHaveBeenCalledWith('burger');
  expect(spy).not.toHaveBeenCalledWith('pizza');
});

test('uses base classes from "Menu" in theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu data-testid="menu" label="Choose">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const menu = screen.getByRole('menu');
  expect(menu).toHaveClass(`bg-white`);
});

test('supports "Menu" variant classnames from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu data-testid="menu" label="Choose" variant="one">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const menu = screen.getByRole('menu');
  const item = screen.getByText('Burger');

  expect(menu.className).toMatchInlineSnapshot(
    `"focus:text-pink-600 bg-pink-900"`
  );
  expect(item.className).toMatchInlineSnapshot(
    `"text-black focus:text-pink-600"`
  );
});

test('supports "Menu" sizes from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu data-testid="menu" label="Choose" size="large">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByRole('button');
  fireEvent.click(button);

  const item = screen.getByText('Burger');
  expect(item.className).toMatchInlineSnapshot(
    `"text-black focus:text-pink-600"`
  );
});

test('renders as tray', () => {
  let resize: Function;
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() => useSmallScreen());
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);
  act(() => resize());
  expect(result.current).toBeTruthy();

  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu label="Choose" data-testid="menu">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const item = screen.getByText('Burger');
  // eslint-disable-next-line testing-library/no-node-access
  expect(item.parentElement?.parentElement?.className).toMatchInlineSnapshot(
    `"!left-0 bottom-0 !mt-auto flex !max-h-fit w-full flex-col"`
  );
});

test('renders action menu', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <ActionMenu>
          <Menu.Item key="one">Settings</Menu.Item>
          <Menu.Item key="two">Delete</Menu.Item>
        </ActionMenu>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const item = screen.getByText('Settings');
  expect(item).toBeInTheDocument();
});

test('supports open property', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu data-testid="menu" label="Choose" open={true}>
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );

  const item = screen.getByText('Burger');
  expect(item).toBeInTheDocument();
});

test('supports onOpenChange property', () => {
  const onOpenChange = jest.fn();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu
          data-testid="menu"
          label="Choose"
          onOpenChange={() => onOpenChange()}
        >
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );
  expect(onOpenChange).toBeCalledTimes(0);
  fireEvent.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
});

test('supports Menu with sections', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu aria-label="Menu with sections" open>
          <Menu.Section title="Food">
            <Menu.Item key="burger">🍔 Burger</Menu.Item>
            <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
          </Menu.Section>
          <Menu.Section title="Fruits">
            <Menu.Item key="apple">🍎 Apple</Menu.Item>
            <Menu.Item key="banana">🍌 Banana</Menu.Item>
          </Menu.Section>
        </Menu>
      </ThemeProvider>
    </OverlayProvider>
  );
  expect(screen.getByText('Food')).toBeInTheDocument();
  expect(screen.getByText('Fruits')).toBeInTheDocument();
});
