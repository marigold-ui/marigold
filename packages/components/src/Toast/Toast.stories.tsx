import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';
import { Button } from '../Button';
import { Toast, queue } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    title: 'Dies ist eine Toast-Nachricht!',
    description: 'Hier ist eine kurze Beschreibung der Toast-Nachricht.',
    variant: null,
  },
  argTypes: {
    variant: {
      control: { varaint: 'select' },
      options: ['info', 'success', 'error', 'warning', null], // 'null' for default
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <>
        <Toast />
        <Button
          onPress={() =>
            queue.add({
              title: args.title,
              description: args.description,
              variant: args.variant,
            })
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
        <Toast />
        <Button
          onPress={() =>
            queue.add({
              title: args.title,
              description: args.description,
              variant: args.variant,
            })
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
