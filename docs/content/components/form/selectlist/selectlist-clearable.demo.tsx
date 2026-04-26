import { useState } from 'react';
import { SelectList, Text } from '@marigold/components';

export default () => {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <SelectList
      label="Filter by status"
      description="Click the active row again to clear the filter."
      selectionMode="single"
      disallowEmptySelection={false}
      selectedKeys={status ? [status] : []}
      onChange={key => setStatus(key as string | null)}
    >
      <SelectList.Option id="all" textValue="Open tickets">
        <Text slot="label">Open tickets</Text>
        <Text slot="description">Tickets that still need a response.</Text>
      </SelectList.Option>
      <SelectList.Option id="pending" textValue="Awaiting customer">
        <Text slot="label">Awaiting customer</Text>
        <Text slot="description">Waiting on a reply from the customer.</Text>
      </SelectList.Option>
      <SelectList.Option id="resolved" textValue="Resolved">
        <Text slot="label">Resolved</Text>
        <Text slot="description">Tickets that have been closed.</Text>
      </SelectList.Option>
    </SelectList>
  );
};
