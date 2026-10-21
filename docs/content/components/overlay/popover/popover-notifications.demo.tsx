import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  ListView,
  Popover,
  TextValue,
  Title,
} from '@marigold/components';
import { Archive, Bell } from '@marigold/icons';

const notifications = [
  { id: 'sold-out', title: 'Summer Open Air sold out', time: '2 minutes ago' },
  { id: 'payout', title: 'Payout sent', time: '1 hour ago' },
  { id: 'review', title: 'New review for Jazz Night', time: 'Yesterday' },
];

export default () => (
  <Popover.Trigger>
    <Button size="icon" aria-label="Notifications">
      <Bell />
    </Button>
    <Popover placement="bottom end" width="large">
      <Title>Notifications</Title>
      <Description>{notifications.length} unread</Description>
      <Popover.Content bleed>
        <ListView aria-label="Notifications" items={notifications}>
          {(item: (typeof notifications)[number]) => (
            <ListView.Item id={item.id} textValue={item.title}>
              <TextValue>{item.title}</TextValue>
              <Description>{item.time}</Description>
              <ButtonGroup>
                <Button size="icon" aria-label="Archive">
                  <Archive />
                </Button>
                <ActionMenu aria-label={`${item.title} actions`}>
                  <ActionMenu.Item>Mute thread</ActionMenu.Item>
                  <ActionMenu.Item>Mark as read</ActionMenu.Item>
                </ActionMenu>
              </ButtonGroup>
            </ListView.Item>
          )}
        </ListView>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
);
