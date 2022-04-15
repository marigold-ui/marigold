import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { SVG } from './SVG';

export default {
  title: 'Components/SVG',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'icon',
        },
      },
    },
    size: {
      control: {
        type: 'range',
        min: 0,
        max: 96,
        step: 2,
      },
      table: {
        defaultValue: {
          summary: 24,
        },
      },
    },
    fill: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'currentColor',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof SVG> = args => (
  <SVG {...args}>
    <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
  </SVG>
);
