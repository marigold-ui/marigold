import type { Person } from '@/lib/data/people';
import { people } from '@/lib/data/people';
import { Inline, Select, Stack, Text, TextValue } from '@marigold/components';

export default () => (
  <Select
    label="Assign to"
    placeholder="Select a person"
    defaultValue="crash"
    width={80}
    items={people}
    renderValue={([person]: Person[]) => (
      <Inline space={2} alignY="center">
        <img
          src={person.avatar}
          alt=""
          className="size-5 rounded-full object-cover"
        />
        <Text>{person.name}</Text>
      </Inline>
    )}
  >
    {(person: Person) => (
      <Select.Option id={person.id}>
        <Inline space={3} alignY="center">
          <img
            src={person.avatar}
            alt=""
            className="size-10 rounded-full object-cover"
          />
          <Stack space={0}>
            <TextValue>{person.name}</TextValue>
            <Text size="xs">{person.position}</Text>
            <Text size="xs" variant="muted">
              {person.email}
            </Text>
          </Stack>
        </Inline>
      </Select.Option>
    )}
  </Select>
);
