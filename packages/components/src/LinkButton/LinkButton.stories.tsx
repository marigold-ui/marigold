import { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton, LinkButtonProps } from './LinkButton';

const meta: Meta<LinkButtonProps> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  argTypes: {
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
      options: ['primary', 'secondary', 'destructive', 'ghost', 'icon', 'text'],
      description: 'Variant of the button',
    },
  },
  args: {
    children: 'Link Button',
    href: 'https://marigold-ui.io',
  },
};

export default meta;

type Story = StoryObj<LinkButtonProps>;

export const Basic: Story = {};
