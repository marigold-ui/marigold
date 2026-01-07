'use client';

import { venueTypes, venues } from '@/lib/data/venues';
import { Card, Headline, Inline, Inset, Text } from '@marigold/components';

export default () => {
  return (
    <Card>
      <Inset spaceX={4} spaceY={8}>
        <Headline level={3}>{venues[0].name}</Headline>
        <Inline>
          <Text fontStyle="italic">
            {venues[0].city} | {venueTypes[venues[0].type]}
          </Text>
        </Inline>
        <Text>{venues[0].description}</Text>
      </Inset>
    </Card>
  );
};
