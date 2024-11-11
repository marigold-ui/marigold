import type { Meta, StoryObj } from '@storybook/react';
import { XLoader } from './XLoader';

const meta = {
  title: 'Components/XLoader',
  component: XLoader,
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: {
          summary: '150',
        },
      },
      description: 'Sets the size of the SVG.',
    },
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <XLoader {...args} />,
};

export const Fullsize: Story = {
  render: args => (
    <>
      <XLoader mode="fullsize" {...args}>
        Loading cause of fetching data...
      </XLoader>
    </>
  ),
};

export const Inline: Story = {
  render: args => (
    <div className="h-96 w-96" id="xxx">
      <XLoader mode="inline" {...args}>
        I'm loading data. Please wait...
      </XLoader>
    </div>
  ),
};
