import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { Toast } from './Toast';
import { ToastProvider, queue } from './ToastProvider';
import { useToast } from './ToastQueue';

const meta = preview.meta({
  title: 'Components/Toast',
  component: Toast,
  beforeEach: () => {
    // Clear the toast queue before each story
    queue.clear();
  },
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: () => {
    const { addToast } = useToast();
    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title: 'Dies ist eine Toast-Nachricht!',
              description:
                'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
              variant: 'info',
              timeout: 0,
            })
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
  play: async ({ canvas, step }) => {
    const button = canvas.getByRole('button', { name: /show toast/i });

    await step('Click the Show Toast button', async () => {
      await userEvent.click(button);
    });

    await step('Toast with title and description appears', async () => {
      await expect(
        await canvas.findByText('Dies ist eine Toast-Nachricht!')
      ).toBeInTheDocument();
      await expect(
        await canvas.findByText(
          'Hier ist eine kurze Beschreibung der Toast-Nachricht.'
        )
      ).toBeInTheDocument();
    });
    await step('Close the toast', async () => {
      const closeButton = canvas.getByRole('button', {
        name: 'Close toast',
      });
      await userEvent.click(closeButton);
      // Wait briefly to allow the toast to disappear
      await new Promise(resolve => setTimeout(resolve, 300));
      await expect(
        canvas.queryByText('Dies ist eine Toast-Nachricht!')
      ).not.toBeInTheDocument();
    });
  },
});

export const ToggleToast = meta.story({
  render: () => {
    const [toastKey, setToastKey] = useState<string | null>(null);
    const { addToast, removeToast } = useToast();
    return (
      <>
        <ToastProvider />
        <Button
          onPress={() => {
            if (!toastKey) {
              setToastKey(
                addToast({
                  title: 'Dies ist eine Toast-Nachricht!',
                  description:
                    'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
                  variant: 'info',
                  timeout: 0,
                })
              );
            } else {
              removeToast(toastKey);
              setToastKey(null);
            }
          }}
        >
          {toastKey ? 'Hide' : 'Show'} Toast
        </Button>
      </>
    );
  },

  play: async ({ canvas, step }) => {
    const button = canvas.getByRole('button', { name: /show toast/i });

    await step('Click the Show Toast button', async () => {
      await userEvent.click(button);
    });

    await step('Toast with title and description appears', async () => {
      await expect(
        await canvas.findByText('Dies ist eine Toast-Nachricht!')
      ).toBeInTheDocument();
      await expect(
        await canvas.findByText(
          'Hier ist eine kurze Beschreibung der Toast-Nachricht.'
        )
      ).toBeInTheDocument();
    });
    await step('Close the toast', async () => {
      await userEvent.click(button);
      // Wait briefly to allow the toast to disappear
      await new Promise(resolve => setTimeout(resolve, 300));
      await expect(
        canvas.queryByText('Dies ist eine Toast-Nachricht!')
      ).not.toBeInTheDocument();
    });
  },
});

export const ToastContentTest = meta.story({
  render: () => {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Toast
          toast={{
            content: {
              title: 'Toast für accessibility checks',
              description: 'Dieser Toast dient nur zu Testzwecken.',
              variant: 'info',
            },
            key: 'toast-key',
          }}
        />
      </div>
    );
  },
});

export const WithLinks = meta.story({
  render: () => {
    const { addToast } = useToast();
    const description = (
      <>
        A new version is available.{' '}
        <Link
          href="https://www.marigold-ui.io/releases/blog-overview"
          target="_blank"
        >
          View changelog
        </Link>{' '}
        or{' '}
        <Link href="https://github.com/marigold-ui/marigold">Update now</Link>
      </>
    );

    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title: 'Update Available',
              description,
              variant: 'info',
              timeout: 0,
            })
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
});

export const WithAction = meta.story({
  tags: ['component-test'],
  render: () => {
    const { addToast } = useToast();

    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title: 'Update Available',
              description: 'A new version is available.',
              variant: 'info',
              timeout: 0,
              action: (
                <Button size="small" variant="primary">
                  Update now
                </Button>
              ),
            })
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
});

WithAction.test('With action test', async ({ canvas, step }) => {
  const button = canvas.getByRole('button', { name: /show toast/i });

  await step('Click the Show Toast button', async () => {
    await userEvent.click(button);
  });

  await step('Toast with title and description appears', async () => {
    await expect(
      await canvas.findByText('Update Available')
    ).toBeInTheDocument();
    await expect(
      await canvas.findByText('A new version is available.')
    ).toBeInTheDocument();
  });

  await step('Click the button in toast', async () => {
    const button = canvas.getByText('Update now');

    await userEvent.click(button);
    // Wait briefly to allow any transitions to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(button).toBeInTheDocument();
  });
});
