import { Autocomplete } from '@marigold/components';

export const BasicAutocomplete = () => (
  <Autocomplete label="Favorite franchise:">
    <Autocomplete.Item key="Harry Potter">Harry Potter</Autocomplete.Item>
    <Autocomplete.Item key="Lord of the Rings">
      Lord of the Rings
    </Autocomplete.Item>
    <Autocomplete.Item key="Star Wars">Star Wars</Autocomplete.Item>
    <Autocomplete.Item key="Star Trek">Star Trek</Autocomplete.Item>
    <Autocomplete.Item key="Firefly">Firefly</Autocomplete.Item>
  </Autocomplete>
);
