import { useState } from 'react';
import { Headline, Select, Stack } from '@marigold/components';

const locations = [
  {
    id: '1',
    name: 'The Giggle Grounds',
    street: '123 Main Street',
    city: 'Laughville',
    capacity: 500,
    type: 'Outdoor Amphitheater',
    description:
      'A charming open-air venue perfect for comedy shows under the stars, bringing laughter to every corner of Laughville.',
  },
  {
    id: '2',
    name: 'The Wobbling Stage',
    street: '456 Comedy Boulevard',
    city: 'Shakytown',
    capacity: 300,
    type: 'Comedy Club',
    description:
      'An intimate comedy club with a quirky twist, where every joke makes the stage wobble with excitement!',
  },
  {
    id: '3',
    name: 'The Chuckle Barn',
    street: '789 Oak Road',
    city: 'Hee-Haw City',
    capacity: 150,
    type: 'Converted Barn',
    description:
      'This rustic barn is now a cozy comedy haven—ideal for laughing till the cows come home!',
  },
  {
    id: '4',
    name: 'The Quirky Quay',
    street: '101 Riverside Drive',
    city: 'Port Funsies',
    capacity: 600,
    type: 'Waterfront Venue',
    description:
      'A scenic waterfront spot that blends quirky vibes and stunning views—perfect for a night full of smiles and sea breezes.',
  },
  {
    id: '5',
    name: 'The Hysterical Hive',
    street: '202 Buzzington Street',
    city: 'Buzzington',
    capacity: 250,
    type: 'Underground Lounge',
    description:
      'A buzzing underground lounge filled with laughter and good vibes, just like a hive full of joy.',
  },
  {
    id: '6',
    name: 'The Belly Laugh Ballroom',
    street: '303 Grand Avenue',
    city: 'Giggleburg',
    capacity: 800,
    type: 'Ballroom',
    description:
      'A grand ballroom where laughter echoes from every corner—guaranteed to make your belly ache from giggling.',
  },
  {
    id: '7',
    name: 'The Snicker Sanctuary',
    street: '404 Maple Court',
    city: 'Chortleton',
    capacity: 400,
    type: 'Theater',
    description:
      'A comfortable theater where all snickers, chuckles, and guffaws are welcome. Come find your happy place.',
  },
  {
    id: '8',
    name: "The Jester's Junction",
    street: '505 Broadway Boulevard',
    city: 'Merrymouth',
    capacity: 350,
    type: 'Community Center',
    description:
      'A vibrant community center with fun-loving vibes and plenty of laughter—where every visitor is treated like royalty!',
  },
  {
    id: '9',
    name: 'The Punning Pavilion',
    street: '606 Hillcrest Way',
    city: 'Wordplay Heights',
    capacity: 450,
    type: 'Open Pavilion',
    description:
      'An open pavilion designed for wordplay wizards and pun enthusiasts—come enjoy a night of laughter that hits all the right notes.',
  },
  {
    id: '10',
    name: 'The Guffaw Gardens',
    street: '707 Bloomfield Road',
    city: 'Laughterfield',
    capacity: 1000,
    type: 'Botanical Garden',
    description:
      'A beautiful garden that blooms with laughter—ideal for large gatherings filled with smiles and fresh air.',
  },
];

export default () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);

  return (
    <Stack space={4}>
      <Select
        label="Select a location"
        aria-controls="locationDetails"
        width="1/2"
        selectedKey={selectedLocation}
        onChange={(key: string) => setSelectedLocation(key)}
      >
        {locations.map(location => (
          <Select.Option key={location.id} id={location.id}>
            {location.name}
          </Select.Option>
        ))}
      </Select>
      <Stack role="region" id="locationDetails" aria-live="polite" space={6}>
        <Headline level={3}>Location Details</Headline>
      </Stack>
    </Stack>
  );
};
