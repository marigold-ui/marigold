import {
  Headline,
  Inline,
  Link,
  SectionMessage,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Stack space={6}>
      <Stack space={2}>
        <Headline level={3}>Workspace plan</Headline>
        <Text variant="muted">
          You're on the Pro plan. Renews on June 1, 2026. Manage your billing
          details in account settings.
        </Text>
      </Stack>
      <SectionMessage variant="info">
        <SectionMessage.Title>Verification reminder</SectionMessage.Title>
        <SectionMessage.Content>
          <Stack space={2}>
            Confirm your billing email so we can send next month's invoice.
            <Inline space={4}>
              <Link href="#!">Update email</Link>
              <Link href="#!">Skip for now</Link>
            </Inline>
          </Stack>
        </SectionMessage.Content>
      </SectionMessage>
    </Stack>
  </div>
);
