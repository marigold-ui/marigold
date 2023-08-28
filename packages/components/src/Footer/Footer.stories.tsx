import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the footer',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the footer',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Footer {...args}>This is a Footer.</Footer>,
};
