import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { clear } from 'console';
import { act } from 'react';
import { MockInstance, vi } from 'vitest';
import * as stories from './Toast.stories';
import { clearToasts } from './ToastQueue';

const { Basic, ProgrammaticDismissal } = composeStories(stories);
let warnMock: MockInstance;
beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});
afterEach(() => {
  warnMock.mockRestore();
  clearToasts();
});

describe('Toast', () => {
  test('renders without crashing', async () => {
    render(<Basic />);
    const button = screen.getByRole('button', { name: 'Show Toast' });
    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    expect(toast).toBeInTheDocument();
  });

  it.each(['info', 'success', 'error', 'warning'])(
    'renders all variants',
    async variant => {
      render(
        <Basic
          variant={variant}
          title={`${variant} Toast`}
          description={`This is a ${variant} toast.`}
        />
      );
      const button = screen.getByRole('button', { name: 'Show Toast' });
      await userEvent.click(button);

      const icon = screen.getByTestId('toast-icon');
      expect(icon).toBeInTheDocument();
    }
  );

  test('clearToasts function works', async () => {
    render(<ProgrammaticDismissal />);
    const button = screen.getByRole('button', { name: 'Show Toast' });
    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    act(() => {
      clearToasts();
    });

    expect(toast).not.toBeInTheDocument();
  });
});
