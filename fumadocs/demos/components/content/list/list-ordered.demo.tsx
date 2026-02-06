import { List } from '@marigold/components';

export default () => (
  <div className="p-4">
    <List as="ol">
      <List.Item>Log in to your account.</List.Item>
      <List.Item>Navigate to the "My Tickets" section.</List.Item>
      <List.Item>Select the event you’ve purchased.</List.Item>
      <List.Item>Click on "Download Ticket".</List.Item>
      <List.Item>Show the ticket at the venue entrance.</List.Item>
    </List>
  </div>
);
