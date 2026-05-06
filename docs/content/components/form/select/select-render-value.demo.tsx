import { people } from '@/lib/data/people';
import { Inline, Select, Text } from '@marigold/components';

export default () => (
  <Select<(typeof people)[number]>
    label="Assign to"
    placeholder="Select a user"
    width={80}
    items={people}
    renderValue={([person]) => (
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
    {person => (
      <Select.Option id={person.id} textValue={person.name}>
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
    )}
  </Select>
);
