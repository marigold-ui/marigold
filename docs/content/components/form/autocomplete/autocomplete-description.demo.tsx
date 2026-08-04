import { Autocomplete, Description, TextValue } from '@marigold/components';

export default () => (
  <Autocomplete label="Assign to user" placeholder="Type a name">
    <Autocomplete.Option id="alice" textValue="Alice Johnson">
      <TextValue>Alice Johnson</TextValue>
      <Description>Product Manager</Description>
    </Autocomplete.Option>
    <Autocomplete.Option id="bob" textValue="Bob Smith">
      <TextValue>Bob Smith</TextValue>
      <Description>Engineering Lead</Description>
    </Autocomplete.Option>
    <Autocomplete.Option id="carol" textValue="Carol Davis">
      <TextValue>Carol Davis</TextValue>
      <Description>Design Director</Description>
    </Autocomplete.Option>
  </Autocomplete>
);
