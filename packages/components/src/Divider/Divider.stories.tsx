import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['section', 'bold'],
      description: 'Thick or thin line',
      table: {
        defaultValue: {
          summary: 'section',
        },
      },
    },
  },
  args: {
    variant: 'section',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </>
  ),
};
