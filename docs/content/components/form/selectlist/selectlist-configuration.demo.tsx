import { useState } from 'react';
import { ActionMenu, Menu, SelectList, Text } from '@marigold/components';

const channels = [
  {
    id: 'email',
    name: 'Email',
    description: 'Sent to ops@example.com · Instant · Quiet hours 9pm–7am',
  },
  {
    id: 'push',
    name: 'In-app push',
    description: 'Browser and desktop notifications · Instant',
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Text to verified phone · Critical incidents only',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Posts to #incidents · Daily digest at 9am',
  },
];

export default () => {
  const [selected, setSelected] = useState<string[]>(['email', 'push']);

  return (
    <SelectList
      label="Notification channels"
      description="We'll deliver incident alerts to the channels you enable. Use the menu to set per-channel rules."
      selectionMode="multiple"
      selectedKeys={selected}
      onChange={keys => setSelected(keys as string[])}
    >
      {channels.map(channel => (
        <SelectList.Option
          key={channel.id}
          id={channel.id}
          textValue={channel.name}
        >
          <Text slot="label">{channel.name}</Text>
          <Text slot="description">{channel.description}</Text>
          <ActionMenu variant="ghost" aria-label={`Customize ${channel.name}`}>
            <Menu.Item>Set frequency…</Menu.Item>
            <Menu.Item>Set quiet hours…</Menu.Item>
            <Menu.Item>Mute for 1 hour</Menu.Item>
            <Menu.Item>Mute until tomorrow</Menu.Item>
          </ActionMenu>
        </SelectList.Option>
      ))}
    </SelectList>
  );
};
