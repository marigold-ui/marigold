import { Select, Text } from '@marigold/components';

export default () => (
  <>
    <Select label="Permissions">
      <Select.Option id="read">
        <Text slot="label">Read</Text>
        <Text slot="description" fontSize="xs">
          Read only
        </Text>
      </Select.Option>
      <Select.Option id="write">
        <Text slot="label">Write</Text>
        <Text slot="description" fontSize="xs">
          Read and write only
        </Text>
      </Select.Option>
      <Select.Option id="admin">
        <Text slot="label">Admin</Text>
        <Text slot="description" fontSize="xs">
          Full access
        </Text>
      </Select.Option>
    </Select>
  </>
);
