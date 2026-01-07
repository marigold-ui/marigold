'use client';

import { Menu as MenuIcon } from 'lucide-react';
import type { MenuProps } from '@marigold/components';
import { Menu } from '@marigold/components';

export default (props: MenuProps) => {
  return (
    <Menu
      label={props.size === 'icon' ? <MenuIcon /> : 'Ticket options'}
      onAction={action => alert(`Action: ${action}`)}
      {...props}
    >
      <Menu.Item id="view">View Ticket Details</Menu.Item>
      <Menu.Item id="transfer">Transfer Ticket</Menu.Item>
      <Menu.Item id="refund">Request Refund</Menu.Item>
    </Menu>
  );
};
