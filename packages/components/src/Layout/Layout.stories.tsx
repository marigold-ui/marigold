import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from './Layout';

const meta = {
  title: 'Components/Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Layout
      {...args}
      areas={['header header', 'sidebar main', 'footer footer']}
      columns={[1, 4]}
      rows={['80px', 'auto', '80px']}
      space={1}
    >
      <Layout.Slot name="header">
        <div className="size-full bg-slate-600" />
      </Layout.Slot>
      <Layout.Slot name="sidebar">
        <div className="size-full bg-slate-600" />
      </Layout.Slot>
      <Layout.Slot name="main">
        <div className="h-60 w-full bg-slate-600" />
      </Layout.Slot>
      <Layout.Slot name="footer">
        <div className="size-full bg-slate-600" />
      </Layout.Slot>
    </Layout>
  ),
};
