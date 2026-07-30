import { useState } from 'react';
import { TagField } from '@marigold/components';

// A long list of recognizable, equally likely values: users know the name
// they want, so searching beats scanning or a "show more" control.
const cities = [
  'Amsterdam',
  'Athens',
  'Barcelona',
  'Berlin',
  'Bern',
  'Bordeaux',
  'Bremen',
  'Brussels',
  'Budapest',
  'Cologne',
  'Copenhagen',
  'Dortmund',
  'Dresden',
  'Dublin',
  'Düsseldorf',
  'Edinburgh',
  'Frankfurt',
  'Geneva',
  'Gothenburg',
  'Graz',
  'Hamburg',
  'Hannover',
  'Helsinki',
  'Innsbruck',
  'Leipzig',
  'Lisbon',
  'London',
  'Lyon',
  'Madrid',
  'Mannheim',
  'Marseille',
  'Milan',
  'Munich',
  'Nuremberg',
  'Oslo',
  'Paris',
  'Porto',
  'Prague',
  'Rome',
  'Rotterdam',
  'Salzburg',
  'Stockholm',
  'Stuttgart',
  'Vienna',
  'Warsaw',
  'Zurich',
].map(name => ({ id: name.toLowerCase(), label: name }));

export default () => {
  const [selected, setSelected] = useState<string[]>(['berlin', 'vienna']);

  return (
    <TagField
      label="City"
      placeholder="Search cities..."
      width={80}
      items={cities}
      value={selected}
      onChange={keys => setSelected([...keys].map(String))}
    >
      {(city: (typeof cities)[number]) => (
        <TagField.Option id={city.id}>{city.label}</TagField.Option>
      )}
    </TagField>
  );
};
