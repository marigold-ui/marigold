import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Slider } from './Slider';

export default {
  title: 'Components/Slider',
  argTypes: {
    children: {
      control: 'text',
      description: 'The label of the slider',
      defaultValue: 'Example Slider',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'Variant to style the Slider',
    },
    width: {
      control: {
        type: 'range',
        min: 1,
        max: 1000,
        step: 100,
      },
      defaultValue: 300,
      description: 'The width size of the slider',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the Slider is disabled',
      defaultValue: false,
    },
    maxValue: {
      control: {
        type: 'text',
      },
      defaultValue: '500',
      description: 'The maximum value of the slider',
    },
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
      defaultValue: 10,
      description: 'The step size of the slider',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Slider> = args => (
  <Slider {...args} />
);

export const Currency: ComponentStory<typeof Slider> = args => (
  <Slider formatOptions={{ style: 'currency', currency: 'EUR' }} {...args} />
);
