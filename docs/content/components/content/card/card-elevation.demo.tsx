import { Card, Inline, Stack, Text } from '@marigold/components';

export default () => (
  <div className="flex flex-col gap-4">
    <div className="bg-background rounded-xl p-4">
      <p>default layer 👍</p>
      <Card p={4}>
        <Stack>
          <Inline>
            <Text>Earliest event date:</Text>
            <Text weight="bold">01.01.2026</Text>
          </Inline>
          <Inline>
            <Text>Latest event date:</Text>
            <Text weight="bold">02.01.2026</Text>
          </Inline>
          <Inline>
            <Text>Total events:</Text>
            <Text weight="bold">10</Text>
          </Inline>
        </Stack>
      </Card>
    </div>
    <div className="ui-surface shadow-elevation-raised rounded-xl p-4">
      <p>Same layer as card 👎</p>
      <Card p={4}>
        <Stack>
          <Inline>
            <Text>Earliest event date:</Text>
            <Text weight="bold">01.01.2026</Text>
          </Inline>
          <Inline>
            <Text>Latest event date:</Text>
            <Text weight="bold">02.01.2026</Text>
          </Inline>
          <Inline>
            <Text>Total events:</Text>
            <Text weight="bold">10</Text>
          </Inline>
        </Stack>
      </Card>
    </div>
  </div>
);
