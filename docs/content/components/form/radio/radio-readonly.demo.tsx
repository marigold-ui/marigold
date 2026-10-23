import { Radio } from '@marigold/components';

export default () => (
  <Radio.Group
    label="Ticket type (view mode)"
    defaultValue="early-bird"
    readOnly
  >
    <Radio value="standard">Standard admission</Radio>
    <Radio value="early-bird">Early bird pricing</Radio>
    <Radio value="group">Group booking</Radio>
  </Radio.Group>
);
