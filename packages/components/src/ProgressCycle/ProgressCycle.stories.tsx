import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCycle } from './ProgressCycle';

const meta = {
  title: 'Components/ProgressCycle',
  component: ProgressCycle,
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
} satisfies Meta<typeof ProgressCycle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <ProgressCycle {...args} />,
};
