import { Card, Inline, Stack, Text } from '@marigold/components';

export default () => (
  <div className="flex flex-col gap-4">
    <div className="bg-background rounded-xl p-4">
      <p>default layer 👍</p>
      <Card p={4}>
        <Stack>
          <Inline>
            <Text>Earliest event date:</Text>
            <Text weight="bold">
              {new Date(Date.now()).toLocaleDateString()}
            </Text>
          </Inline>
          <Inline>
            <Text>Latest event date:</Text>
            <Text weight="bold">
              {new Date(Date.now() + 3600 * 1000 * 24).toLocaleDateString()}
            </Text>
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
            <Text weight="bold">
              {new Date(Date.now()).toLocaleDateString()}
            </Text>
          </Inline>
          <Inline>
            <Text>Latest event date:</Text>
            <Text weight="bold">
              {new Date(Date.now() + 3600 * 1000 * 24).toLocaleDateString()}
            </Text>
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
