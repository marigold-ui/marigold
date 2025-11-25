import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SVGProps } from 'react';
import { vi } from 'vitest';
import * as stories from './Menu.stories';

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

const user = userEvent.setup();

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

test('renders action menu', async () => {
  render(<BasicActionMenu />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  await user.click(button);

  const item = screen.getByText('Settings');
  expect(item).toBeInTheDocument();
});

test('supports onOpenChange property', async () => {
  const onOpenChange = vi.fn();
  render(<Basic data-testid="menu" onOpenChange={() => onOpenChange()} />);
  expect(onOpenChange).toBeCalledTimes(0);
  await user.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
});

test('supports Menu with sections', async () => {
  render(<MenuSection aria-label="Menu with sections" />);

  const button = screen.getByRole('button');
  await user.click(button);

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
