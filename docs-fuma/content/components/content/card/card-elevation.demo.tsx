'use client';

import { Card, Inline, Stack, Text } from '@marigold/components';

export default () => (
  <>
    <div className="bg-bg-surface-sunken shadow-surface-sunken rounded-xl p-4">
      <p>sunken layer 👍</p>
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
    <div className="bg-bg-surface shadow-surface rounded-xl p-4">
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
              {' '}
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
    <div className="bg-bg-surface-raised shadow-surface-raised rounded-xl p-4">
      <p>Same layer like card 👎</p>
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
  </>
);
