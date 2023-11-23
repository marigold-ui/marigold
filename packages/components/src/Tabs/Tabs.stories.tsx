import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsProps } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  argTypes: {
    disalbed: {
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
} satisfies Meta<TabsProps>;

export default meta;

export const Basic: StoryObj<typeof Tabs> = {
  render: args => {
    return (
      <Tabs aria-label="tabs" disabledKeys={['gamepad']} {...args}>
        <Tabs.List aria-label="Input settings">
          <Tabs.Item id="mouse">Mouse Settings</Tabs.Item>
          <Tabs.Item id="keyboard">Keyboard Settings</Tabs.Item>
          <Tabs.Item id="gamepad">Gamepad Settings</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="mouse">
          Adjust the sensitivity, acceleration, and button assignments for your
          mouse.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="keyboard">
          Customize the key bindings and input behavior for your keyboard.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="gamepad">
          Configure the controls, dead zones, and vibration settings for your
          gamepad.
        </Tabs.TabPanel>
      </Tabs>
    );
  },
};
