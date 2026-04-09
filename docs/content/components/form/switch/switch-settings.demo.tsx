import { Stack, Switch } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Switch
      variant="settings"
      label="Email notifications"
      description="Receive emails when someone mentions you or replies to your comments."
    />
    <Switch
      variant="settings"
      label="Marketing emails"
      description="Get updates about new features and promotions."
    />
    <Switch
      variant="settings"
      label="Two-factor authentication"
      description="Add an extra layer of security to your account."
      defaultSelected
    />
  </Stack>
);
