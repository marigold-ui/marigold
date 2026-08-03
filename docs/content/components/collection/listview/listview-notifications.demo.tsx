import { useState } from 'react';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  EmptyState,
  ListView,
  TextValue,
} from '@marigold/components';
import { X } from '@marigold/icons';

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  muted: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 'build',
    title: 'Build finished',
    timestamp: '2 minutes ago',
    muted: false,
  },
  {
    id: 'deploy',
    title: 'Deploy succeeded',
    timestamp: '1 hour ago',
    muted: false,
  },
  {
    id: 'review',
    title: 'Review requested',
    timestamp: 'Yesterday',
    muted: true,
  },
];

export default () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const dismiss = (id: string) =>
    setNotifications(current => current.filter(item => item.id !== id));

  const toggleMute = (id: string) =>
    setNotifications(current =>
      current.map(item =>
        item.id === id ? { ...item, muted: !item.muted } : item
      )
    );

  return (
    <ListView
      aria-label="Notifications"
      emptyState={
        <EmptyState
          title="You're all caught up"
          description="New notifications will show up here."
        />
      }
    >
      {notifications.map(notification => (
        <ListView.Item
          key={notification.id}
          id={notification.id}
          textValue={notification.title}
        >
          <TextValue>{notification.title}</TextValue>
          <Description>{notification.timestamp}</Description>
          <ButtonGroup>
            <Button
              size="icon"
              aria-label={`Dismiss ${notification.title}`}
              onPress={() => dismiss(notification.id)}
            >
              <X />
            </Button>
            <ActionMenu aria-label={`${notification.title} actions`}>
              <ActionMenu.Item onAction={() => toggleMute(notification.id)}>
                {notification.muted ? 'Unmute thread' : 'Mute thread'}
              </ActionMenu.Item>
              <ActionMenu.Item>Mark as read</ActionMenu.Item>
            </ActionMenu>
          </ButtonGroup>
        </ListView.Item>
      ))}
    </ListView>
  );
};
