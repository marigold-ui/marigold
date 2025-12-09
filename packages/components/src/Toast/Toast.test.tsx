import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteProps } from '@marigold/components';
import { Basic } from './Toast.stories';
import { useToast } from './ToastQueue';

const BasicComponent = (props: AutocompleteProps) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

afterEach(() => {
  const { clearToasts } = useToast();
  clearToasts();
});

describe('Toast', () => {
  const { addToast, clearToasts } = useToast();
  test('renders without crashing', async () => {
    render(<BasicComponent />);
    await addToast({ title: 'Dies ist eine Toast-Nachricht!' });
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');

    expect(toast).toBeInTheDocument();
  });

  it.each(['info', 'success', 'error', 'warning'])(
    'renders %s variant',
    async variant => {
      render(<BasicComponent />);
      await addToast({
        title: `${variant} Toast`,
        description: `This is a ${variant} toast.`,
        variant: `${variant}` as 'info' | 'success' | 'error' | 'warning',
      });

      const icon = screen.getByTestId('toast-icon');

      expect(icon).toBeInTheDocument();
    }
  );

  test('clearToasts function works', async () => {
    render(<BasicComponent />);
    const button = screen.getByRole('button', { name: 'Show Toast' });

    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    await clearToasts();

    expect(toast).not.toBeInTheDocument();
  });

  test('renders action when provided', async () => {
    render(<BasicComponent />);
    const actionButton = <button>Undo</button>;

    await addToast({
      title: 'Test Toast with Action',
      description: 'This toast has an action',
      action: actionButton,
    });

    const actionElement = screen.getByText('Undo');

    expect(actionElement).toBeInTheDocument();
  });
});
