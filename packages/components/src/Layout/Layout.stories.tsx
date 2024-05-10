import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from './layout';

const meta = {
  title: 'Layout/Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Layout>asd</Layout>,
};
