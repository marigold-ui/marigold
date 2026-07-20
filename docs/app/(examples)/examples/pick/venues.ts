export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: string;
  type: string;
}

export const venues: Venue[] = [
  {
    id: 'astra',
    name: 'Astra Kulturhaus',
    city: 'Berlin',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'gruenspan',
    name: 'Grünspan',
    city: 'Hamburg',
    capacity: '1,200',
    type: 'Club',
  },
  {
    id: 'backstage',
    name: 'Backstage',
    city: 'Munich',
    capacity: '900',
    type: 'Club',
  },
  {
    id: 'palladium',
    name: 'Palladium',
    city: 'Cologne',
    capacity: '4,000',
    type: 'Concert Hall',
  },
  {
    id: 'capitol',
    name: 'Capitol',
    city: 'Hanover',
    capacity: '1,350',
    type: 'Concert Hall',
  },
  {
    id: 'zakk',
    name: 'zakk',
    city: 'Dusseldorf',
    capacity: '1,000',
    type: 'Club',
  },
  {
    id: 'batschkapp',
    name: 'Batschkapp',
    city: 'Frankfurt',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'longhorn',
    name: 'LKA Longhorn',
    city: 'Stuttgart',
    capacity: '1,100',
    type: 'Concert Hall',
  },
  {
    id: 'waldbuehne',
    name: 'Waldbühne',
    city: 'Berlin',
    capacity: '22,000',
    type: 'Open Air',
  },
  {
    id: 'loreley',
    name: 'Loreley',
    city: 'St. Goarshausen',
    capacity: '15,000',
    type: 'Open Air',
  },
  {
    id: 'huxleys',
    name: 'Huxleys Neue Welt',
    city: 'Berlin',
    capacity: '1,600',
    type: 'Club',
  },
  {
    id: 'columbiahalle',
    name: 'Columbiahalle',
    city: 'Berlin',
    capacity: '3,500',
    type: 'Concert Hall',
  },
  {
    id: 'docks',
    name: 'Docks',
    city: 'Hamburg',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'ewerk',
    name: 'E-Werk',
    city: 'Cologne',
    capacity: '3,000',
    type: 'Concert Hall',
  },
  {
    id: 'tanzbrunnen',
    name: 'Tanzbrunnen',
    city: 'Cologne',
    capacity: '12,000',
    type: 'Open Air',
  },
  {
    id: 'muffathalle',
    name: 'Muffathalle',
    city: 'Munich',
    capacity: '1,200',
    type: 'Concert Hall',
  },
  {
    id: 'zitadelle',
    name: 'Zitadelle Spandau',
    city: 'Berlin',
    capacity: '8,000',
    type: 'Open Air',
  },
  {
    id: 'turbinenhalle',
    name: 'Turbinenhalle',
    city: 'Oberhausen',
    capacity: '2,500',
    type: 'Concert Hall',
  },
];
