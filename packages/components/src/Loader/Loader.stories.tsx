import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inline, Stack } from '@marigold/components';
import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
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
      options: ['xloader', 'circle'],
    },
  },
  args: {
    variant: undefined,
    size: 'default',
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Loader {...args} />,
};

export const Fullscreen: Story = {
  args: {
    mode: 'fullscreen',
  },
  render: args => <Loader {...args} />,
};

export const Section: Story = {
  args: {
    mode: 'section',
  },
  render: args => (
    <div className="h-96 w-96">
      <Loader {...args}>Please wait...</Loader>
    </div>
  ),
};

export const CircleLoader: Story = {
  args: {
    loaderType: 'circle',
  },
  render: args => (
    <Stack space={8}>
      <Inline space={8}>
        <Loader {...args} />
        <Loader {...args}>Loading...</Loader>
      </Inline>
      <Inline space={8}>
        <div className="h-96 w-96">
          <Loader {...args} mode="section" />
        </div>
        <div className="h-96 w-96">
          <Loader {...args} mode="section">
            Please wait...
          </Loader>
        </div>
      </Inline>
    </Stack>
  ),
};

export const FullscreenCircleLoader: Story = {
  args: {
    mode: 'fullscreen',
    loaderType: 'circle',
  },
  render: args => <Loader {...args}>Loading...</Loader>,
};
