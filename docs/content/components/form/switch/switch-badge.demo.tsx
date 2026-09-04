import { Badge, Switch } from '@marigold/components';

export default () => (
  <Switch
    variant="settings"
    label="Require registration approval"
    badge={<Badge variant="master">Master</Badge>}
    description="Each registration must be manually approved before the attendee is confirmed."
  />
);
