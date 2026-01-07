'use client';

import { Breadcrumbs } from '@marigold/components';

export default () => (
  <nav aria-label="Breadcrumbs">
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
    </Breadcrumbs>
  </nav>
);
