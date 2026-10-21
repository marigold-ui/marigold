import {
  Button,
  Description,
  Popover,
  Text,
  Title,
} from '@marigold/components';

export default () => (
  <Popover>
    <Button>Event details</Button>
    <Popover.Content>
      <Title>Summer Open Air</Title>
      <Description>Sat, 12 July · Stadtgarten</Description>
      <Text>
        Doors open at 17:00. Seating is unreserved, so arrive early for a spot
        near the stage.
      </Text>
    </Popover.Content>
  </Popover>
);
