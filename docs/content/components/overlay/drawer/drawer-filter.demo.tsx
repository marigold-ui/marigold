import {
  Button,
  Checkbox,
  Drawer,
  Select,
  Slider,
  Stack,
} from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer>
        <Drawer.Title>Filter</Drawer.Title>
        <Drawer.Content>
          <Stack space={8}>
            <Slider
              label="Price"
              formatOptions={{ style: 'currency', currency: 'EUR' }}
              minValue={10}
              maxValue={140}
              defaultValue={[30, 60]}
              thumbLabels={['min', 'max']}
            />
            <Select label="Category">
              <Select.Option id="all">All</Select.Option>
              <Select.Option id="classic">Classic</Select.Option>
              <Select.Option id="rock">Rock</Select.Option>
              <Select.Option id="pop">Pop</Select.Option>
              <Select.Option id="jazz">Jazz</Select.Option>
            </Select>
            <Checkbox.Group label="Amenities">
              <Checkbox label="Fast Lane" value="fast-lane" />
              <Checkbox label="VIP Parking" value="parking" />
            </Checkbox.Group>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button
            slot="close"
            variant="primary"
            onPress={() => alert('Apply filters and close dialog')}
          >
            Apply
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
