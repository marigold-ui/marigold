// These organizers are invented, like the venues they book. See /impressum.

// An organizer is the account people work in. Staff who look after several
// organizers switch between them, for example from the command palette in the
// examples' top navigation.
export interface Organizer {
  id: string;
  name: string;
  /** Customer number, which staff often know by heart. */
  customerNumber: string;
  city: string;
}

export const organizers: Organizer[] = [
  {
    // First, so it is the default: the customer every example belongs to.
    id: 'riverside',
    name: 'Riverside Events GmbH',
    customerNumber: '10001',
    city: 'Laughville',
  },
  {
    id: 'bluebird',
    name: 'Bluebird Concerts',
    customerNumber: '10214',
    city: 'Shakytown',
  },
  {
    id: 'northwind',
    name: 'Northwind Events',
    customerNumber: '10388',
    city: 'Port Funsies',
  },
  {
    id: 'starlight',
    name: 'Starlight Promotions',
    customerNumber: '10452',
    city: 'Hee-Haw City',
  },
  {
    id: 'harbor-sound',
    name: 'Harbor Sound Collective',
    customerNumber: '10519',
    city: 'Port Funsies',
  },
  {
    id: 'maple-leaf',
    name: 'Maple Leaf Theatre Company',
    customerNumber: '10603',
    city: 'Hee-Haw City',
  },
  {
    id: 'riverside-comedy',
    name: 'Riverside Comedy Nights',
    customerNumber: '10677',
    city: 'Shakytown',
  },
  {
    id: 'oak-ember',
    name: 'Oak & Ember Festivals',
    customerNumber: '10745',
    city: 'Laughville',
  },
  {
    id: 'silverline',
    name: 'Silverline Entertainment',
    customerNumber: '10811',
    city: 'Laughville',
  },
  {
    id: 'lantern-stage',
    name: 'Lantern Stage Company',
    customerNumber: '10896',
    city: 'Shakytown',
  },
  {
    id: 'copperfield',
    name: 'Copperfield Arts',
    customerNumber: '10958',
    city: 'Laughville',
  },
  {
    id: 'velvet-room',
    name: 'Velvet Room Productions',
    customerNumber: '11024',
    city: 'Shakytown',
  },
  {
    id: 'summit-live',
    name: 'Summit Live',
    customerNumber: '11093',
    city: 'Laughville',
  },
  {
    id: 'brightside',
    name: 'Brightside Shows',
    customerNumber: '11150',
    city: 'Shakytown',
  },
  {
    id: 'crescent-moon',
    name: 'Crescent Moon Events',
    customerNumber: '11236',
    city: 'Port Funsies',
  },
  {
    id: 'pinewood-folk',
    name: 'Pinewood Folk Society',
    customerNumber: '11302',
    city: 'Hee-Haw City',
  },
  {
    id: 'echo-valley',
    name: 'Echo Valley Music',
    customerNumber: '11378',
    city: 'Laughville',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour Tours',
    customerNumber: '11445',
    city: 'Shakytown',
  },
  {
    id: 'driftwood-cinema',
    name: 'Driftwood Cinema Club',
    customerNumber: '11517',
    city: 'Laughville',
  },
  {
    id: 'kettle-drum',
    name: 'Kettle Drum Agency',
    customerNumber: '11590',
    city: 'Shakytown',
  },
];

export const organizerById = (id: string) =>
  organizers.find(organizer => organizer.id === id);
