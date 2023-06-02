import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all the tabs',
    },
    selectedKey: {
      control: { type: 'text' },
      description: 'Select the active tab',
    },
    size: {
      control: { type: 'select' },
      description: 'Select the size of the tab controller',
      options: ['small', 'medium', 'large'],
    },
    keyboardActivation: {
      defaultValue: 'automatic',
      control: { type: 'radio' },
      options: ['automatic', 'manual'],
      description:
        'Select whether tabs are activated automatically on focus or manually.',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const Basic: StoryObj<typeof Tabs> = {
  render: args => {
    return (
      <Tabs {...args} disabledKeys={['3']}>
        <Tabs.Item key={1} title="start">
          Lorem ipsum dolor sit amet - 1
        </Tabs.Item>
        <Tabs.Item key={2} title="hover">
          Lorem ipsum dolor sit amet. -2
        </Tabs.Item>
        <Tabs.Item key={3} title="disabled">
          Lorem ipsum dolor sit amet. - 3
        </Tabs.Item>
      </Tabs>
    );
  },
};
