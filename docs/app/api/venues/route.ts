import {
  type VenueQueryParams,
  type VenueSortColumn,
  type VenueSortDirection,
  queryVenues,
} from '@/lib/data/venues-query';
import type { NextRequest } from 'next/server';

// GET /api/venues — stateless venue listing.
//
// This handler is a pure function of the request: it reads the query params,
// runs the shared `queryVenues` pipeline over the static fixture and returns
// the page. It holds no state, so it behaves identically across serverless
// cold starts and instances. Deletions are not server-owned — the client sends
// the ids it has removed via `exclude` (see useDeletedVenues).

const number = (value: string | null) => {
  if (value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const numberArray = (values: string[]) =>
  values.map(Number).filter(Number.isFinite);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;

  const params: VenueQueryParams = {
    q: searchParams.get('q') ?? undefined,
    capacity: number(searchParams.get('capacity')),
    price: number(searchParams.get('price')),
    rating: number(searchParams.get('rating')),
    traits: searchParams.getAll('traits'),
    types: numberArray(searchParams.getAll('types')),
    amenities: numberArray(searchParams.getAll('amenities')),
    parking: numberArray(searchParams.getAll('parking')),
    seating: numberArray(searchParams.getAll('seating')),
    column: (searchParams.get('column') as VenueSortColumn) ?? undefined,
    direction:
      (searchParams.get('direction') as VenueSortDirection) ?? undefined,
    page: number(searchParams.get('page')),
    pageSize:
      searchParams.get('pageSize') === 'all'
        ? 'all'
        : number(searchParams.get('pageSize')),
    exclude: searchParams.getAll('exclude'),
  };

  // `?delay=<ms>` artificially slows the response so the loading and
  // background-refetch states are observable in the docs demo.
  const delay = number(searchParams.get('delay'));
  if (delay && delay > 0) {
    await sleep(Math.min(delay, 5000));
  }

  return Response.json(queryVenues(params));
};
