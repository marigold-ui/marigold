import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { ActionGroup } from './ActionGroup';
import { Button } from '../Button';

const theme = {
  space: {
    none: 0,
    small: 2,
  },
};

const getTopPadding = (element: HTMLElement) =>
  getComputedStyle(element).getPropertyValue('padding-top');

test('default space is "none"', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup">
        <Button title="Button1">Button1</Button>
        <Button title="Button2">Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const first = screen.getByTitle(/Button1/).parentElement;
  expect(first).toHaveStyle(`gap: 0`);
});

test('supports space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" space="8px">
        <Button title="Button1">Button1</Button>
        <Button title="Button2">Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const first = screen.getByTitle(/Button1/).parentElement;
  expect(first).toHaveStyle(`gap: 8px`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" space="small">
        <Button title="Button1">Button1</Button>
        <Button title="Button2">Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const first = screen.getByTitle(/Button1/).parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
});

test('supports verticalAlignment prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" space="small" verticalAlignment>
        <Button title="Button1">Button1</Button>
        <Button title="Button2">Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );

  const button1 = screen.getByText(/Button1/);
  const button2 = screen.getByText(/Button2/);

  expect(getTopPadding(button1.parentElement!)).toEqual('');
  expect(button2.parentElement).toHaveStyle(`padding-top: 2px`);
});
