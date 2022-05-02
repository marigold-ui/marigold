import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Message } from './Message';
import { Text } from '../Text';

export default {
  title: 'Components/Message',
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
      defaultValue: 'Danger Zone!',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Message> = args => (
  <Message {...args}>
    <Text>Hello, I am a simple message.</Text>
  </Message>
);
