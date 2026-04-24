import type { Venue } from './types';

export const API_BASE = 'https://69e9d8de15c7e2d51268dcf0.mockapi.io/api';

export const VENUES_QUERY_KEY = ['venues'] as const;

export interface FetchVenuesParams {
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchVenues = async (
  params: FetchVenuesParams = {}
): Promise<Venue[]> => {
  const qp = new URLSearchParams();
  if (params.search) qp.set('search', params.search);
  // MockAPI cannot sort nested fields (e.g. price.to), so price sort stays client-side
  if (params.sortBy && params.sortBy !== 'price') {
    qp.set('sortBy', params.sortBy);
    if (params.order) qp.set('order', params.order);
  }
  const qs = qp.toString();
  const res = await fetch(`${API_BASE}/venues${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error(`Failed to fetch venues: ${res.status}`);
  const data = await res.json();
  // mockapi returns the string "Not found" when there are no results
  if (!Array.isArray(data)) return [];
  return data as Venue[];
};

export const deleteVenue = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/venues/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete venue ${id}: ${res.status}`);
};
