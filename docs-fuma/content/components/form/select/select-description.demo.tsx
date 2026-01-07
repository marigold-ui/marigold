'use client';

import { Select, Text } from '@marigold/components';

export default () => (
  <Select label="Permissions" width="fit">
    <Select.Option id="read" textValue="Read">
      <Text slot="label">Read</Text>
      <Text slot="description" fontSize="xs">
        Read only
      </Text>
    </Select.Option>
    <Select.Option id="write" textValue="Write">
      <Text slot="label">Write</Text>
      <Text slot="description" fontSize="xs">
        Read and write only
      </Text>
    </Select.Option>
    <Select.Option id="admin" textValue="Admin">
      <Text slot="label">Admin</Text>
      <Text slot="description" fontSize="xs">
        Full access
      </Text>
    </Select.Option>
  </Select>
);
