import { Select } from '@marigold/components';

export default () => (
  <>
    <Select label="Permissions">
      <Select.Option id="read" description="Read only">
        Read
      </Select.Option>
      <Select.Option id="write" description="Read and write only">
        Write
      </Select.Option>
      <Select.Option id="admin" description="Full access">
        Admin
      </Select.Option>
    </Select>
  </>
);
