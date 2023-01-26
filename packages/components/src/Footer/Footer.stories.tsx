import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Footer } from './Footer';
import isChromatic from 'chromatic';

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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
