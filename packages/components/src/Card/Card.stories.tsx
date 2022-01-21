import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../Text';

export default {
  title: 'Components/Card',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'card title',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'max width of the card',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Card> = args => (
  <Card title="Card" {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      dignissim dapibus elit.
    </Text>
  </Card>
);
