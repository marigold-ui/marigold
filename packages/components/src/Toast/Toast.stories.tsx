import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { Toast, queue } from './Toast';
import { ToastContent } from './ToastContent';
import { addToast } from './ToastQueue';

const meta: Meta = {
  title: 'Components/Toast',

  args: {
    position: 'bottom-right', // Default position
    title: 'Dies ist eine Toast-Nachricht!',
    description: 'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
    variant: null,
    timeout: 0, // 0 means no timeout
  },
  beforeEach: () => {
    // Clear the toast queue before each story
    queue.clear();
  },

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
      defaultValue: 'bottom-right',
    },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'error', 'warning', null], // 'null' for default
      description: 'Variant of the toast, affects its appearance',
      defaultValue: null,
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
      defaultValue: 0,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <>
        <Toast position={args.position} />

        <Button
          onPress={() =>
            addToast(args.title, args.description, args.variant, args.timeout)
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
};
export const ToastShowsOnButtonClick: Story = {
  args: {
    title: 'Test Toast',
    description: 'Test Beschreibung',
    variant: 'success',
  },
  tags: ['component-test'],
  render: args => {
    return (
      <>
        <Toast position={args.position} />
        <Button
          onPress={() =>
            addToast(args.title, args.description, args.variant, args.timeout)
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
  play: async ({ step }) => {
    const canvas = within(window.document.body);
    const button = canvas.getByRole('button', { name: /show toast/i });

    await step('Click the Show Toast button', async () => {
      // Act
      await userEvent.click(button);
    });

    await step('Toast with title and description appears', async () => {
      // Assert
      await expect(await canvas.findByText('Test Toast')).toBeInTheDocument();
      await expect(
        await canvas.findByText('Test Beschreibung')
      ).toBeInTheDocument();
    });
    await step('Close the toast', async () => {
      const closeButton = canvas.getByRole('button', {
        name: /Schließen/i,
      });
      await userEvent.click(closeButton);
      // Wait briefly to allow the toast to disappear
      await new Promise(resolve => setTimeout(resolve, 300));
      await expect(canvas.queryByText('Test Toast')).not.toBeInTheDocument();
    });
  },
};
export const ProgrammaticDismissal: Story = {
  render: args => {
    const [toastKey, setToastKey] = React.useState<string | null>(null);
    return (
      <>
        <Toast />
        <Button
          onPress={() => {
            if (!toastKey) {
              setToastKey(
                addToast(
                  args.title,
                  args.description,
                  args.variant,
                  args.timeout
                )
              );
            } else {
              queue.close(toastKey);
              setToastKey(null);
            }
          }}
        >
          {toastKey ? 'Hide' : 'Show'} Toast
        </Button>
      </>
    );
  },
};
export const ToastContentTest: Story = {
  args: {
    title: 'Toast für a11y checks',
    description: 'Dieser Toast dient nur zu Testzwecken.',
    variant: 'info',
    timeout: 0,
  },

  render: args => {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <ToastContent
          toast={{
            content: {
              title: args.title,
              description: args.description,
              variant: args.variant,
            },
            key: 'toast-key', // Unique key for the toast
          }}
        />
      </div>
    );
  },
};
