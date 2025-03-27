import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { TextField } from '../TextField';
import { Drawer, DrawerProps } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {},
  args: {},
} satisfies Meta<DrawerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger {...args}>
          <Button>Open Drawer</Button>
          <Drawer>Something</Drawer>
        </Drawer.Trigger>
        <TextField
          label="Name"
          description="Can you interact with me when the drawer is open?"
          width={80}
        />
      </Stack>
    );
  },
};
