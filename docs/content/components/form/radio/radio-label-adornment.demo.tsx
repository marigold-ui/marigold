import { Badge, Radio } from '@marigold/components';

export default () => (
  <Radio.Group label="Ticket type" defaultValue="standard">
    <Radio value="standard">Standard admission</Radio>
    <Radio
      value="early-bird"
      labelAdornment={
        <Badge variant="master" size="inline">
          Master
        </Badge>
      }
    >
      Early bird pricing
    </Radio>
  </Radio.Group>
);
