/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic } from './Panel.stories';

describe('Panel.Footer', () => {
  test('renders children and picks up horizontal panel padding', () => {
    render(<Basic.Component />);

    const saveButton = screen.getByRole('button', { name: 'Save changes' });
    const footer = saveButton.parentElement!;

    expect(footer.className).toContain('px-(--panel-px)');
    expect(footer).toContainElement(saveButton);
  });
});
