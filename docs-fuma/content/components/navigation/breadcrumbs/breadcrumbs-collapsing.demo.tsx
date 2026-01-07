'use client';

import { Breadcrumbs } from '@marigold/components';

export default () => (
  <Breadcrumbs maxVisibleItems={4}>
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Pop</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Freiburg im Breisgau</Breadcrumbs.Item>
  </Breadcrumbs>
);
