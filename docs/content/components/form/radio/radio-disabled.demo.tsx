import { Radio } from '@marigold/components';

export default () => (
  <Radio.Group label="Choose Your Ticket Category">
    <Radio value="generalAdmission">🎟️ General Admission</Radio>
    <Radio value="vipAccess">🌟 VIP Access</Radio>
    <Radio value="familyPack" disabled>
      👨‍👩‍👧‍👦 Family Pack (Sold Out)
    </Radio>
    <Radio value="groupTickets">👥 Group Tickets</Radio>
    <Radio value="studentPass">🎓 Student Pass</Radio>
  </Radio.Group>
);
