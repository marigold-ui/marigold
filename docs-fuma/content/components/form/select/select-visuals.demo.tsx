'use client';

import { people } from '@/lib/data/people';
import { Inline, Select, Text } from '@marigold/components';

export default () => (
  <Select label="Assign to User" placeholder="Select a user" width={80}>
    {people.map(person => (
      <Select.Option key={person.id} id={person.id}>
        <Inline space={2} alignY="center">
          <img
            src={person.avatar}
            alt={person.name}
            className="size-6 rounded-full object-cover"
          />
          <Text slot="label">{person.name}</Text>
        </Inline>
        <Text slot="description">{person.position}</Text>
      </Select.Option>
    ))}
  </Select>
);
