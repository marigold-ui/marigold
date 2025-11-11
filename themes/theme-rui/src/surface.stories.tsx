import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Theme/Surfaces',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Input: Story = {
  render: () => (
    <div className="surface surface-ring surface-error surface-disabled">
      <input className="w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)] text-sm outline-none" />
    </div>
  ),
};
