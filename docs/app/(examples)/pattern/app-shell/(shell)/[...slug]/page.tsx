'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, Headline, Inset, Stack, Text } from '@marigold/components';
import { pages } from '../navigation';

const CatchAllPage = () => {
  const { slug } = useParams<{ slug: string[] }>();
  const key = slug.join('/');
  const page = pages[key];

  if (!page) {
    notFound();
  }

  return (
    <Inset space={4}>
      <Stack space={4}>
        <Headline level={2}>{page.label}</Headline>
        <Text>
          Manage your {page.label.toLowerCase()} settings and preferences.
        </Text>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} p={4}>
            <Text size="sm">
              {page.label} content section {i + 1}
            </Text>
          </Card>
        ))}
      </Stack>
    </Inset>
  );
};

export default CatchAllPage;
