import { useState } from 'react';
import {
  Button,
  Description,
  ListView,
  Switch,
  TextValue,
} from '@marigold/components';
import { X } from '@marigold/icons';

interface Notification {
  id: string;
  title: string;
  timestamp: string;
}

const initialNotifications: Notification[] = [
  { id: 'build', title: 'Build finished', timestamp: '2 minutes ago' },
  { id: 'deploy', title: 'Deploy succeeded', timestamp: '1 hour ago' },
  { id: 'review', title: 'Review requested', timestamp: 'Yesterday' },
];

export default () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const dismiss = (id: string) =>
    setNotifications(current => current.filter(item => item.id !== id));

  return (
    <ListView aria-label="Notifications">
      {notifications.map(notification => (
        <ListView.Item
          key={notification.id}
          id={notification.id}
          textValue={`${notification.title} — ${notification.timestamp}`}
        >
          <TextValue>{notification.title}</TextValue>
          <Description>{notification.timestamp}</Description>
          <Switch aria-label="Mute this thread" />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dismiss"
            onPress={() => dismiss(notification.id)}
          >
            <X />
          </Button>
        </ListView.Item>
      ))}
    </ListView>
  );
};
