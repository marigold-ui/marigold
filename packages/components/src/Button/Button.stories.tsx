/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Facebook } from '@marigold/icons';

import { Button } from './Button';

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

export const AsLink: Story = {
  render: () => (
    <Button
      as="a"
      variant="primary"
      href="https://cdn.reservix.com/webshop/config/398/portal-logo-dark.62488549.png"
      download
    >
      Download Logo
    </Button>
  ),
};
