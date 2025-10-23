import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Ticket Options" disabledKeys={['upgrade', 'resell']}>
      <Menu.Item id="view">👁️ View Ticket Details</Menu.Item>
      <Menu.Item id="download">📥 Download Ticket</Menu.Item>
      <Menu.Item id="upgrade">⬆️ Upgrade Seat</Menu.Item>
      <Menu.Item id="resell">💸 Resell Ticket</Menu.Item>
    </Menu>
  );
};
