import { useState } from 'react';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  ListView,
  Popover,
  Text,
  TextValue,
  Title,
  Tooltip,
} from '@marigold/components';
import { Archive, Bell } from '@marigold/icons';

const initialNotifications = [
  { id: 'sold-out', title: 'Summer Open Air sold out', time: '2 minutes ago' },
  { id: 'payout', title: 'Payout sent', time: '1 hour ago' },
  { id: 'review', title: 'New review for Jazz Night', time: 'Yesterday' },
];

export default () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const archive = (id: string) =>
    setNotifications(current => current.filter(item => item.id !== id));

  return (
    <Popover.Trigger>
      <Button size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <Popover placement="bottom end" size="large">
        <Title>Notifications</Title>
        <Description>{notifications.length} unread</Description>
        <Popover.Content>
          <ListView
            aria-label="Notifications"
            items={notifications}
            emptyState={<Text>You're all caught up.</Text>}
          >
            {(item: (typeof notifications)[number]) => (
              <ListView.Item id={item.id} textValue={item.title}>
                <TextValue>{item.title}</TextValue>
                <Description>{item.time}</Description>
                <ButtonGroup
                  aria-label={`Actions for ${item.title}`}
                  size="icon"
                >
                  <Tooltip.Trigger>
                    <Button
                      aria-label={`Archive ${item.title}`}
                      onPress={() => archive(item.id)}
                    >
                      <Archive />
                    </Button>
                    <Tooltip>Archive</Tooltip>
                  </Tooltip.Trigger>
                  <ActionMenu aria-label={`More actions for ${item.title}`}>
                    <ActionMenu.Item onAction={() => archive(item.id)}>
                      Mark as read
                    </ActionMenu.Item>
                    <ActionMenu.Item>Mute thread</ActionMenu.Item>
                    <ActionMenu.Item>
                      Turn off these notifications
                    </ActionMenu.Item>
                  </ActionMenu>
                </ButtonGroup>
              </ListView.Item>
            )}
          </ListView>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  );
};
