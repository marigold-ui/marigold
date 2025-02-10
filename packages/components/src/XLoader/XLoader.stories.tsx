import type { Meta, StoryObj } from '@storybook/react';
import { XLoader } from './XLoader';

const meta = {
  title: 'Components/XLoader',
  component: XLoader,
  argTypes: {
    mode: {
      control: {
        type: 'radio',
      },
      description: 'Mode of the Loader.',
      options: ['default', 'fullsize', 'inline'],
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'Variant of the Loader.',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Size of the Loader.',
    },
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <XLoader {...args} />,
};

export const Fullsize: Story = {
  args: {
    mode: 'fullsize',
  },
  render: args => (
    <>
      <XLoader {...args} />
    </>
  ),
};

export const Inline: Story = {
  args: {
    mode: 'inline',
  },
  render: args => (
    <div className="h-96 w-96">
      <XLoader {...args}>Please wait...</XLoader>
    </div>
  ),
};
