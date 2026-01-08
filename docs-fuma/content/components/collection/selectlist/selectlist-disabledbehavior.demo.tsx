'use client';

import { useState } from 'react';
import { ActionMenu, Menu, SelectList, Text } from '@marigold/components';

let tickets = [
  {
    id: 'standard',
    name: 'Standard Ticket',
    price: 49,
  },
  { id: 'vip', name: 'VIP Ticket', price: 129 },
  { id: 'student', name: 'Student Ticket', price: 29 },
  { id: 'child', name: 'Child Ticket', price: 15 },
];

export default () => {
  const [selectedTickets, setSelectedTickets] = useState(['standard']);
  return (
    <SelectList
      aria-label="Select ticket types"
      selectionMode="multiple"
      items={tickets}
      selectedKeys={selectedTickets}
      onChange={setSelectedTickets}
      disabledBehavior="selection"
    >
      {(item: any) => (
        <SelectList.Item id={item.id} disabled={item.id === 'child'}>
          <div>
            <Text
              weight="bold"
              color={`${item.id === 'child' ? 'disabled' : 'foreground'}`}
            >
              {item.name}
            </Text>
            <Text
              fontSize="sm"
              color={`${item.id === 'child' ? 'disabled' : 'foreground-muted'}`}
            >
              €{item.price}
            </Text>
          </div>
          <SelectList.Action>
            <ActionMenu variant="ghost">
              <Menu.Item
                onAction={() => alert(`Show details for ${item.name}`)}
              >
                Details
              </Menu.Item>
              <Menu.Item onAction={() => alert(`Refund ${item.name}`)}>
                Refund
              </Menu.Item>
              <Menu.Item onAction={() => alert(`Transfer ${item.name}`)}>
                Transfer
              </Menu.Item>
            </ActionMenu>
          </SelectList.Action>
        </SelectList.Item>
      )}
    </SelectList>
  );
};
