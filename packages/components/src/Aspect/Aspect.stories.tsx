import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Image } from '../Image';
import { Aspect } from './Aspect';

const meta = {
  title: 'Components/Aspect',
  component: Aspect,
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
        type: { summary: 'select' },
        defaultValue: { summary: 'square' },
      },
    },
    maxWidth: {
      control: {
        type: 'text',
      },
      description: 'Maximum width',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '500px' },
      },
    },
  },
  args: {
    maxWidth: '500px',
    ratio: 'square',
  },
} satisfies Meta<typeof Aspect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Aspect {...args}>
      <Image
        src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
        alt="some image"
      />
    </Aspect>
  ),
};

export const CutImage: Story = {
  render: args => (
    <Aspect {...args}>
      <Image
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="event_image"
      />
    </Aspect>
  ),
};
