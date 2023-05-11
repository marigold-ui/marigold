import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';
import { Text } from '../Text';
import { Box } from '@marigold/system';

const meta = {
  title: 'Components/Message',
  component: Message,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variants of the message',
    },
    messageTitle: {
      control: {
        type: 'text',
      },
      description: 'Content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Danger Zone!' },
      },
    },
  },
  args: {
    messageTitle: 'Danger Zone!',
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Message {...args}>
      <Text>Hello, I am a simple message.</Text>
    </Message>
  ),
};

export const MultiLineTitle: Story = {
  render: () => (
    <Box css={{ width: 250 }}>
      <Message
        messageTitle="Hey! You! I am an info box! Please notice me, it might help you!"
        variant="info"
      >
        <Text>I am really not that good at righting copy texts, sorry.</Text>
      </Message>
    </Box>
  ),
};
