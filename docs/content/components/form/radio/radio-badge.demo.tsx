import { Badge, Radio } from '@marigold/components';

export default () => (
  <Radio.Group label="Ticket type" defaultValue="standard">
    <Radio value="standard">Standard admission</Radio>
    <Radio value="early-bird" badge={<Badge variant="master">Master</Badge>}>
      Early bird pricing
    </Radio>
  </Radio.Group>
);
