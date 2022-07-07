import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Aspect } from './Aspect';
import { Image } from '../Image';

export default {
  title: 'Components/Aspect',
  argTypes: {
    ratio: {
      control: {
        type: 'select',
      },
      options: [
        'square',
        'landscape',
        'portrait',
        'widescreen',
        'ultrawide',
        'golden',
      ],
      description: 'choose between content and header',
      defaultValue: 'square',
    },
    maxWidth: {
      control: {
        type: 'text',
      },
      description: 'Maximum width',
      defaultValue: '500px',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Aspect> = args => (
  <Aspect {...args}>
    <Image
      src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
      alt="some image"
    />
  </Aspect>
);

export const CutImage: ComponentStory<typeof Aspect> = args => (
  <Aspect {...args}>
    <Image
      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt="event_image"
    />
  </Aspect>
);
