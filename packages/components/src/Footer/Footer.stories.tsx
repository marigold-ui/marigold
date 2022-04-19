import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Footer } from './Footer';

export default {
  title: 'Components/Footer',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the footer',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the footer',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Footer> = args => (
  <Footer>This is a Footer.</Footer>
);
