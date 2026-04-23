import { SelectList, Text } from '@marigold/components';

export default () => (
  <SelectList
    aria-label="Select plan"
    variant="bordered"
    selectionMode="single"
    defaultSelectedKeys={['pro']}
  >
    <SelectList.Item id="free" textValue="Free">
      <Text slot="label">Free</Text>
      <Text slot="description">For small teams trying things out.</Text>
    </SelectList.Item>
    <SelectList.Item id="pro" textValue="Pro">
      <Text slot="label">Pro</Text>
      <Text slot="description">
        For teams up to 50 members with priority support.
      </Text>
    </SelectList.Item>
    <SelectList.Item id="enterprise" textValue="Enterprise">
      <Text slot="label">Enterprise</Text>
      <Text slot="description">
        For organizations that need advanced controls and SLAs.
      </Text>
    </SelectList.Item>
  </SelectList>
);
