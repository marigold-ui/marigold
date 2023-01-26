import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Label } from './Label';
import isChromatic from 'chromatic';

export default {
  title: 'Components/Label',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Text of the label',
      defaultValue: 'Label',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Hint that the related control required',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Label> = ({ children, ...args }) => (
  <Label {...args}>{children}</Label>
);

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
