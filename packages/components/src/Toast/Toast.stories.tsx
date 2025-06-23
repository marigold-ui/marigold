import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { Toast, queue } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    message: 'Dies ist eine Toast-Nachricht!',
    type: 'info', // oder 'success', 'error', 'warning'
    open: true,
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'error', 'warning'],
    },
    message: { control: 'text' },
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: args => {
    return (
      <>
        <Toast />
        <Button
          onPress={() =>
            queue.add({
              title: 'Toast complete!',
              description: 'Great success.',
            })
          }
        >
          {' '}
          Show Toast
        </Button>
      </>
    );
  },
};
