export const venueTypes = [
  'Outdoor Venue',
  'Club or Lounge',
  'Rustic or Alternative Venue',
  'Formal Venue',
] as const;

export const venues = [
  {
    id: '1',
    name: 'Giggle Grounds',
    type: 0,
    image: '/venues/the-giggle-grounds.webp',
    description:
      'A charming open-air venue perfect for comedy shows under the stars, bringing laughter to every corner of Laughville.',
    street: '123 Main Street',
    city: 'Laughville',
    capacity: 500,
    price: { from: 1000, to: 5000 },
    rating: 4.7,
    traits: ['outdoor', 'lush', 'cozy'],
  },
  {
    id: '2',
    name: 'Wobbling Stage',
    type: 1,
    image: '/venues/the-wobbling-stage.webp',
    description:
      'An intimate comedy club with a quirky twist, where every joke makes the stage wobble with excitement!',
    street: '456 Comedy Boulevard',
    city: 'Shakytown',
    capacity: 300,
    price: { from: 750, to: 3500 },
    rating: 3.6,
    traits: ['quirky', 'urban'],
  },
  {
    id: '3',
    name: 'Chuckle Barn',
    type: 2,
    image: '/venues/the-chuckle-barn.webp',
    description:
      'This rustic barn is now a cozy comedy haven—ideal for laughing till the cows come home!',
    street: '789 Oak Road',
    city: 'Hee-Haw City',
    capacity: 150,
    price: { from: 500, to: 2500 },
    rating: 2.3,
    traits: ['cozy', 'cheap'],
  },
  {
    id: '4',
    name: 'Quirky Quay',
    type: 0,
    image: '/venues/the-quirky-quay.webp',
    description:
      'A scenic waterfront spot that blends quirky vibes and stunning views—perfect for a night full of smiles and sea breezes.',
    street: '101 Riverside Drive',
    city: 'Port Funsies',
    capacity: 600,
    price: { from: 2000, to: 7000 },
    rating: 4.2,
    traits: ['quirky', 'vibey'],
  },
  {
    id: '5',
    name: 'Hysterical Hive',
    type: 1,
    image: '/venues/the-hysterical-hive.webp',
    description:
      'A buzzing underground lounge filled with laughter and good vibes, just like a hive full of joy.',
    street: '202 Buzzington Street',
    city: 'Laughville',
    capacity: 250,
    price: { from: 1000, to: 4000 },
    rating: 3.1,
    traits: ['hype', 'cheap'],
  },
  {
    id: '6',
    name: 'Belly Laugh Ballroom',
    type: 3,
    image: '/venues/the-belly-laugh-ballroom.webp',
    description:
      'A grand ballroom where laughter echoes from every corner—guaranteed to make your belly ache from giggling.',
    street: '303 Grand Avenue',
    city: 'Shakytown',
    capacity: 800,
    price: { from: 3000, to: 10000 },
    rating: 5.0,
    traits: ['formal'],
  },
  {
    id: '7',
    name: 'Snicker Sanctuary',
    type: 3,
    image: '/venues/the-snicker-sanctuary.webp',
    description:
      'A comfortable theater where all snickers, chuckles, and guffaws are welcome. Come find your happy place.',
    street: '404 Maple Court',
    city: 'Hee-Haw City',
    capacity: 400,
    price: { from: 1500, to: 5000 },
    rating: 4.4,
    traits: ['cozy', 'vibey', 'formal'],
  },
  {
    id: '8',
    name: "The Jester's Junction",
    type: 2,
    image: '/venues/the-jesters-junction.webp',
    description:
      'A vibrant community center with fun-loving vibes and plenty of laughter—where every visitor is treated like royalty!',
    street: '505 Broadway Boulevard',
    city: 'Port Funsies',
    capacity: 350,
    price: { from: 1200, to: 4500 },
    rating: 3.8,
    traits: ['urban'],
  },
  {
    id: '9',
    name: 'Punning Pavilion',
    type: 0,
    image: '/venues/the-punning-pavilion.webp',
    description:
      'An open pavilion designed for wordplay wizards and pun enthusiasts—come enjoy a night of laughter that hits all the right notes.',
    street: '606 Hillcrest Way',
    city: 'Laughville',
    capacity: 450,
    price: { from: 1800, to: 5500 },
    rating: 2.9,
    traits: ['outdoor', 'quirky', 'cheap'],
  },
  {
    id: '10',
    name: 'Guffaw Gardens',
    type: 0,
    image: '/venues/the-guffaw-gardens.webp',
    description:
      'A beautiful garden that blooms with laughter—ideal for large gatherings filled with smiles and fresh air.',
    street: '707 Bloomfield Road',
    city: 'Shakytown',
    capacity: 1000,
    price: { from: 4000, to: 12000 },
    rating: 4.5,
    traits: ['outdoor', 'lush'],
  },
] as const;

export type Venue = (typeof venues)[number];

export const venueTraits = Array.from(
  new Set(venues.flatMap(venue => venue.traits))
).sort();

export type VenueTrait = (typeof venueTraits)[number];
