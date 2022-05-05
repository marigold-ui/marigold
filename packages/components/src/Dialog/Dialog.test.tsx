/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@marigold/system';

import { Dialog } from './Dialog';
import { Button } from '../Button';
import { Headline } from '../Headline';

const theme = {
  space: {
    none: 'none',
    small: '4px',
    large: '16px',
  },
  components: {
    Dialog: {
      base: {
        container: {
          p: 'large',
        },
        closeButton: {
          p: 'small',
        },
      },
      variant: {
        custom: {
          container: {
            bg: 'green',
          },
          closeButton: {
            bg: 'black',
          },
        },
      },
      size: {
        large: {
          container: {
            width: '400px',
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
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
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
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);
  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild!;
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(dialog).not.toBeVisible();
});

test('close Dialog by escape key', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByText('Content');
  userEvent.type(dialog, '{esc}');
  expect(dialog).not.toBeVisible();
});

test('close Dialog by clicking on the Underlay', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');

  fireEvent.mouseDown(document.body);
  fireEvent.mouseUp(document.body);

  expect(dialog).not.toBeVisible();
});

test('supports title for accessability reasons', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Headline');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('supports custom title for accessability reasons', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton aria-labelledby="myTitle">
          <Headline id="myTitle">Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Headline');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('supports focus and open dialog with keyboard', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );

  userEvent.tab();
  userEvent.keyboard('[Enter]');

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
});

test('dialog has base style', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild;

  expect(closeButton).toHaveStyle(`padding: ${theme.space.small}`);
  expect(dialog).toHaveStyle(`padding: ${theme.space.large}`);
});

test('dialog has variant style', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog variant="custom" closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild;

  expect(closeButton).toHaveStyle('background-color: black');
  expect(dialog).toHaveStyle('background-color: green');
});

test('dialog supports size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Dialog.Trigger>
        <Button variant="primary">Open</Button>
        <Dialog size="large" closeButton>
          <Headline>Headline</Headline>
          Content
        </Dialog>
      </Dialog.Trigger>
    </ThemeProvider>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveStyle('width: 400px');
});
