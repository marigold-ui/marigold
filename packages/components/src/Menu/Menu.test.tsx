import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider, useResponsiveValue } from '@marigold/system';

import { Button } from '../Button';
import { Menu } from './Menu';
import { ActionMenu } from './ActionMenu';

const theme = {
  colors: {
    black: '#212529',
    white: '#f8f9fa',
    pink: '#fcc2d7',
  },
  space: {
    none: 0,
    small: 4,
    large: 10,
  },
  components: {
    Menu: {
      base: {
        container: {
          bg: 'white',
          '&:focus': {
            color: 'pink',
          },
        },
        item: {
          color: 'black',

          '&:focus': {
            bg: 'pink',
          },
        },
      },
      variant: {
        one: {
          container: {
            bg: 'pink',
          },
          item: {
            color: 'white',
          },
        },
      },
      size: {
        large: {
          container: {
            p: 'large',
          },
          item: {
            p: 'small',
          },
        },
      },
    },
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
afterEach(cleanup);

test('renders the button but no menu by default', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
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
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const burger = screen.queryByText('Burger');
  const pizza = screen.queryByText('Pizza');

  expect(burger).toBeInTheDocument();
  expect(pizza).toBeInTheDocument();
});

test('closes menu when item is selected', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  // Select burger from menu
  const burger = screen.getByText('Burger');
  fireEvent.click(burger);

  const pizza = screen.queryByText('Pizza');
  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

test('closes menu when trigger is clicked', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
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

test('closes menu when clicked outside', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const burger = screen.getByText('Burger');
  fireEvent.focus(burger);
  fireEvent.blur(burger);

  const pizza = screen.queryByText('Pizza');

  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

test('trigger can be disabled', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger disabled>
          <Button>Choose</Button>
          <Menu>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const burger = screen.queryByText('Burger');
  const pizza = screen.queryByText('Pizza');

  expect(burger).not.toBeInTheDocument();
  expect(pizza).not.toBeInTheDocument();
});

// test('return selected item')
test('return selected item', () => {
  const spy = jest.fn();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu onAction={spy}>
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
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

test('uses base styling from "Menu" in theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu data-testid="menu">
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const menu = screen.getByTestId('menu');
  expect(menu).toHaveStyle(`background-color: ${theme.colors.white}`);
});

test('supports "Menu" variants from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu data-testid="menu" variant="one">
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const menu = screen.getByTestId('menu');
  const item = screen.getByText('Burger');

  expect(menu).toHaveStyle(`background-color: ${theme.colors.pink}`);
  expect(item).toHaveStyle(`color: ${theme.colors.white}`);
});

test('supports "Menu" sizes from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu data-testid="menu" size="large">
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const menu = screen.getByTestId('menu');
  expect(menu).toHaveStyle(`padding: ${theme.space.large}px`);

  const item = screen.getByText('Burger');
  expect(item).toHaveStyle(`padding: ${theme.space.small}px`);
});

test('apply focus style on focus', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu data-testid="menu">
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByText('Choose');
  fireEvent.click(button);

  const item = screen.getByText('Burger');
  fireEvent.focus(item);
  expect(item).toHaveStyle(`background: ${theme.colors.pink}`);
});

test('renders as tray', () => {
  let resize: Function;
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );
  window.matchMedia = mockMatchMedia([]);
  act(() => resize());

  expect(result.current).toEqual('one');

  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Menu.Trigger>
          <Button>Choose</Button>
          <Menu data-testid="menu">
            <Menu.Item key="burger">Burger</Menu.Item>
            <Menu.Item key="pizza">Pizza</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByText('Choose');
  fireEvent.click(button);
  const tray = screen.getByTestId('tray');
  expect(tray).toBeInTheDocument();
});

test('renders action menu', () => {
  render(
    <OverlayProvider>
      <ActionMenu>
        <Menu.Item key="one">Settings</Menu.Item>
        <Menu.Item key="two">Delete</Menu.Item>
      </ActionMenu>
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
      <Menu.Trigger open={true}>
        <Button>Choose</Button>
        <Menu data-testid="menu">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </Menu.Trigger>
    </OverlayProvider>
  );

  const item = screen.getByText('Burger');
  expect(item).toBeInTheDocument();
});

test('supports onOpenChange property', () => {
  const onOpenChange = jest.fn();
  render(
    <OverlayProvider>
      <Menu.Trigger onOpenChange={() => onOpenChange()}>
        <Button>Choose</Button>
        <Menu data-testid="menu">
          <Menu.Item key="burger">Burger</Menu.Item>
          <Menu.Item key="pizza">Pizza</Menu.Item>
        </Menu>
      </Menu.Trigger>
    </OverlayProvider>
  );
  expect(onOpenChange).toBeCalledTimes(0);
  fireEvent.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
});

test('supports Menu with sections', () => {
  render(
    <OverlayProvider>
      <Menu aria-label="Menu with sections">
        <Menu.Section title="Food">
          <Menu.Item key="burger">🍔 Burger</Menu.Item>
          <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
        </Menu.Section>
        <Menu.Section title="Fruits">
          <Menu.Item key="apple">🍎 Apple</Menu.Item>
          <Menu.Item key="banana">🍌 Banana</Menu.Item>
        </Menu.Section>
      </Menu>
    </OverlayProvider>
  );
  expect(screen.getByText('Food')).toBeInTheDocument();
  expect(screen.getByText('Fruits')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});
