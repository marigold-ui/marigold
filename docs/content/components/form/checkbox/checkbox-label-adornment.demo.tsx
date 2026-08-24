import { Badge, Checkbox } from '@marigold/components';

export default () => (
  <Checkbox
    label="Enable early bird pricing"
    labelAdornment={
      <Badge variant="master" size="inline">
        Master
      </Badge>
    }
    description="Sells a limited contingent at a reduced price before regular sales open."
  />
);
