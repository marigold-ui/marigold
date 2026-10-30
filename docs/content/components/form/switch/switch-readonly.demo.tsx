import { Stack, Switch } from '@marigold/components';

export default () => (
  <Stack space={2}>
    <Switch label="Email notifications" defaultSelected readOnly />
    <Switch label="Push notifications" readOnly />
  </Stack>
);
