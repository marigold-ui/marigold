import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { ValidationMessage } from './ValidationMessage';
import { Exclamation } from '@marigold/icons';

export default {
  title: 'Components/ValidationMessage',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'error',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof ValidationMessage> = args => (
  <ValidationMessage {...args}>
    <Exclamation />
    Validation message
  </ValidationMessage>
);
