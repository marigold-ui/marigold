import { useState } from 'react';
import {
  ActionMenu,
  Badge,
  Button,
  ButtonGroup,
  Description,
  Inline,
  Link,
  ListView,
  Popover,
  Split,
  Text,
  TextValue,
  Title,
  Tooltip,
  TopNavigation,
} from '@marigold/components';
import { Archive, Bell, BellOff, Mail, MailOpen } from '@marigold/icons';

const initialNotifications = [
  {
    id: 'sold-out',
    title: 'Summer Open Air sold out',
    time: '2 minutes ago',
    unread: true,
  },
  {
    id: 'payout',
    title: 'Payout sent',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 'review',
    title: 'New review for Jazz Night',
    time: 'Yesterday',
    unread: false,
  },
];

export default () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unread = notifications.filter(item => item.unread).length;

  const setRead = (id: string, read: boolean) =>
    setNotifications(current =>
      current.map(item => (item.id === id ? { ...item, unread: !read } : item))
    );

  const markAllRead = () =>
    setNotifications(current =>
      current.map(item => ({ ...item, unread: false }))
    );

  const archive = (id: string) =>
    setNotifications(current => current.filter(item => item.id !== id));

  return (
    <TopNavigation sticky={false}>
      <TopNavigation.Start>
        <Text weight="bold">Ticketing</Text>
      </TopNavigation.Start>
      <TopNavigation.Middle>
        <Inline space={4}>
          <Button variant="text">Events</Button>
          <Button variant="text">Orders</Button>
          <Button variant="text">Reports</Button>
        </Inline>
      </TopNavigation.Middle>
      <TopNavigation.End>
        <Popover.Trigger>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications, ${unread} unread`}
          >
            <Bell />
          </Button>
          <Popover placement="bottom end" size="large">
            <Title>Notifications</Title>
            <Description>{unread} unread</Description>
            <Popover.Content>
              <ListView
                aria-label="Notifications"
                items={notifications}
                // Opening a notification takes people to what it is about
                // and marks it as read.
                onAction={id => setRead(String(id), true)}
                emptyState={<Text>You're all caught up.</Text>}
              >
                {(item: (typeof notifications)[number]) => (
                  <ListView.Item id={item.id} textValue={item.title}>
                    <TextValue>{item.title}</TextValue>
                    <Description>
                      {item.unread ? (
                        <>
                          <Badge variant="info" size="inline">
                            New
                          </Badge>{' '}
                        </>
                      ) : null}
                      {item.time}
                    </Description>
                    <ButtonGroup
                      aria-label={`Actions for ${item.title}`}
                      size="icon"
                    >
                      <Tooltip.Trigger>
                        <Button
                          aria-label={`Mark ${item.title} as ${item.unread ? 'read' : 'unread'}`}
                          onPress={() => setRead(item.id, item.unread)}
                        >
                          {item.unread ? <MailOpen /> : <Mail />}
                        </Button>
                        <Tooltip>
                          {item.unread ? 'Mark as read' : 'Mark as unread'}
                        </Tooltip>
                      </Tooltip.Trigger>
                      <ActionMenu aria-label={`More actions for ${item.title}`}>
                        <ActionMenu.Item onAction={() => archive(item.id)}>
                          <Archive /> Archive
                        </ActionMenu.Item>
                        <ActionMenu.Item>
                          <BellOff /> Mute this event
                        </ActionMenu.Item>
                      </ActionMenu>
                    </ButtonGroup>
                  </ListView.Item>
                )}
              </ListView>
              <Inline space="related" alignY="center">
                <Button
                  variant="link"
                  disabled={unread === 0}
                  onPress={markAllRead}
                >
                  Mark all as read
                </Button>
                <Split />
                <Link href="#" size="small">
                  Notification settings
                </Link>
              </Inline>
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      </TopNavigation.End>
    </TopNavigation>
  );
};
