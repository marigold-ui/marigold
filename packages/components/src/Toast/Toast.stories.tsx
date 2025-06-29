import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';
import { Button } from '../Button';
import { Toast, queue } from './Toast';
import { addToastToQueue } from './ToastQueue';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    position: 'top-right', // Default position
    title: 'Dies ist eine Toast-Nachricht!',
    description: 'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
    variant: null,
    timeout: 0, // 0 means no timeout
  },
  argTypes: {
    variant: {
      control: { varaint: 'select' },
      options: ['info', 'success', 'error', 'warning', null], // 'null' for default
    },
    title: { control: 'text' },
    description: { control: 'text' },
    timeout: {
      control: { type: 'number' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <>
        <Toast position="top-right" />
        <Button
          onPress={() =>
            addToastToQueue(
              args.title,
              args.description,
              args.variant,
              args.timeout
            )
          }
        ></Button>
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
        <Toast />
        <Button
          onPress={() =>
            addToastToQueue(
              args.title,
              args.description,
              args.variant,
              args.timeout
            )
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(window.document.body);
    const button = await canvas.getByRole('button', { name: /show toast/i });

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
      const closeButton = await canvas.getByRole('button', {
        name: /Schließen/i,
      });
      await userEvent.click(closeButton);
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
                queue.add(
                  {
                    title: args.title,
                    description: args.description,
                    variant: args.variant,
                  },
                  { timeout: args.timeout }
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
