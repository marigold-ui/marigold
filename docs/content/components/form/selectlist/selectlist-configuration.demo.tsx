import { Bell, Hash, Mail, MessageSquare } from 'lucide-react';
import { ActionMenu, Menu, SelectList, Text } from '@marigold/components';

const channels = [
  {
    id: 'email',
    name: 'Email',
    description: 'Sent to ops@example.com · Instant · Quiet hours 9pm–7am',
    Icon: Mail,
  },
  {
    id: 'push',
    name: 'In-app push',
    description: 'Browser and desktop notifications · Instant',
    Icon: Bell,
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Text to verified phone · Critical incidents only',
    Icon: MessageSquare,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Posts to #incidents · Daily digest at 9am',
    Icon: Hash,
  },
];

export default () => (
  <SelectList
    label="Notification channels"
    description="We'll deliver incident alerts to the channels you enable. Use the menu to set per-channel rules."
    selectionMode="multiple"
    defaultSelectedKeys={['email', 'push']}
  >
    {channels.map(channel => (
      <SelectList.Option
        key={channel.id}
        id={channel.id}
        textValue={channel.name}
      >
        <div className="col-start-2 row-start-1 flex min-w-0 items-center gap-2">
          <channel.Icon
            size={16}
            aria-hidden
            className="text-secondary shrink-0"
          />
          <Text slot="label">{channel.name}</Text>
        </div>
        <Text slot="description">{channel.description}</Text>
        <div className="col-start-3 row-span-2 row-start-1 flex items-center justify-end self-center">
          <ActionMenu variant="ghost" aria-label={`Customize ${channel.name}`}>
            <Menu.Item>Set frequency…</Menu.Item>
            <Menu.Item>Set quiet hours…</Menu.Item>
            <Menu.Item>Mute for 1 hour</Menu.Item>
            <Menu.Item>Mute until tomorrow</Menu.Item>
          </ActionMenu>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
