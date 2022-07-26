import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Callout } from './Callout';

export default {
  title: 'Components/Callout',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the text',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Callout> = args => (
  <Callout {...args}>
    Information: I should give you some hint or at least a useful tip.
  </Callout>
);
