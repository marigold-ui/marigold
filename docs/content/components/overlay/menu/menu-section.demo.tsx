import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Ticket Services">
      <Menu.Section title="Game Day">
        <Menu.Item id="match_info">📅 View Match Information</Menu.Item>
        <Menu.Item id="stadium_guide">🏟️ Stadium Guide</Menu.Item>
        <Menu.Item id="fan_zone">🎉 Fan Zone Activities</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Support">
        <Menu.Item id="customer_support">📞 Contact Support</Menu.Item>
        <Menu.Item id="faq">❓ View FAQs</Menu.Item>
        <Menu.Item id="feedback">💬 Provide Feedback</Menu.Item>
      </Menu.Section>
    </Menu>
  );
};
