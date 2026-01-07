'use client';

import { SelectList, SelectListProps, Text } from '@marigold/components';

export default (props: SelectListProps) => (
  <SelectList
    {...props}
    aria-label="Select ticket type"
    selectionMode="single"
    defaultSelectedKeys={['standard']}
  >
    <SelectList.Item id="standard">
      <Text weight="bold">Standard Ticket</Text>
      <Text fontSize="sm" color="foreground-muted">
        Access to all main events • €49
      </Text>
    </SelectList.Item>
    <SelectList.Item id="vip">
      <Text weight="bold">VIP Ticket</Text>
      <Text size="sm" color="foreground-muted">
        Includes VIP lounge, free drinks • €129
      </Text>
    </SelectList.Item>
    <SelectList.Item id="student">
      <Text weight="bold">Student Ticket</Text>
      <Text size="sm" color="foreground-muted">
        Valid student ID required • €29
      </Text>
    </SelectList.Item>
    <SelectList.Item id="child">
      <Text weight="bold">Child Ticket</Text>
      <Text size="sm" color="foreground-muted">
        For children under 12 • €15
      </Text>
    </SelectList.Item>
  </SelectList>
);
