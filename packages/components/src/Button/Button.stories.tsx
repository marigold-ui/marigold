import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { expect, fn, userEvent } from 'storybook/test';
import { Facebook } from '@marigold/icons';
import { Container } from '../Container/Container';
import { Stack } from '../Stack/Stack';
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
      options: ['default', 'small', 'large', 'icon'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'primary',
        'secondary',
        'destructive',
        'destructive-ghost',
        'ghost',
        'icon',
        'text',
      ],
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
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  args: {
    onPress: fn(),
  },
  render: args => <Button {...args}>Button</Button>,
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText('Button'));

    await expect(args.onPress).toHaveBeenCalled();
    await expect(canvas.getByText('Button')).toHaveTextContent('Button');
  },
};

export const ButtonVariants: Story = {
  tags: ['component-test'],
  parameters: {
    controls: { exclude: ['variant', 'children', 'loading'] },
  },
  args: {
    onPress: fn(),
  },
  render: args => (
    <Container>
      <Stack space={4} alignX="left">
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args}>Secondary</Button>
        <Button {...args} variant="destructive">
          Destructive
        </Button>
        <Button {...args} variant="destructive-ghost">
          Destructive Ghost
        </Button>
        <Button {...args} variant="ghost">
          Ghost
        </Button>
        <Button {...args} variant="link">
          Link
        </Button>
      </Stack>
    </Container>
  ),
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText('Primary'));
    await userEvent.click(canvas.getByText('Secondary'));
    await userEvent.click(canvas.getByText('Destructive'));
    await userEvent.click(canvas.getByText('Destructive Ghost'));
    await userEvent.click(canvas.getByText('Ghost'));

    await expect(args.onPress).toHaveBeenCalledTimes(5);
  },
};

export const WithIcon: Story = {
  render: ({ children, ...args }) => (
    <Button {...args}>
      <Facebook size={30} data-testid="facebook" />
      {children}
    </Button>
  ),
};

export const OnPress: Story = {
  args: {
    onPress: () => alert('Button clicked.'),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
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
