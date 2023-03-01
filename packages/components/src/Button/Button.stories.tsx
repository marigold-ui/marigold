/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Facebook } from '@marigold/icons';
import { Button } from './Button';
import isChromatic from 'chromatic';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the button',
      defaultValue: false,
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Take availble width',
      defaultValue: false,
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Size of the button',
    },
    variant: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      description: 'Variant of the button',
    },
    children: {
      control: 'text',
      description: 'Children of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Click me!' },
      },
    },
  },
  args: {
    variant: 'primary',
    children: 'Click me!',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: args => <Button {...args} />,
};

export const WithIcon: Story = {
  render: ({ children, ...args }) => (
    <Button {...args}>
      <Facebook />
      {children}
    </Button>
  ),
};

export const OnPress: Story = {
  render: args => <Button {...args} onPress={(e: any) => console.log(e)} />,
};

export const AsProp: Story = {
  render: (args: any) => (
    <Button as="a" href="https://reservix.net" {...args} />
  ),
};

export const FullWidth: Story = {
  render: args => <Button {...args} fullWidth />,
};

export const PassThroughProps: Story = {
  render: args => {
    const [isHovered, setHovered] = useState(false);
    return (
      <>
        <Button
          {...args}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <br />
        state: {isHovered ? 'hovered' : 'not hovered'}
      </>
    );
  },
};

WithIcon.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
