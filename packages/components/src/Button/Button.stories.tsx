/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
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
    loading: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the button is in a loading state.',
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
        type: 'radio',
      },
      description: 'Size of the button',
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
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
    size: 'default',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
  render: args => <Button {...args} onPress={() => alert('Button clicked.')} />,
};

export const FullWidth: Story = {
  render: args => <Button {...args} fullWidth />,
};

export const Loading: Story = {
  render: args => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 8000));
      } finally {
        setLoading(false);
      }
    };
    return (
      <Button {...args} onPress={() => handleSubmit()} loading={loading}>
        Submit
      </Button>
    );
  },
};

export const LoadingWithIcon: Story = {
  render: args => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 4000));
      } finally {
        setLoading(false);
      }
    };
    return (
      <Button {...args} onPress={() => handleSubmit()} loading={loading}>
        <Facebook />
        Send message
      </Button>
    );
  },
};
