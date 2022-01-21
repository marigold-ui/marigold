import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Image } from './Image';
import image1 from '../../../images/src/type_logo.png';

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
  <Image src={image1} alt="marigold_logo" {...args} />
);
