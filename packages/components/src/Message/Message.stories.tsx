import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Message } from './Message';
import { Text } from '../Text';
import { Box } from '@marigold/system';
import isChromatic from 'chromatic';

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

export const MultiLineTitle: ComponentStory<typeof Message> = () => (
  <Box css={{ width: 250 }}>
    <Message
      messageTitle="Hey! You! I am an info box! Please notice me, it might help you!"
      variant="info"
    >
      <Text>I am really not that good at righting copy texts, sorry.</Text>
    </Message>
  </Box>
);

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
