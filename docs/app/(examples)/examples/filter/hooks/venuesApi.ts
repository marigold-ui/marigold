import type {
  VenueQueryParams,
  VenueQueryResult,
} from '@/lib/data/venues-query';

// Builds the query string for the venues endpoint. Kept separate from the
// hooks so both the list query and the CSV "select all" export can share it.
const toSearchParams = (params: VenueQueryParams) => {
  const search = new URLSearchParams();

  const set = (key: string, value: string | number | undefined) => {
    if (value === undefined || value === '') return;
    search.set(key, String(value));
  };

  set('q', params.q);
  set('capacity', params.capacity);
  set('price', params.price);
  set('rating', params.rating);
  set('column', params.column);
  set('direction', params.direction);
  set('page', params.page);
  set('pageSize', params.pageSize);

  // Repeatable params — one entry each, read server-side with `getAll`.
  params.traits?.forEach(trait => search.append('traits', trait));
  params.types?.forEach(type => search.append('types', String(type)));
  params.amenities?.forEach(a => search.append('amenities', String(a)));
  params.parking?.forEach(p => search.append('parking', String(p)));
  params.seating?.forEach(s => search.append('seating', String(s)));
  params.exclude?.forEach(id => search.append('exclude', id));

  return search;
};

export const fetchVenues = async (
  params: VenueQueryParams
): Promise<VenueQueryResult> => {
  const response = await fetch(`/api/venues?${toSearchParams(params)}`);
  if (!response.ok) {
    throw new Error(`Failed to load venues (${response.status})`);
  }
  return response.json();
};

export interface DeleteVenueError extends Error {
  status: number;
}

export const deleteVenue = async (id: string): Promise<void> => {
  const response = await fetch(`/api/venues/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(
      body.error ?? `Failed to delete venue (${response.status})`
    ) as DeleteVenueError;
    error.status = response.status;
    throw error;
  }
};
