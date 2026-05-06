import {
  Button,
  DatePicker,
  Drawer,
  Select,
  Stack,
  Switch,
  Text,
} from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Edit 12 events</Button>
      <Drawer size="medium">
        <Drawer.Title>Edit 12 events</Drawer.Title>
        <Drawer.Content>
          <Stack space={6}>
            <Text>
              Changes will apply to all selected events. Empty fields stay
              unchanged.
            </Text>

            <DatePicker label="Event date" />

            <Select label="Location" placeholder="Choose a venue">
              <Select.Option id="freiburg">Freiburg</Select.Option>
              <Select.Option id="berlin">Berlin</Select.Option>
              <Select.Option id="hamburg">Hamburg</Select.Option>
              <Select.Option id="online">Online</Select.Option>
            </Select>

            <Switch label="Notify attendees of changes" />
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Apply to 12 events
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
