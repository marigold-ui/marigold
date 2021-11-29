import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Item, MarigoldProvider, Section } from '..';
import { Select } from './Select';

const theme = {
  button: {
    select: {
      fontFamily: 'Inter',
      errorOpened: {
        color: 'red',
      },
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

test('supports required prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" required data-testid="selectId">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const selectLabel = screen.getAllByText(/MyLabel/);
  expect(selectLabel[0]).toContainHTML('path d="M10.8 3.84003');
});

test('supports error and errorMessage prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" error errorMessage="error" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const validationMessage = screen.getAllByText(/error/);
  expect(validationMessage).toBeDefined();
});

test('supports width prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" width="120px" data-testid="selectId">
        <Item>1</Item>
      </Select>
    </MarigoldProvider>
  );
  const select = screen.getByTestId('selectId');

  expect(select.parentElement).toHaveStyle(`width: 120px`);
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

test('option list opens when element is clicked and theres an error', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" error errorMessage="error" data-testid="selectId">
        <Item>Red</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);

  const items = screen.getByRole('listbox');
  expect(items).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(button).toHaveStyle(`color: red`);
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

test('supports default selectedKey prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId" defaultSelectedKey="Red">
        <Item key="Red">Red</Item>
        <Item key="Orange">Orange</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveTextContent('Red');
});

test('supports change default selectedKey', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId" defaultSelectedKey="Red">
        <Item key="Red">Red</Item>
        <Item key="Orange">Orange</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  expect(button).toHaveTextContent('Red');

  fireEvent.click(button);
  const items = screen.getAllByText(/Red/);
  fireEvent.click(items[1]);

  expect(button).toHaveTextContent('Red');
});

test('supports disabled item prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="MyLabel" data-testid="selectId" disabledKeys={['Red']}>
        <Item key="Red">Red</Item>
        <Item key="Orange">Orange</Item>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  fireEvent.click(button);
  const redItem = screen.getAllByText(/Red/);
  fireEvent.click(redItem[1]);
  expect(button).toHaveTextContent('Select an option');

  const orangeItem = screen.getAllByText(/Orange/);
  fireEvent.click(orangeItem[1]);
  expect(button).toHaveTextContent('Orange');
});

test('supports section with items', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Select label="Section" data-testid="selectId">
        <Section title="Color">
          <Item>Red</Item>
        </Section>
      </Select>
    </MarigoldProvider>
  );
  const button = screen.getByTestId('selectId');
  fireEvent.click(button);

  const items = screen.getAllByText(/Red/);
  expect(items[1]).toBeVisible();
  const sections = screen.getAllByText(/Color/);
  expect(sections[0]).toBeVisible();
});
