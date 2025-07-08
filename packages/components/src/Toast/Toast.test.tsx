import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockInstance, vi } from 'vitest';
import * as stories from './Toast.stories';

const { Basic } = composeStories(stories);
let warnMock: MockInstance;
beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});
afterEach(() => {
  warnMock.mockRestore();
});

describe('Toast', () => {
  test('renders without crashing', async () => {
    render(<Basic />);
    const button = screen.getByRole('button', { name: 'Show Toast' });
    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    expect(toast).toBeInTheDocument();
  });
});
