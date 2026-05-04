import { Description, Select, TextValue } from '@marigold/components';

export default () => (
  <Select label="Plan" defaultValue="pro" width={64}>
    <Select.Option id="free">
      <TextValue>Free</TextValue>
      <Description size="xs">Up to 3 projects</Description>
    </Select.Option>
    <Select.Option id="pro">
      <TextValue>Pro</TextValue>
      <Description size="xs">
        Unlimited projects and priority support
      </Description>
    </Select.Option>
    <Select.Option id="enterprise">
      <TextValue>Enterprise</TextValue>
      <Description size="xs">SSO, audit logs, custom contracts</Description>
    </Select.Option>
  </Select>
);
