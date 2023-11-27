/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Take availble width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Size of the button',
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'primary',
        'secondary',
        'ghost',
        'link',
        'text',
        'icon',
        'menu',
      ],
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

export const FullWidth: Story = {
  render: args => <Button {...args} fullWidth />,
};
