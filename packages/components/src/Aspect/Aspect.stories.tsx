import type { Meta, StoryObj } from '@storybook/react-vite';
import { Aspect } from './Aspect';

const meta = {
  title: 'Components/Aspect',
  component: Aspect,
  argTypes: {
    ratio: {
      control: {
        type: 'select',
      },
      options: [
        'square',
        'landscape',
        'portrait',
        'widescreen',
        'ultrawide',
        'golden',
      ],
      description: 'Choose an aspect ratio for the image',
    },
    maxWidth: {
      control: {
        type: 'text',
      },
      description: 'Maximum width',
    },
  },
  args: {
    maxWidth: '300px',
    ratio: 'square',
  },
} satisfies Meta<typeof Aspect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Aspect {...args}>
      <img
        src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
        alt="some image"
        className="object-cover"
      />
    </Aspect>
  ),
};
