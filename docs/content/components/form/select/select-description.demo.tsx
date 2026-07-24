import { Description, Select, TextValue } from '@marigold/components';

export default () => (
  <Select label="Permissions">
    <Select.Option id="read" textValue="Read">
      <TextValue>Read</TextValue>
      <Description>Read only</Description>
    </Select.Option>
    <Select.Option id="write" textValue="Write">
      <TextValue>Write</TextValue>
      <Description>Read and write only</Description>
    </Select.Option>
    <Select.Option id="admin" textValue="Admin">
      <TextValue>Admin</TextValue>
      <Description>Full access</Description>
    </Select.Option>
  </Select>
);
