import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Slider } from './Slider';

export default {
  title: 'Components/Slider',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Variant to style the Slider',
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label to display above the Slider',
      defaultValue: 'Label',
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
    // defaultValue: {
    //   control: {
    //     type: 'text',
    //   },
    //   defaultValue: '[100]',
    //   description: 'The default value of the slider',
    // },
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 1000,
        step: 1,
      },
      description: 'The step size of the slider',
    },
  },
} as Meta;

export const Percent: ComponentStory<typeof Slider> = args => (
  <Slider formatOptions={{ style: 'percent' }} {...args} />
);

export const Currency: ComponentStory<typeof Slider> = args => (
  <Slider
    formatOptions={{ style: 'currency', currency: 'EUR' }}
    defaultValue={[100]}
    {...args}
  />
);
