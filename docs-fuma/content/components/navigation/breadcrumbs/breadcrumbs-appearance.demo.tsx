'use client';

import { Breadcrumbs, BreadcrumbsProps } from '@marigold/components';

export default (props: BreadcrumbsProps) => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
  </Breadcrumbs>
);
