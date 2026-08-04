'use client';

import { Description, Page, Title } from '@marigold/components';

export const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Page>
    <Page.Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Page.Header>
  </Page>
);
