/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@marigold/system';

import { Dialog } from './Dialog';
import { Button } from '../Button';

const theme = {
  space: {
    none: 0,
    xxsmall: 1,
    xsmall: 2,
    small: 4,
    medium: 8,
    large: 16,
  },
  component: {
    Dialog: {
      base: {
        container: {
          p: 'large',
        },
        closeButton: {
          p: 'xxsmall',
        },
      },
      variant: {
        custom: {
          container: {
            p: 'medium',
          },
          closeButton: {
            p: 'xsmall',
          },
        },
      },
    },
  },
};

test('dialog can be opened by button', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>Content</Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);
  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();
});

test('supports close Button', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>Content</Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);
  const dialog = screen.getByText('Content');

  expect(dialog.firstChild?.lastChild).toBeInTheDocument();

  fireEvent.click(dialog.firstChild?.lastChild);
  expect(dialog).not.toBeVisible();
});
