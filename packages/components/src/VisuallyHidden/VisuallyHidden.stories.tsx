import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Children of the Visually Hidden.',
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => (
    <>
      <Text>The Text below is visually hidden</Text>
      <VisuallyHidden {...args}>Invisible!</VisuallyHidden>
    </>
  ),
};
