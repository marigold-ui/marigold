import { Badge, Checkbox } from '@marigold/components';

export default () => (
  <Checkbox
    label="Enable early bird pricing"
    badge={<Badge variant="master">Master</Badge>}
    description="Sells a limited contingent at a reduced price before regular sales open."
  />
);
