import React from 'react';
import { Breadcrumbs } from '@marigold/components';

export default () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Events
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Music
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
};
