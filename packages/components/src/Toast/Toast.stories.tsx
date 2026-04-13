import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { Toast } from './Toast';
import { ToastProvider, queue } from './ToastProvider';
import { useToast } from './ToastQueue';

// Toast stories use the queue API (not direct props), so we define
// custom args that map to addToast() options rather than ToastProps.
// Type casts are needed because Storybook infers args from Toast's
// nested `toast.content` prop shape, which doesn't match flat controls.
interface ToastStoryArgs {
  title: string;
  description: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  timeout: number;
}

const toastArgs = (args: unknown) => args as ToastStoryArgs;

const defaults = {
  title: 'Dies ist eine Toast-Nachricht!',
  description: 'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
  variant: 'info' as const,
  timeout: 0,
};

const meta = preview.meta({
  title: 'Components/Toast',
  component: Toast,
  // Custom argTypes/args for the queue API (not matching ToastProps directly)
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the toast',
    },
    title: {
      control: 'text',
      description: 'The title of the toast',
    },
    description: {
      control: 'text',
      description: 'The description of the toast',
    },
    timeout: {
      control: 'number',
      description:
        'Auto-dismiss timeout in ms (0 = no auto-dismiss, minimum 5000ms)',
    },
  } as Record<string, unknown>,
  args: defaults as unknown as Record<string, never>,
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
  render: function Render(_args: unknown) {
    const args = toastArgs(_args);
    const { addToast } = useToast();
    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title: args.title,
              description: args.description,
              variant: args.variant,
              timeout: args.timeout,
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
      await expect(await canvas.findByText(defaults.title)).toBeInTheDocument();
      await expect(
        await canvas.findByText(defaults.description)
      ).toBeInTheDocument();
    });
    await step('Close the toast', async () => {
      const closeButton = canvas.getByRole('button', {
        name: 'Close',
      });
      await userEvent.click(closeButton);
      // Wait briefly to allow the toast to disappear
      await new Promise(resolve => setTimeout(resolve, 300));
      await expect(canvas.queryByText(defaults.title)).not.toBeInTheDocument();
    });
  },
});

export const ToggleToast = meta.story({
  render: function Render(_args: unknown) {
    const args = toastArgs(_args);
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
                  title: args.title,
                  description: args.description,
                  variant: args.variant,
                  timeout: args.timeout,
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
      await expect(await canvas.findByText(defaults.title)).toBeInTheDocument();
      await expect(
        await canvas.findByText(defaults.description)
      ).toBeInTheDocument();
    });
    await step('Close the toast', async () => {
      await userEvent.click(button);
      // Wait briefly to allow the toast to disappear
      await new Promise(resolve => setTimeout(resolve, 300));
      await expect(canvas.queryByText(defaults.title)).not.toBeInTheDocument();
    });
  },
});

export const ToastContentTest = meta.story({
  render: function Render(_args: unknown) {
    const args = toastArgs(_args);
    return (
      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Toast
          toast={{
            content: {
              title: args.title,
              description: args.description,
              variant: args.variant,
            },
            key: 'toast-key',
          }}
        />
      </div>
    );
  },
});

export const WithLinks = meta.story({
  args: {
    title: 'Update Available',
  } as unknown as Record<string, never>,
  render: function Render(_args: unknown) {
    const args = toastArgs(_args);
    const { addToast } = useToast();
    const description = (
      <>
        A new version is available.{' '}
        <Link
          href="https://www.marigold-ui.io/releases/release-notes"
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
              title: args.title,
              description,
              variant: args.variant,
              timeout: args.timeout,
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
  args: {
    title: 'Update Available',
    description: 'A new version is available.',
  } as unknown as Record<string, never>,
  render: function Render(_args: unknown) {
    const args = toastArgs(_args);
    const { addToast } = useToast();

    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title: args.title,
              description: args.description,
              variant: args.variant,
              timeout: args.timeout,
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
