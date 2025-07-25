import React from 'react';
import { Breadcrumbs } from '@marigold/components';

export default () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
    </Breadcrumbs>
  );
};
