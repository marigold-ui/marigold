import type { EventStatus } from '@/lib/data/events';
import { eventStatuses } from '@/lib/data/events';
import {
  type EventQueryParams,
  parseSession,
  queryEvents,
} from '@/lib/data/events-query';
import type { NextRequest } from 'next/server';

// GET /api/events — stateless event listing.
//
// A pure function of the request, like /api/venues: read the params, run the
// shared `queryEvents` pipeline over the static fixture, return the page. The
// twist for bulk actions: the client owns every change made this session
// (status transitions, bulk edits, deletions) and resends them as a `session`
// payload, which the pipeline applies before searching and filtering. The
// server keeps no state of its own.

const number = (value: string | null) => {
  if (value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const status = (value: string | null): EventStatus | undefined =>
  eventStatuses.find(candidate => candidate === value);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;

  const params: EventQueryParams = {
    q: searchParams.get('q') ?? undefined,
    status: status(searchParams.get('status')),
    page: number(searchParams.get('page')),
    pageSize:
      searchParams.get('pageSize') === 'all'
        ? 'all'
        : number(searchParams.get('pageSize')),
    session: parseSession(searchParams.get('session')),
  };

  // `?delay=<ms>` artificially slows the response so the loading and
  // background-refetch states are observable in the docs demo.
  const delay = number(searchParams.get('delay'));
  if (delay && delay > 0) {
    await sleep(Math.min(delay, 5000));
  }

  return Response.json(queryEvents(params));
};
