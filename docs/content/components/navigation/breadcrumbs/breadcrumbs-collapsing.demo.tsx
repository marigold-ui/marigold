import React from 'react';
import { Breadcrumbs } from '@marigold/components';

export const BreadcrumbsCollapsingDemo = () => {
  return (
    <Breadcrumbs.List>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Breadcrumb 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Breadcrumb 2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Breadcrumb 3
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://www.marigold-ui.io/components/navigation/breadcrumbs?theme=rui">
        Breadcrumb 4
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  );
};
