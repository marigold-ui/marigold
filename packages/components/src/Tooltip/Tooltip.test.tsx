import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from '.';
import { Button } from '..';

const theme = {
  colors: {
    primary: 'hotpink',
    secondary: 'green',
  },
  tooltip: {
    __default: {
      bg: 'primary',
    },
    styled: {
      bg: 'secondary',
    },
  },
};

test('supports default variant', async () => {
  render(
    <ThemeProvider theme={theme}>
      <TooltipTrigger>
        <Button data-testid="button">Info</Button>
        <Tooltip data-testid="tooltip">Tooltip</Tooltip>
      </TooltipTrigger>
    </ThemeProvider>
  );
  const button = screen.getByTestId('button');
  button.focus();
  expect(button).toHaveFocus();

  const tooltip = screen.getAllByTestId(/tooltip/);
  expect(tooltip[1]).toHaveStyle(`background-color: hotpink`);
});

test('supports other variant than default', async () => {
  render(
    <ThemeProvider theme={theme}>
      <TooltipTrigger>
        <Button data-testid="button">Info</Button>
        <Tooltip variant="styled" data-testid="tooltip">
          Tooltip
        </Tooltip>
      </TooltipTrigger>
    </ThemeProvider>
  );
  const button = screen.getByTestId('button');
  button.focus();
  expect(button).toHaveFocus();

  const tooltip = screen.getAllByTestId(/tooltip/);
  expect(tooltip[1]).toHaveStyle(`background-color: green`);
});

test('shows Tooltip', async () => {
  render(
    <ThemeProvider theme={theme}>
      <TooltipTrigger>
        <Button data-testid="button">Info</Button>
        <Tooltip>Tooltip</Tooltip>
      </TooltipTrigger>
    </ThemeProvider>
  );
  const button = screen.getByTestId('button');
  button.focus();
  expect(button).toHaveFocus();

  const tooltip = screen.getByText(/Tooltip/);
  expect(tooltip).toBeDefined();
});
