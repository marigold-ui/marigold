import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@marigold/system';
import { Select } from './Select';
import { Item } from 'react-stately';

const theme = {
  button: {
    select: {
      fontFamily: 'Inter',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select).toBeDefined();
  expect(select).toHaveStyle(`font-family: Inter`);
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select
        label="MyLabel"
        className="custom-class-name"
        data-testid="selectId"
      >
        <Item>1</Item>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select.className).toMatch('custom-class-name');
});

test('supports label with htmlFor prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel">
        <Item>1</Item>
      </Select>
    </ThemeProvider>
  );
  const selectLabel = screen.getAllByText(/MyLabel/);
  expect(selectLabel[0]).toHaveAttribute('for');
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId" disabled>
        <Item>1</Item>
      </Select>
    </ThemeProvider>
  );
  const select = screen.getByTestId('selectId');
  expect(select).toHaveAttribute('disabled');
});

test('supports placeholder prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" placeholder="placeholder" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </ThemeProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveTextContent(/placeholder/);
});

test('option list opens when element is clicked', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);

  // more than one item found because of the HiddenSelect component
  const items = screen.getAllByText(/Red/);
  expect(items[1]).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('supports click and select an option', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
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
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
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

test('component has hidden Items from HiddenSelect component and displayed Items', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
  );
  const button = screen.getByTestId('selectId');

  fireEvent.click(button);
  const items = screen.getAllByText(/Red/);
  expect(items[0]).toBeDefined();
  expect(items[1]).toBeVisible();
});

test('dismiss popup by clicking escape', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
  );
  const selectButton = screen.getByTestId('selectId');
  fireEvent.click(selectButton);
  expect(selectButton).toHaveAttribute('aria-expanded', 'true');
  userEvent.type(selectButton, '{esc}');
  expect(selectButton).toHaveAttribute('aria-expanded', 'false');
});

test('allow users to dismiss the popup with hidden dismiss button', () => {
  render(
    <ThemeProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </ThemeProvider>
  );
  const selectButton = screen.getByTestId('selectId');
  fireEvent.click(selectButton);

  const dismissButton = screen.getByLabelText(/Dismiss/);
  expect(dismissButton).toBeDefined();

  fireEvent.click(dismissButton);
  expect(selectButton).toHaveAttribute('aria-expanded', 'false');
});
