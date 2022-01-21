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
      description: 'there is only one variant',
      table: {
        defaultValue: {
          summary: 'fullWidth',
        },
      },
    },
    alt: {
      control: {
        type: 'text',
      },
      description: 'Description text for screenreaders',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Image> = args => (
  <Image
    src="https://www.reservix.net/_Resources/Persistent/0e8f5885125940fdb2bc2d54840f497782f56584/Reservix_Logo_dtp_web_rgb_font_black_180704.png"
    alt="marigold_logo"
    {...args}
  />
);
