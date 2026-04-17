/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { WithHeaderActions } from './Panel.stories';

describe('Panel.Header', () => {
  test('lays out children in a two-column grid with named areas', () => {
    render(<WithHeaderActions.Component />);

    const header = screen.getByRole('heading', {
      name: 'Team Members',
    }).parentElement!;

    expect(header.className).toContain('grid');
    expect(header.className).toContain('grid-cols-[1fr_auto]');
    expect(header.className).toContain(
      "[grid-template-areas:'title_actions'_'description_actions']"
    );
  });
});
