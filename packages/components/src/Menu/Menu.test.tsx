import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SVGProps } from 'react';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { ActionMenu } from './ActionMenu';
import { AccessSections, Basic } from './Menu.stories';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

window.matchMedia = mockMatchMedia([smallScreenQuery]);

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

test('supports onOpenChange property', async () => {
  const onOpenChange = vi.fn();
  renderWithOverlay(
    <Basic.Component data-testid="menu" onOpenChange={() => onOpenChange()} />
  );
  expect(onOpenChange).toBeCalledTimes(0);
  await user.click(screen.getByRole('button'));
  expect(onOpenChange).toBeCalledTimes(1);
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

describe('tray accessible name (small screen)', () => {
  test('Menu names the tray after its visible trigger label', async () => {
    renderWithOverlay(<Basic.Component />);
    await user.click(screen.getByRole('button', { name: 'Hogwarts Houses' }));

    expect(
      await screen.findByRole('dialog', { name: 'Hogwarts Houses' })
    ).toBeInTheDocument();
  });

  test('Menu prefers its aria-label over the trigger label', async () => {
    renderWithOverlay(<Basic.Component aria-label="Houses" />);
    await user.click(screen.getByRole('button', { name: 'Houses' }));

    expect(
      await screen.findByRole('dialog', { name: 'Houses' })
    ).toBeInTheDocument();
  });

  test('ActionMenu forwards its aria-label to the tray', async () => {
    renderWithOverlay(<AccessSections.Component />);
    await user.click(screen.getByRole('button', { name: 'Filial-Aktionen' }));

    expect(
      await screen.findByRole('dialog', { name: 'Filial-Aktionen' })
    ).toBeInTheDocument();
  });

  test('ActionMenu forwards its aria-labelledby to the tray', async () => {
    renderWithOverlay(
      <MarigoldProvider theme={theme}>
        <span id="offer-label">Angebot 42</span>
        <ActionMenu aria-labelledby="offer-label">
          <ActionMenu.Item id="edit">Bearbeiten</ActionMenu.Item>
        </ActionMenu>
      </MarigoldProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Angebot 42' }));

    expect(
      await screen.findByRole('dialog', { name: 'Angebot 42' })
    ).toBeInTheDocument();
  });

  test('does not warn about an unlabelled dialog', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithOverlay(<AccessSections.Component />);
    await user.click(screen.getByRole('button', { name: 'Filial-Aktionen' }));
    await screen.findByRole('dialog');

    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('must have an aria-label or aria-labelledby')
    );
    warn.mockRestore();
  });
});
