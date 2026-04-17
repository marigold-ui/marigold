/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic, TableInside } from './Panel.stories';

describe('Panel.Content', () => {
  test('renders children and picks up horizontal panel padding by default', () => {
    render(<Basic.Component />);

    const wrapper = screen
      .getByLabelText('Organizer Name')
      .closest('div[class*="px-(--panel-px)"]');

    expect(wrapper).not.toBeNull();
  });

  test('`bleed` opts out of the horizontal padding', () => {
    render(<TableInside.Component />);

    const table = screen.getByRole('grid', { name: 'Recent orders' });
    const contentWrapper = table.parentElement!;

    expect(contentWrapper.className).not.toContain('px-(--panel-px)');
  });
});
