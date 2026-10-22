import type { PopoverProps } from '@marigold/components';
import {
  Button,
  Description,
  Popover,
  Text,
  Title,
} from '@marigold/components';

export default (props: PopoverProps) => (
  <Popover.Trigger>
    <Button>Show event details</Button>
    <Popover {...props}>
      <Title>Summer Open Air</Title>
      <Description>Sat, 12 July · Stadtgarten</Description>
      <Popover.Content>
        <Text>
          Doors open at 17:00. Seating is unreserved, so arrive early for a spot
          near the stage.
        </Text>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
);
