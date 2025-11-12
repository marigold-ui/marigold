import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle } from './ProgressCircle';

const meta = {
  title: 'Components/LoadingSpinner',
  component: ProgressCircle,
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 0,
        max: 96,
        step: 2,
      },
      table: {
        defaultValue: {
          summary: '16',
        },
      },
    },
  },
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <div className="flex size-96 items-center justify-center bg-gray-500 p-4">
      <ProgressCircle {...args} />
    </div>
  ),
};
