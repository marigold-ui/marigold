import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { ActionGroup } from './ActionGroup';
import { Button } from '../Button';

const theme = {
  actionGroup: {
    default: {
      p: '8px',
    },
    custom: {
      p: '12px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup).toHaveStyle(`padding: 8px;`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup variant="custom" title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup).toHaveStyle(`padding: 12px;`);
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
  const button1 = screen.getByTitle(/Button1/);
  const button2 = screen.getByTitle(/Button2/);

  expect(button1.parentElement instanceof HTMLSpanElement).toBeTruthy();
  expect(button1.parentElement).toHaveStyle(`margin-right: 8px;`);
  expect(button2.parentElement).not.toHaveStyle(`margin-right: 8px;`);
});

test('supports verticalAlignment prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" space="8px" verticalAlignment>
        <Button title="Button1">Button1</Button>
        <Button title="Button2">Button2</Button>
      </ActionGroup>
    </ThemeProvider>
  );
  const button1 = screen.getByTitle(/Button1/);
  const button2 = screen.getByTitle(/Button2/);

  expect(button1.parentElement instanceof HTMLDivElement).toBeTruthy();
  expect(button1.parentElement).toHaveStyle(`margin-bottom: 8px;`);
  expect(button2.parentElement).not.toHaveStyle(`margin-bottom: 8px;`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup instanceof HTMLDivElement).toBeTruthy();
});
