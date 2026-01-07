'use client';

import { Stack, Tag } from '@marigold/components';

export default () => (
  <Stack space={6}>
    <Tag.Group
      label="Ticket type"
      selectionMode="single"
      defaultSelectedKeys={['student']}
    >
      <Tag id="standard">Standard</Tag>
      <Tag id="vip">VIP</Tag>
      <Tag id="student">Student</Tag>
      <Tag id="senior">Senior</Tag>
    </Tag.Group>
    <Tag.Group
      label="Interests"
      selectionMode="multiple"
      defaultSelectedKeys={['theater', 'comedy']}
    >
      <Tag id="music">Music</Tag>
      <Tag id="theater">Theater</Tag>
      <Tag id="comedy">Comedy</Tag>
      <Tag id="workshops">Workshops</Tag>
      <Tag id="food-drink">Food & Drink</Tag>
    </Tag.Group>
  </Stack>
);
