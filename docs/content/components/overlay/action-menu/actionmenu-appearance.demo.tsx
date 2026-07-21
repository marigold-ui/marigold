import type { ActionMenuProps } from '@marigold/components';
import { ActionMenu } from '@marigold/components';

export default (props: ActionMenuProps) => (
  <ActionMenu
    {...props}
    onAction={action => alert(`Action: ${String(action)}`)}
    aria-label="Ticket actions"
  >
    <ActionMenu.Item id="view">View Ticket Details</ActionMenu.Item>
    <ActionMenu.Item id="transfer">Transfer Ticket</ActionMenu.Item>
    <ActionMenu.Item id="refund">Request Refund</ActionMenu.Item>
  </ActionMenu>
);
