import { people } from '@/lib/data/people';
import { Description, Inline, Select, TextValue } from '@marigold/components';

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
          <TextValue>{person.name}</TextValue>
        </Inline>
        <Description>{person.position}</Description>
      </Select.Option>
    ))}
  </Select>
);
