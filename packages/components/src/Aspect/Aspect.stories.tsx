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
      table: {
        defaultValue: {
          summary: 'square',
        },
      },
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
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4820.000043444012!2d7.826018541821473!3d48.020383262446884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b1e29425703%3A0xbe342117a976e59!2sEuropa-Park%20Stadion!5e1!3m2!1sde!2sde!4v1647595604899!5m2!1sde!2sde"
      title="map_sc"
      width="100%"
      height="100%"
    />
  </Aspect>
);

export const CutImage: ComponentStory<typeof Aspect> = args => (
  <Aspect {...args}>
    <Image
      src="https://images.unsplash.com/photo-1603910234616-3b5f4a6be2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt="event_image"
    />
  </Aspect>
);
