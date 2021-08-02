import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Item, MarigoldProvider } from '..';
import { Select } from './Select';

const theme = {
  button: {
    select: {
      fontFamily: 'Inter',
    },
  },
};

test('supports button select variant', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select).toBeDefined();
  expect(select).toHaveStyle(`font-family: Inter`);
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select
        label="MyLabel"
        className="custom-class-name"
        data-testid="selectId"
      >
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select.className).toMatch('custom-class-name');
});

test('supports label with htmlFor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const selectLabel = screen.getAllByText(/MyLabel/);
  expect(selectLabel[0]).toHaveAttribute('for');
});

test('supports disabled prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId" disabled>
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select).toHaveAttribute('disabled');
  fireEvent.click(select);
  expect(select).toHaveAttribute('aria-expanded', 'false');
});

test('supports placeholder prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" placeholder="placeholder" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveTextContent(/placeholder/);
});

test('option list opens when element is clicked', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);

  // more than one item found because of the HiddenSelect component
  const items = screen.getByRole('listbox');
  expect(items).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('supports click and select an option', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  const items = screen.getAllByText(/Red/);
  expect(items[1]).toBeVisible();
  expect(items[1]).toHaveAttribute('aria-selected', 'false');

  fireEvent.click(items[1]);
  expect(button).toHaveTextContent('Red');

  fireEvent.click(button);

  // after selecting one item there are three elements with item text
  const newItems = screen.getAllByText(/Red/);
  expect(newItems[2]).toHaveAttribute('aria-selected', 'true');
});

test('popup closes after an option is selected', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  const items = screen.getAllByText(/Red/);
  expect(items[1]).toBeVisible();

  fireEvent.click(items[1]);
  expect(button).toHaveTextContent('Red');
  expect(items[1]).not.toBeVisible();
});

test('dismiss popup by clicking escape', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const selectButton = screen.getByTestId('selectId');
  fireEvent.click(selectButton);
  expect(selectButton).toHaveAttribute('aria-expanded', 'true');
  userEvent.type(selectButton, '{esc}');
  expect(selectButton).toHaveAttribute('aria-expanded', 'false');
});

test('allow users to dismiss the popup with hidden dismiss button', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const selectButton = screen.getByTestId('selectId');
  fireEvent.click(selectButton);

  const dismissButton = screen.getByLabelText(/Dismiss/);
  expect(dismissButton).toBeDefined();

  fireEvent.click(dismissButton);
  expect(selectButton).toHaveAttribute('aria-expanded', 'false');
});
