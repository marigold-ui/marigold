import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { Message } from './Message';

const meta = {
  title: 'Components/Message',
  component: Message,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['success', 'info', 'warning', 'error'],
      description: 'The variants of the message',
    },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Message {...args}>
      <Message.Title>Danger Zone!</Message.Title>
      <Message.Content>
        <Text>Hello, I am a simple message.</Text>
      </Message.Content>
    </Message>
  ),
};

export const MultiLineTitle: Story = {
  render: args => (
    <div className="w-60">
      <Message {...args}>
        <Message.Content>
          I am really not that good at righting copy texts, sorry.
        </Message.Content>
        <Message.Title>
          Hey! You! I am an info box! Please notice me, it might help you!
        </Message.Title>
      </Message>
    </div>
  ),
};

export const LongMessage: Story = {
  render: args => (
    <Message {...args}>
      <Message.Title>Danger Zone!</Message.Title>
      <Message.Content>
        <Text>
          In up so discovery my middleton eagerness dejection explained.
          Estimating excellence ye contrasted insensible as. Oh up unsatiable
          advantages decisively as at interested. Present suppose in esteems in
          demesne colonel it to. End horrible she landlord screened stanhill.
          Repeated offended you opinions off dissuade ask packages screened. She
          alteration everything sympathize impossible his get compliment.
          Collected few extremity suffering met had sportsman.
        </Text>
      </Message.Content>
    </Message>
  ),
};
