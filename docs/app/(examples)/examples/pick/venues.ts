// Invented venues: names, places and figures are made up. See /impressum.
//
// The venues are the shared demo venues from `docs/lib/data/venues.ts`, so a
// venue reads the same wherever the docs show it. This report adds what only it
// knows: the events already scheduled at each venue and its availability for
// the report's date window. Values are raw (numbers, not display strings) the
// way an API returns them; the tables format them when they render.
import { venues as sharedVenues, venueTypes } from '@/lib/data/venues';

export { venueTypes };

// Availability for the dates the report covers, in lifecycle order.
export const venueStatuses = ['Available', 'Held', 'Booked'] as const;

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  type: (typeof venueTypes)[number];
  capacity: number;
  /** Average guest rating, 1 to 5. */
  rating: number;
  /** Upcoming events already scheduled at the venue. */
  events: number;
  status: (typeof venueStatuses)[number];
  /** Lowest day rate in EUR. */
  rate: number;
}

// Keyed by venue name, which is unique in the shared data.
const report: Record<
  string,
  { events: number; status: (typeof venueStatuses)[number] }
> = {
  'Main Street Park Amphitheater': { events: 4, status: 'Available' },
  'Shakytown Comedy Club': { events: 12, status: 'Held' },
  'Oak Ridge Barn': { events: 1, status: 'Available' },
  'Harborfront Promenade': { events: 3, status: 'Booked' },
  'Cellar Lounge': { events: 8, status: 'Available' },
  'Grand Avenue Ballroom': { events: 5, status: 'Held' },
  'Maple Court Theatre': { events: 9, status: 'Available' },
  'Broadway Community Center': { events: 2, status: 'Available' },
  'Hillcrest Open Pavilion': { events: 0, status: 'Held' },
  'Bloomfield Garden Lawn': { events: 3, status: 'Booked' },
  'The Punchline Room': { events: 9, status: 'Available' },
  'Laughville Civic Auditorium': { events: 6, status: 'Held' },
  'Riverbend Brewery Hall': { events: 5, status: 'Available' },
  'Laughville Fairgrounds': { events: 2, status: 'Available' },
  'Elm Street Playhouse': { events: 11, status: 'Booked' },
  'Laughville Rec Center': { events: 2, status: 'Available' },
  'Shakytown Music Hall': { events: 8, status: 'Available' },
  'The Velvet Basement': { events: 12, status: 'Held' },
  'Old Mill Event Barn': { events: 3, status: 'Available' },
  'Lakeshore Lawn Stage': { events: 4, status: 'Booked' },
  'Corner Stool Comedy Bar': { events: 14, status: 'Available' },
  'Northern Lights Pavilion': { events: 5, status: 'Available' },
  'Hee-Haw City Arts Centre': { events: 7, status: 'Held' },
  'The Loft on King Street': { events: 6, status: 'Available' },
  'Cedar Hollow Lodge': { events: 0, status: 'Available' },
  'Lakeview Bandshell': { events: 1, status: 'Available' },
  'Port Funsies Corn Exchange': { events: 9, status: 'Booked' },
  'The Anchor Rooms': { events: 10, status: 'Available' },
  'Quayside Warehouse': { events: 4, status: 'Held' },
  'Pier Head Gardens': { events: 2, status: 'Available' },
  'Royal Assembly Rooms': { events: 8, status: 'Booked' },
  'Harbour Lights Club': { events: 8, status: 'Held' },
  'Grinwood Town Hall': { events: 3, status: 'Available' },
  'The Side Door': { events: 13, status: 'Held' },
  'Willow Creek Farm': { events: 2, status: 'Available' },
  'Grinwood Commons': { events: 0, status: 'Available' },
  'The Paramount': { events: 6, status: 'Held' },
  'Jesterfield Opera House': { events: 5, status: 'Booked' },
  'Blue Door Lounge': { events: 7, status: 'Available' },
  'Jesterfield Depot': { events: 3, status: 'Available' },
  'Meadowbrook Amphitheater': { events: 3, status: 'Held' },
  'Merriford Legion Hall': { events: 1, status: 'Available' },
  'The Lamplighter': { events: 9, status: 'Available' },
  'Merriford Centre for the Arts': { events: 6, status: 'Available' },
  'Harbourside Park': { events: 0, status: 'Booked' },
  'Chuckleton Guildhall': { events: 4, status: 'Available' },
  'The Back Room': { events: 11, status: 'Held' },
  'Chuckleton Tithe Barn': { events: 2, status: 'Available' },
  'Bandstand Green': { events: 0, status: 'Available' },
  'The Electric Theatre': { events: 7, status: 'Available' },
};

export const venues: Venue[] = sharedVenues.map(venue => ({
  id: venue.id,
  name: venue.name,
  city: venue.city,
  country: venue.country,
  type: venueTypes[venue.type],
  capacity: venue.capacity,
  rating: venue.rating,
  events: report[venue.name]?.events ?? 0,
  status: report[venue.name]?.status ?? 'Available',
  rate: venue.price.from,
}));

export const statusVariant: Record<
  Venue['status'],
  'success' | 'warning' | 'default'
> = {
  Available: 'success',
  Held: 'warning',
  Booked: 'default',
};

// Column widths for the venue tables, shared so the picker and the committed
// report stay in step. Set at all because a column without a width falls back
// to react-aria's 75px default, which squeezes every column under its content
// until neighbouring cells paint over each other.
export const venueColumnWidths = {
  name: { width: '2fr', minWidth: 200 },
  city: { width: 130 },
  country: { width: 120 },
  type: { width: 200 },
  capacity: { width: 110 },
  rating: { width: 100 },
  upcoming: { width: 110 },
  status: { width: 130 },
  rate: { width: 110 },
} as const;
