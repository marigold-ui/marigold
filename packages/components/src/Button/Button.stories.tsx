/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Container, Stack } from '@marigold/components';
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
        'destructive',
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
      description: 'Label of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    variant: undefined,
    children: 'Submit',
    size: 'default',
    loading: false,
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    controls: { exclude: ['variant', 'children', 'loading'] },
  },
  render: args => (
    <Container>
      <Stack space={4}>
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args}>Secondary</Button>
        <Button {...args} variant="destructive">
          Destructive
        </Button>
        <Button {...args} variant="ghost">
          Ghost
        </Button>
      </Stack>
    </Container>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Primary'));
    await userEvent.click(canvas.getByText('Secondary'));
    await userEvent.click(canvas.getByText('Destructive'));
    await userEvent.click(canvas.getByText('Ghost'));

    await expect(args.onPress).toHaveBeenCalledTimes(4);
  },
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
  parameters: {
    controls: { exclude: ['loading'] },
  },
  render: ({ children, ...args }) => {
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const handleSubmit = async () => {
      //avoid multiple submits while loading
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 8000));
      } finally {
        setLoading(false);
      }
    };

    return (
      <Button {...args} onPress={() => handleSubmit()} loading={loading}>
        {children}
      </Button>
    );
  },
};

export const LoadingWithIcon: Story = {
  parameters: {
    controls: { exclude: ['loading'] },
  },
  render: ({ children, ...args }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
      //avoid multiple submits while loading
      if (loading) {
        return;
      }

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
        {children}
      </Button>
    );
  },
};
