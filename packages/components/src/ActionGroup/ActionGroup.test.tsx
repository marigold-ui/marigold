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

test('default space is "none"', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup">
        <Button>Button1</Button>
        <Button>Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const group = screen.getByTitle(/actionGroup/);
  expect(group).toHaveStyle(`gap: 0`);
});

test('supports space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" space="8px">
        <Button>Button1</Button>
        <Button>Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const groupt = screen.getByTitle(/actionGroup/);
  expect(groupt).toHaveStyle(`gap: 8px`);
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
  const group = screen.getByTitle(/actionGroup/);
  expect(group).toHaveStyle(`gap: 2px`);
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
  const group = screen.getByTitle(/actionGroup/);
  expect(group).toHaveStyle(`gap: 2px`);
});
