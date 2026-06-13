import { Divider, Headline, Stack, Switch } from '@marigold/components';

export default () => (
  <Stack space={6}>
    <Stack space={4}>
      <Headline level={3} size="level-3">
        Notifications
      </Headline>
      <Switch
        variant="settings"
        label="Email notifications"
        description="Receive emails when someone mentions you or replies to your comments."
        defaultSelected
      />
      <Divider />
      <Switch
        variant="settings"
        label="Marketing emails"
        description="Get updates about new features and promotions."
      />
      <Divider />
      <Switch
        variant="settings"
        label="Weekly report"
        description="A summary of your team's activity, sent every Monday morning."
        defaultSelected
      />
    </Stack>
    <Stack space={4}>
      <Headline level={3} size="level-3">
        Security
      </Headline>
      <Switch
        variant="settings"
        label="Two-factor authentication"
        description="Require a verification code when signing in from a new device."
        defaultSelected
      />
      <Divider />
      <Switch
        variant="settings"
        label="Login alerts"
        description="Get notified when your account is accessed from an unrecognized device."
        defaultSelected
      />
    </Stack>
  </Stack>
);
