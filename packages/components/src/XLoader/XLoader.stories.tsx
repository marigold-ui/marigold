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
          summary: 150,
        },
      },
      description: 'Sets the size of the SVG.',
    },
    className: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
      },
      description:
        'To change the color or something additional, should be used rarely.',
    },
  },
  args: {
    size: 150,
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <XLoader {...args} />,
};
