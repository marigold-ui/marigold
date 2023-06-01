import React from 'react';
import { act, screen } from '@testing-library/react';
import { Tag } from '.';
import { Button } from '../Button';
import userEvent from '@testing-library/user-event';
import { Theme, ThemeProvider } from '@marigold/system';

import { setup } from '../test.utils';

import { cva } from 'class-variance-authority';
//TODO: use user.keyboard, use them for style tests, refactoring
const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(),
    Field: cva(),
    HelpText: { container: cva(), icon: cva() },
    Label: { container: cva(), indicator: cva() },
    Tag: {
      tag: cva('border border-slate-600'),
      closeButton: cva('bg-transparent'),
      gridCell: cva('flex gap-1'),
    },
  },
};

const { render } = setup({ theme });

test('render tag group', () => {
  render(
    <Tag.Group aria-label="static tag group items">
      <Tag key="news">News</Tag>
      <Tag key="travel">Travel</Tag>
      <Tag key="gaming">Gaming</Tag>
      <Tag key="shopping">Shopping</Tag>
    </Tag.Group>
  );

  const element = screen.getByLabelText('static tag group items');
  expect(element).toBeInTheDocument();
  const tags = screen.getAllByRole('row');
  expect(tags.length).toBe(4);
});

test('has correct accessibility roles', () => {
  render(
    <Tag.Group aria-label="tag group">
      <Tag aria-label="Day 1">Day 1</Tag>
    </Tag.Group>
  );

  let tagGroup = screen.getByRole('grid');
  expect(tagGroup).toBeInTheDocument();

  let tags = screen.getAllByRole('row');
  let cells = screen.getAllByRole('gridcell');
  expect(tags).toHaveLength(cells.length);
});

test('has correct initial tab index', () => {
  render(
    <Tag.Group aria-label="tag group">
      <Tag aria-label="superhero">Superhero</Tag>
      <Tag aria-label="villain">Villain</Tag>
    </Tag.Group>
  );

  let tags = screen.getAllByRole('row');
  expect(tags[0]).toHaveAttribute('tabIndex', '0');
  expect(tags[1]).toHaveAttribute('tabIndex', '0');
});

test.each`
  name                         | props
  ${'on `Delete` keypress'}    | ${{ keyPress: '{Delete}' }}
  ${'on `Backspace` keypress'} | ${{ keyPress: '{Backspace}' }}
`('Remove tag $name', async ({ name, props }) => {
  let onRemoveSpy = jest.fn();
  const user = userEvent.setup();
  render(
    <Tag.Group aria-label="tag group" allowsRemoving onRemove={onRemoveSpy}>
      <Tag key="1" aria-label="reactjs">
        ReactJs
      </Tag>
      <Tag key="2" aria-label="vuejs">
        Vue.js
      </Tag>
      <Tag key="3" aria-label="anuglar">
        Anuglar
      </Tag>
    </Tag.Group>
  );

  let vuejs = screen.getByText('Vue.js');

  await user.click(vuejs);
  await user.keyboard(`${props.keyPress}`);
  expect(onRemoveSpy).toHaveBeenCalledTimes(1);
  expect(onRemoveSpy).toHaveBeenCalledWith('2');
});

test('should navigate with keyboard keys through items', async () => {
  const user = userEvent.setup();
  render(
    <>
      <Tag.Group aria-label="tag group">
        <Tag key="1" aria-label="small">
          small
        </Tag>
        <Tag key="2" aria-label="medium">
          medium
        </Tag>
        <Tag key="3" aria-label="big">
          big
        </Tag>
      </Tag.Group>
    </>
  );

  let tags = screen.getAllByRole('row');
  act(() => {
    tags[0].focus();
  });

  await user.keyboard('{arrowRight}');
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();

  await user.keyboard('{arrowRight}');
  expect(tags[2]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[1]).not.toHaveFocus();

  await user.keyboard('{arrowLeft}');
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();
});

test('should remember last focused element', async () => {
  const user = userEvent.setup();
  render(
    <>
      <Tag.Group aria-label="tag group">
        <Tag key="1" aria-label="designsystem">
          Design System
        </Tag>
        <Tag key="2" aria-label="core">
          Core
        </Tag>
      </Tag.Group>
      <Button variant="primary" aria-label="ButtonAfter" />
    </>
  );

  let buttonAfter = screen.getByLabelText('ButtonAfter');
  let tags = screen.getAllByRole('row');

  await user.tab();
  await user.tab();
  expect(buttonAfter).toHaveFocus();

  await user.tab({ shift: true });
  expect(tags[0]).toHaveFocus();
});

test('renders error message', () => {
  render(
    <Tag.Group
      aria-label="static tag group items"
      error
      errorMessage="Hier ist ein Fehler aufgetreten!"
    >
      <Tag key="news">News</Tag>
      <Tag key="travel">Travel</Tag>
      <Tag key="gaming">Gaming</Tag>
      <Tag key="shopping">Shopping</Tag>
    </Tag.Group>
  );

  const errorMessage = screen.queryByText('Hier ist ein Fehler aufgetreten!');
  expect(errorMessage).toBeInTheDocument();
});

test('renders label', () => {
  render(
    <Tag.Group aria-label="tag group" label="Categories">
      <Tag aria-label="superhero">Superhero</Tag>
      <Tag aria-label="villian">Villian</Tag>
    </Tag.Group>
  );

  const label = screen.queryByLabelText('Categories');
  expect(label).toBeInTheDocument();
});

test('render same styles for each tag', () => {
  render(
    <ThemeProvider theme={theme}>
      <Tag.Group aria-label="static tag group items" allowsRemoving>
        <Tag key="news" data-testid="news">
          News
        </Tag>
        <Tag key="travel">Travel</Tag>
        <Tag key="gaming">Gaming</Tag>
        <Tag key="shopping">Shopping</Tag>
      </Tag.Group>
    </ThemeProvider>
  );

  const taggroup = screen.getByRole('presentation');
  expect(taggroup).toBeVisible();
  expect(taggroup.className).toMatchInlineSnapshot(
    `"flex flex-wrap items-start gap-1"`
  );

  // eslint-disable-next-line testing-library/no-node-access
  const tag = screen.getByTestId('news').parentElement;
  expect(tag).toBeVisible();
  expect(tag).toHaveClass(`border border-slate-600`);

  // eslint-disable-next-line testing-library/no-node-access
  const gridCell = tag!.firstChild;
  expect(gridCell).toHaveClass(`flex gap-1`);

  // eslint-disable-next-line testing-library/no-node-access
  const closeButton = gridCell?.lastChild;

  expect(closeButton).toHaveClass('bg-transparent');
});
