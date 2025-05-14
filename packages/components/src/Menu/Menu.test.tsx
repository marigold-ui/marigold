import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SVGProps } from 'react';
import { vi } from 'vitest';
import * as stories from './Menu.stories';

// Setup
// ---------------
const user = userEvent.setup();

const { Basic, BasicActionMenu, MenuSection } = composeStories(stories);

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

test('renders the button but no menu by default', () => {
  render(<Basic />);
  const button = screen.queryByText('Hogwarts Houses');
  const gryffindor = screen.queryByText('Gryffindor');
  const hufflepuff = screen.queryByText('Hufflepuff');
  const ravenclaw = screen.queryByText('Ravenclaw');
  const slytherin = screen.queryByText('Slytherin');

  expect(button).toBeInTheDocument();
  expect(gryffindor).not.toBeInTheDocument();
  expect(hufflepuff).not.toBeInTheDocument();
  expect(ravenclaw).not.toBeInTheDocument();
  expect(slytherin).not.toBeInTheDocument();
});

test('supports "Menu" variant classnames from theme', () => {
  render(<Basic data-testid="menu" variant="one" />);
  const button = screen.getByText('Hogwarts Houses');
  fireEvent.click(button);

  const menu = screen.getByRole('menu');
  const item = screen.getByText('Gryffindor');

  expect(menu.className).toMatchInlineSnapshot(
    `"list-none break-words rounded-[2px] border p-0 sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh] flex flex-col overflow-y-auto overflow-x-hidden border-border-inverted bg-surface-overlay border-solid"`
  );
  expect(item.className).toMatchInlineSnapshot(
    `"cursor-pointer p-1 focus:outline-0 disabled:text-text-base-disabled disabled:cursor-not-allowed data-hovered:text-text-inverted data-hovered:bg-linear-to-t from-highlight-start/80 to-highlight-end/90 text-xs data-selected:bg-bg-selected"`
  );
});

test('supports "Menu" sizes from theme', () => {
  render(<Basic data-testid="menu" size="large" />);
  const button = screen.getByRole('button');
  fireEvent.click(button);

  const item = screen.getByText('Gryffindor');
  expect(item.className).toMatchInlineSnapshot(
    `"cursor-pointer p-1 focus:outline-0 disabled:text-text-base-disabled disabled:cursor-not-allowed data-hovered:text-text-inverted data-hovered:bg-linear-to-t from-highlight-start/80 to-highlight-end/90 text-xs data-selected:bg-bg-selected"`
  );
});

test('renders action menu', () => {
  render(<BasicActionMenu />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  const item = screen.getByText('Settings');
  expect(item).toBeInTheDocument();
});

test('supports open property', () => {
  render(<Basic data-testid="menu" open={true} />);

  const item = screen.getByText('Gryffindor');
  expect(item).toBeInTheDocument();
});

test('supports onOpenChange property', () => {
  const onOpenChange = vi.fn();
  render(<Basic data-testid="menu" onOpenChange={() => onOpenChange()} />);
  expect(onOpenChange).toBeCalledTimes(0);
  fireEvent.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
});

test('supports Menu with sections', () => {
  render(<MenuSection aria-label="Menu with sections" open />);

  expect(screen.getByText('Food')).toBeInTheDocument();
  expect(screen.getByText('Fruits')).toBeInTheDocument();
});

test('pass "aria-label" to button (when you use a menu with only an icon)', () => {
  const Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props}>
      <circle cx={12} cy={12} r={10} />
    </svg>
  );

  render(
    <Basic
      data-testid="menu"
      aria-label="Descriptive label for the button"
      label={<Icon />}
    />
  );

  const btn = screen.getByLabelText('Descriptive label for the button');
  expect(btn).toBeInTheDocument();
});
