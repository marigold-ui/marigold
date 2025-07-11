import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import * as stories from './Toast.stories';
import { clearToasts } from './ToastQueue';

const { Basic } = composeStories(stories);

afterEach(() => {
  clearToasts();
});
beforeEach(async () => {});
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
    render(<Basic />);
    const button = screen.getByRole('button', { name: 'Show Toast' });
    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    act(() => {
      clearToasts();
    });

    expect(toast).not.toBeInTheDocument();
  });
});
