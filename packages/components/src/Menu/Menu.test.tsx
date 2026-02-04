import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SVGProps } from 'react';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, BasicActionMenu, MenuSection } from './Menu.stories';

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

const user = userEvent.setup();

test('renders the button but no menu by default', () => {
  renderWithOverlay(<Basic.Component />);
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
  renderWithOverlay(<BasicActionMenu.Component />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  await user.click(button);

  const item = screen.getByText('Settings');
  expect(item).toBeInTheDocument();
});

test('supports onOpenChange property', async () => {
  const onOpenChange = vi.fn();
  renderWithOverlay(
    <Basic.Component data-testid="menu" onOpenChange={() => onOpenChange()} />
  );
  expect(onOpenChange).toBeCalledTimes(0);
  await user.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
});

test('supports Menu with sections', async () => {
  renderWithOverlay(<MenuSection.Component aria-label="Menu with sections" />);

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

  renderWithOverlay(
    <Basic.Component
      data-testid="menu"
      aria-label="Descriptive label for the button"
      label={<Icon />}
    />
  );

  const btn = screen.getByLabelText('Descriptive label for the button');
  expect(btn).toBeInTheDocument();
});
