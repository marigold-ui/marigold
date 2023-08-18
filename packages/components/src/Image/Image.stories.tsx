import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Image } from './Image';

const meta = {
  title: 'Components/Image',
  component: Image,
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
      options: ['none', 'contain', 'cover', 'fill', 'scaleDown'],
      description: 'object fit value',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'none' },
      },
    },
    position: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'bottom',
        'center',
        'right',
        'rightBottom',
        'rightTop',
        'left',
        'leftBottom',
        'leftTop',
        'top',
      ],
      description: 'object position value',
    },
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Image> = {
  render: args => (
    <Image
      {...args}
      src="https://www.reservix.net/_Resources/Persistent/0e8f5885125940fdb2bc2d54840f497782f56584/Reservix_Logo_dtp_web_rgb_font_black_180704.png"
      alt="marigold_logo"
    />
  ),
};
