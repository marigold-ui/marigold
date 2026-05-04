import { Description, Stack, Title } from '@marigold/components';

export default () => (
  <div className="rounded border p-4">
    <Stack space={2}>
      <Title>Storage usage</Title>
      <Description>
        42% of your storage quota is currently in use. Upgrade your plan to
        unlock more space.
      </Description>
    </Stack>
  </div>
);
