import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu
      label="Ticket Options"
      onAction={action => alert(`Action: ${action}`)}
    >
      <Menu.Item id="view">View Ticket Details</Menu.Item>
      <Menu.Item id="transfer">Transfer Ticket</Menu.Item>
      <Menu.Item id="refund">Request Refund</Menu.Item>
    </Menu>
  );
};
