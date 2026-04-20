/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { WithHeaderActions } from './Panel.stories';

describe('Panel.HeaderActions', () => {
  test('aligns to the actions grid area with vertical centering', () => {
    render(<WithHeaderActions.Component />);

    const actionsSlot = screen.getByRole('button', {
      name: /Invite member/,
    }).parentElement!;

    expect(actionsSlot.className).toContain('[grid-area:actions]');
    expect(actionsSlot.className).toContain('self-center');
  });
});
