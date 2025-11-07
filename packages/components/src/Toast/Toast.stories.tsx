import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, userEvent } from 'storybook/test';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { Toast } from './Toast';
import { ToastProvider, queue } from './ToastProvider';
import { useToast } from './ToastQueue';

const meta: Meta = {
  title: 'Components/Toast',
  argTypes: {
    position: {
      control: { type: 'radio' },
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top',
        'bottom',
      ],
      description: 'Position of the toast on the screen',
      table: {
        defaultValue: { summary: 'bottom-right' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'error', 'warning', 'default'],
      description: 'Variant of the toast, affects its appearance',
    },
    title: { control: 'text', description: 'Title of the toast' },
    description: {
      control: 'text',
      description: 'Optional description for the toast',
    },
    timeout: {
      control: { type: 'number' },
      description:
        'Time in milliseconds after which the toast will automatically close. Use 0 for no timeout.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    position: 'bottom-right',
    title: 'Dies ist eine Toast-Nachricht!',
    description: 'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
    variant: 'default',
    timeout: 0,
  },
  beforeEach: () => {
    // Clear the toast queue before each story
    queue.clear();
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  render: ({ position, title, description, variant, timeout }) => {
    const { addToast } = useToast();
    return (
      <>
        <ToastProvider position={position} />
        <Button
          onPress={() => addToast({ title, description, variant, timeout })}
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
};

export const ToggleToast: Story = {
  render: ({ position, title, description, variant, timeout }) => {
    const [toastKey, setToastKey] = React.useState<string | null>(null);
    const { addToast, removeToast } = useToast();
    return (
      <>
        <ToastProvider position={position} />
        <Button
          onPress={() => {
            if (!toastKey) {
              setToastKey(addToast({ title, description, variant, timeout }));
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
};

export const ToastContentTest: Story = {
  args: {
    title: 'Toast für accessibility checks',
    description: 'Dieser Toast dient nur zu Testzwecken.',
    variant: 'info',
    timeout: 0,
  },
  render: ({ title, description, variant }) => {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <Toast
          toast={{
            content: {
              title: title,
              description: description,
              variant: variant,
            },
            key: 'toast-key',
          }}
        />
      </div>
    );
  },
};

export const WithLinks: Story = {
  tags: ['component-test'],
  args: {
    title: 'Update Available',
    variant: 'info',
  },
  render: ({ title, variant }) => {
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
              title,
              description,
              variant,
              timeout: 0,
            })
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
};

export const WithAction: Story = {
  tags: ['component-test'],
  args: {
    title: 'Update Available',
    variant: 'info',
    description: 'A new version is available.',
  },
  render: ({ title, variant, description }) => {
    const { addToast } = useToast();

    return (
      <>
        <ToastProvider />
        <Button
          onPress={() =>
            addToast({
              title,
              description,
              variant,
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
  play: async ({ canvas, step }) => {
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

      await expect(button).toBeInTheDocument();
    });
  },
};
