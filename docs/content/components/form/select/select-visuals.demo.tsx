import type { Person } from '@/lib/data/people';
import { people } from '@/lib/data/people';
import {
  Description,
  Inline,
  Select,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';

export default () => (
  <Select
    label="Assign to user"
    placeholder="Select a user"
    width="1/2"
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
      <Select.Option id={person.id} textValue={person.name}>
        <Inline space={3} alignY="center">
          <img
            src={person.avatar}
            alt={person.name}
            className="size-8 rounded-full object-cover"
          />
          <Stack space={0}>
            <TextValue>{person.name}</TextValue>
            <Description>{person.position}</Description>
          </Stack>
        </Inline>
      </Select.Option>
    )}
  </Select>
);
