import { Tabs, TabsProps } from '@marigold/components';

export default (props: TabsProps) => (
  <Tabs aria-label="tabs" {...props}>
    <Tabs.List aria-label="Input settings">
      <Tabs.Item id="mouse">Mouse Settings</Tabs.Item>
      <Tabs.Item id="keyboard">Keyboard Settings</Tabs.Item>
      <Tabs.Item id="gamepad">Gamepad Settings</Tabs.Item>
    </Tabs.List>
    <Tabs.Panel id="mouse">
      Adjust the sensitivity, acceleration, and button assignments for your
      mouse.
    </Tabs.Panel>
    <Tabs.Panel id="keyboard">
      Customize the key bindings and input behavior for your keyboard.
    </Tabs.Panel>
    <Tabs.Panel id="gamepad">
      Configure the controls, dead zones, and vibration settings for your
      gamepad.
    </Tabs.Panel>
  </Tabs>
);
