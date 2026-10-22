import type { PopoverProps } from '@marigold/components';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  ListView,
  Popover,
  TextValue,
  Title,
  Tooltip,
} from '@marigold/components';
import { Pin } from '@marigold/icons';

const events = [
  { id: 'open-air', name: 'Summer Open Air', date: 'Sat, 12 July' },
  { id: 'jazz-night', name: 'Jazz Night', date: 'Fri, 18 July' },
  { id: 'season-preview', name: 'Season Preview', date: 'Sun, 27 July' },
];

export default (props: PopoverProps) => (
  <Popover.Trigger>
    <Button>Upcoming events</Button>
    <Popover {...props}>
      <Title>Upcoming events</Title>
      <Description>3 events on sale</Description>
      <Popover.Content>
        <ListView aria-label="Upcoming events" items={events}>
          {(event: (typeof events)[number]) => (
            <ListView.Item id={event.id} textValue={event.name}>
              <TextValue>{event.name}</TextValue>
              <Description>{event.date}</Description>
              <ButtonGroup aria-label={`Actions for ${event.name}`} size="icon">
                <Tooltip.Trigger>
                  <Button aria-label={`Pin ${event.name}`}>
                    <Pin />
                  </Button>
                  <Tooltip>Pin</Tooltip>
                </Tooltip.Trigger>
                <ActionMenu aria-label={`More actions for ${event.name}`}>
                  <ActionMenu.Item>Open sales report</ActionMenu.Item>
                  <ActionMenu.Item>Duplicate event</ActionMenu.Item>
                  <ActionMenu.Item>Archive</ActionMenu.Item>
                </ActionMenu>
              </ButtonGroup>
            </ListView.Item>
          )}
        </ListView>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
);
