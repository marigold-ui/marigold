import { SelectList, Text } from '@marigold/components';

export default () => (
  <SelectList
    label="Shipping speed"
    description="Faster options include tracking."
    orientation="horizontal"
    selectionMode="single"
    defaultSelectedKeys={['standard']}
  >
    <SelectList.Option id="standard" textValue="Standard">
      <Text slot="label">Standard</Text>
      <Text slot="description">3 to 5 business days</Text>
    </SelectList.Option>
    <SelectList.Option id="express" textValue="Express">
      <Text slot="label">Express</Text>
      <Text slot="description">1 to 2 business days</Text>
    </SelectList.Option>
    <SelectList.Option id="overnight" textValue="Overnight">
      <Text slot="label">Overnight</Text>
      <Text slot="description">Next business day</Text>
    </SelectList.Option>
    <SelectList.Option id="pickup" textValue="Pickup">
      <Text slot="label">Pickup</Text>
      <Text slot="description">Ready in 2 hours</Text>
    </SelectList.Option>
  </SelectList>
);
