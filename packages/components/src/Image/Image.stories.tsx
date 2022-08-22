import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Image } from './Image';

export default {
  title: 'Components/Image',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'variant of the image',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'size of the image',
    },
    fit: {
      control: {
        type: 'select',
      },
      options: [
        '',
        'contain',
        'cover',
        'fill',
        'none',
        'scale-down',
        'inherit',
        'initial',
        'revert',
        'revert-layer',
        'unset',
      ],
      description: 'object fit value',
    },
    position: {
      control: {
        type: 'text',
      },
      description: 'object position value',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Image> = args => (
  <Image
    {...args}
    src="https://www.reservix.net/_Resources/Persistent/0e8f5885125940fdb2bc2d54840f497782f56584/Reservix_Logo_dtp_web_rgb_font_black_180704.png"
    alt="marigold_logo"
  />
);
