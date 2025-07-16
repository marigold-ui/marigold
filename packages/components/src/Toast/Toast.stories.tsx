import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { Toast, queue } from './Toast';
import { ToastContent } from './ToastContent';
import { addToast } from './ToastQueue';

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
    return (
      <>
        <Toast position={position} />
        <Button onPress={() => addToast(title, description, variant, timeout)}>
          Show Toast
        </Button>
      </>
    );
  },
  play: async ({ step, userEvent }) => {
    const canvas = within(window.document.body);
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
    return (
      <>
        <Toast position={position} />
        <Button
          onPress={() => {
            if (!toastKey) {
              setToastKey(addToast(title, description, variant, timeout));
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

  play: async ({ step }) => {
    const canvas = within(window.document.body);
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
    title: 'Toast für a11y checks',
    description: 'Dieser Toast dient nur zu Testzwecken.',
    variant: 'info',
    timeout: 0,
  },
  render: ({ title, description, variant }) => {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <ToastContent
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
