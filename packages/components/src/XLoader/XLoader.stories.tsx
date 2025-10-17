import type { Meta, StoryObj } from '@storybook/react';
import { Inline, Stack } from '@marigold/components';
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
      options: ['default', 'fullscreen', 'section'],
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
    loaderType: {
      control: {
        type: 'radio',
      },
      description: 'Type of the Loader.',
      options: ['xloader', 'cycle'],
    },
  },
  args: {
    variant: undefined,
    size: 'default',
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <XLoader {...args} />,
};

export const Fullscreen: Story = {
  args: {
    mode: 'fullscreen',
  },
  render: args => <XLoader {...args} />,
};

export const Section: Story = {
  args: {
    mode: 'section',
  },
  render: args => (
    <div className="h-96 w-96">
      <XLoader {...args}>Please wait...</XLoader>
    </div>
  ),
};

export const CycleLoader: Story = {
  args: {
    loaderType: 'cycle',
  },
  render: args => (
    <Stack space={8}>
      <Inline space={8}>
        <XLoader {...args} />
        <XLoader {...args}>Loading...</XLoader>
      </Inline>
      <Inline space={8}>
        <div className="h-96 w-96">
          <XLoader {...args} mode="section" />
        </div>
        <div className="h-96 w-96">
          <XLoader {...args} mode="section">
            Please wait...
          </XLoader>
        </div>
      </Inline>
    </Stack>
  ),
};

export const FullscreenCycleLoader: Story = {
  args: {
    mode: 'fullscreen',
    loaderType: 'cycle',
  },
  render: args => <XLoader {...args}>Loading...</XLoader>,
};
