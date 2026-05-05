import { people } from '@/lib/data/people';
import {
  Description,
  Inline,
  Select,
  Stack,
  TextValue,
} from '@marigold/components';

export default () => (
  <Select
    label="Assign to"
    placeholder="Select a person"
    defaultValue="crash"
    width={80}
  >
    {people.map(person => (
      <Select.Option key={person.id} id={person.id} textValue={person.name}>
        <Inline space={3} alignY="center">
          <img
            src={person.avatar}
            alt=""
            className="size-8 rounded-full object-cover"
          />
          <Stack space={0.5}>
            <TextValue>{person.name}</TextValue>
            <Description>
              {person.position} · {person.email}
            </Description>
          </Stack>
        </Inline>
      </Select.Option>
    ))}
  </Select>
);
