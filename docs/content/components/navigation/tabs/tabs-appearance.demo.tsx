import { Tabs, TabsProps } from '@marigold/components';

export default (props: TabsProps) => (
  <Tabs aria-label="tabs" {...props}>
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
