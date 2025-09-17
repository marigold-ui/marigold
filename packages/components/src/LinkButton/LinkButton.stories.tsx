import { Meta, StoryObj } from '@storybook/react';
import { LinkButton, LinkButtonProps } from './LinkButton';

const meta: Meta<LinkButtonProps> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  args: {
    children: 'Link Button',
    href: 'https://marigold-ui.io',
  },
};

export default meta;

type Story = StoryObj<LinkButtonProps>;

export const Basic: Story = {};
