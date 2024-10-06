import { useState } from 'react';
import {
  Aside,
  Button,
  Card,
  Columns,
  Image,
  Inline,
  Select,
  Stack,
  Text,
} from '@marigold/components';
import { NumericFormat } from '@marigold/system';

const locations = [
  {
    id: '1',
    name: 'The Giggle Grounds',
    type: 'Outdoor Amphitheater',
    description:
      'A charming open-air venue perfect for comedy shows under the stars, bringing laughter to every corner of Laughville.',
    street: '123 Main Street',
    city: 'Laughville',
    capacity: 500,
    price: { from: 1000, to: 5000 },
  },
  {
    id: '2',
    name: 'The Wobbling Stage',
    type: 'Comedy Club',
    description:
      'An intimate comedy club with a quirky twist, where every joke makes the stage wobble with excitement!',
    street: '456 Comedy Boulevard',
    city: 'Shakytown',
    capacity: 300,
    price: { from: 750, to: 3500 },
  },
  {
    id: '3',
    name: 'The Chuckle Barn',
    type: 'Converted Barn',
    description:
      'This rustic barn is now a cozy comedy haven—ideal for laughing till the cows come home!',
    street: '789 Oak Road',
    city: 'Hee-Haw City',
    capacity: 150,
    price: { from: 500, to: 2500 },
  },
  {
    id: '4',
    name: 'The Quirky Quay',
    type: 'Waterfront Venue',
    description:
      'A scenic waterfront spot that blends quirky vibes and stunning views—perfect for a night full of smiles and sea breezes.',
    street: '101 Riverside Drive',
    city: 'Port Funsies',
    capacity: 600,
    price: { from: 2000, to: 7000 },
  },
  {
    id: '5',
    name: 'The Hysterical Hive',
    type: 'Underground Lounge',
    description:
      'A buzzing underground lounge filled with laughter and good vibes, just like a hive full of joy.',
    street: '202 Buzzington Street',
    city: 'Buzzington',
    capacity: 250,
    price: { from: 1000, to: 4000 },
  },
  {
    id: '6',
    name: 'The Belly Laugh Ballroom',
    type: 'Ballroom',
    description:
      'A grand ballroom where laughter echoes from every corner—guaranteed to make your belly ache from giggling.',
    street: '303 Grand Avenue',
    city: 'Giggleburg',
    capacity: 800,
    price: { from: 3000, to: 10000 },
  },
  {
    id: '7',
    name: 'The Snicker Sanctuary',
    type: 'Theater',
    description:
      'A comfortable theater where all snickers, chuckles, and guffaws are welcome. Come find your happy place.',
    street: '404 Maple Court',
    city: 'Chortleton',
    capacity: 400,
    price: { from: 1500, to: 5000 },
  },
  {
    id: '8',
    name: "The Jester's Junction",
    type: 'Community Center',
    description:
      'A vibrant community center with fun-loving vibes and plenty of laughter—where every visitor is treated like royalty!',
    street: '505 Broadway Boulevard',
    city: 'Merrymouth',
    capacity: 350,
    price: { from: 1200, to: 4500 },
  },
  {
    id: '9',
    name: 'The Punning Pavilion',
    type: 'Open Pavilion',
    description:
      'An open pavilion designed for wordplay wizards and pun enthusiasts—come enjoy a night of laughter that hits all the right notes.',
    street: '606 Hillcrest Way',
    city: 'Wordplay Heights',
    capacity: 450,
    price: { from: 1800, to: 5500 },
  },
  {
    id: '10',
    name: 'The Guffaw Gardens',
    type: 'Botanical Garden',
    description:
      'A beautiful garden that blooms with laughter—ideal for large gatherings filled with smiles and fresh air.',
    street: '707 Bloomfield Road',
    city: 'Laughterfield',
    capacity: 1000,
    price: { from: 4000, to: 12000 },
  },
];
export default () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
  const current = locations.find(location => location.id === selectedLocation)!;

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
      <div role="region" id="locationDetails" aria-live="polite">
        <Card px={4} py={6}>
          <Aside sideWidth="160px" space={8}>
            <Image
              alt=""
              src={`/venues/${current.name.toLocaleLowerCase().replaceAll(' ', '-').replace("'", '')}.webp`}
            />
            <Stack space={6}>
              <Stack>
                <Text weight="extrabold" fontSize="2xl">
                  {current.name}
                </Text>
                <Text fontStyle="italic">{current.type}</Text>
              </Stack>
              <Stack>
                <Text weight="bold">Description</Text>
                <Text>{current.description}</Text>
              </Stack>
              <Columns columns={[1, 1, 1]} space={4}>
                <Stack>
                  <Text weight="bold">Address</Text>
                  <Text>{current.street}</Text>
                  <Text>{current.city}</Text>
                </Stack>
                <Stack>
                  <Text weight="bold">Capacity</Text>
                  <Text>{current.capacity}</Text>
                </Stack>
                <Stack>
                  <Text weight="bold">Price</Text>
                  <Text>
                    <NumericFormat
                      style="currency"
                      value={current.price.from}
                      currency="EUR"
                      notation="compact"
                    />{' '}
                    to{' '}
                    <NumericFormat
                      style="currency"
                      value={current.price.to}
                      currency="EUR"
                      notation="compact"
                    />
                  </Text>
                </Stack>
              </Columns>
              <Inline alignX="right">
                <Button variant="primary">Book location</Button>
              </Inline>
            </Stack>
          </Aside>
        </Card>
      </div>
    </Stack>
  );
};
