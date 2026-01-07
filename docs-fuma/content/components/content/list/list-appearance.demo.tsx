'use client';

import { List, ListProps } from '@marigold/components';

export default (props: ListProps) => (
  <div className="grid place-items-center">
    <List {...props}>
      <List.Item>The Screaming Pixels</List.Item>
      <List.Item>Echo Mirage</List.Item>
      <List.Item>Orchestra Obscura</List.Item>
      <List.Item>DrumForge</List.Item>
      <List.Item>Velvet Static</List.Item>
    </List>
  </div>
);
