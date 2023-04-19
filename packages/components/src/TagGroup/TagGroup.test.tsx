import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TagGroup } from './TagGroup';
import { Item } from '@react-stately/collections';
import { Button } from '../Button';
import userEvent from '@testing-library/user-event';

function pressKeyOnButton(key: string) {
  return (button: Node | Window) => {
    fireEvent.keyDown(button, { key });
    fireEvent.keyUp(button, { key });
  };
}

function pressArrowRight(button: Node | Window) {
  return pressKeyOnButton('ArrowRight')(button);
}

function pressArrowLeft(button: Node | Window) {
  return pressKeyOnButton('ArrowLeft')(button);
}

let onRemoveSpy = jest.fn();

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runAllTimers();
  });
  jest.clearAllMocks();
});

afterAll(function () {
  jest.restoreAllMocks();
});

test('render tag group', () => {
  render(
    <TagGroup aria-label="static tag group items">
      <Item key="news">News</Item>
      <Item key="travel">Travel</Item>
      <Item key="gaming">Gaming</Item>
      <Item key="shopping">Shopping</Item>
    </TagGroup>
  );

  const element = screen.getByLabelText('static tag group items');
  expect(element).toBeInTheDocument();
  const tags = screen.getAllByRole('row');
  expect(tags.length).toBe(4);
});

test('has correct accessibility roles', () => {
  render(
    <TagGroup aria-label="tag group">
      <Item aria-label="Tag 1">Tag 1</Item>
    </TagGroup>
  );

  let tagGroup = screen.getByRole('grid');
  expect(tagGroup).toBeInTheDocument();
  let tags = screen.getAllByRole('row');
  let cells = screen.getAllByRole('gridcell');
  expect(tags).toHaveLength(cells.length);
});

test('has correct initial tab index', () => {
  render(
    <TagGroup aria-label="tag group">
      <Item aria-label="Tag 1">Tag 1</Item>
      <Item aria-label="Tag 2">Tag 2</Item>
    </TagGroup>
  );

  let tags = screen.getAllByRole('row');
  expect(tags[0]).toHaveAttribute('tabIndex', '0');
  expect(tags[1]).toHaveAttribute('tabIndex', '0');
});

test.each`
  name                         | props
  ${'on `Delete` keypress'}    | ${{ keyPress: 'Delete' }}
  ${'on `Backspace` keypress'} | ${{ keyPress: 'Backspace' }}
`('Remove tag $name', function ({ name, props }) {
  render(
    <TagGroup aria-label="tag group" allowsRemoving onRemove={onRemoveSpy}>
      <Item key="1" aria-label="Tag 1">
        Tag 1
      </Item>
      <Item key="2" aria-label="Tag 2">
        Tag 2
      </Item>
      <Item key="3" aria-label="Tag 3">
        Tag 3
      </Item>
    </TagGroup>
  );

  let tag = screen.getByText('Tag 2');
  fireEvent.keyDown(tag, { key: props.keyPress });
  fireEvent.keyUp(tag, { key: props.keyPress });
  expect(onRemoveSpy).toHaveBeenCalledTimes(1);
  expect(onRemoveSpy).toHaveBeenCalledWith('2');
});

it('should navigate with keyboard keys through items', function () {
  render(
    <>
      <TagGroup aria-label="tag group">
        <Item key="1" aria-label="Tag 1">
          Tag 1
        </Item>
        <Item key="2" aria-label="Tag 2">
          Tag 2
        </Item>
        <Item key="3" aria-label="Tag 3">
          Tag 3
        </Item>
      </TagGroup>
    </>
  );

  let tags = screen.getAllByRole('row');
  act(() => {
    tags[0].focus();
  });

  pressArrowRight(tags[0]);
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();

  pressArrowRight(tags[1]);
  expect(tags[2]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[1]).not.toHaveFocus();

  pressArrowLeft(tags[2]);
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();
});
