import type {
  BulkAction,
  BulkResult,
  EventChanges,
  EventQueryParams,
  EventQueryResult,
  EventsSession,
} from '@/lib/data/events-query';

// Builds the query string for the events endpoint. The session payload rides
// along as JSON — it is how the stateless server learns what this visitor has
// already changed (see useSession).
const toSearchParams = (params: EventQueryParams) => {
  const search = new URLSearchParams();

  if (params.q) search.set('q', params.q);
  if (params.status) search.set('status', params.status);
  if (params.page !== undefined) search.set('page', String(params.page));
  if (params.pageSize !== undefined) {
    search.set('pageSize', String(params.pageSize));
  }
  if (params.session) search.set('session', JSON.stringify(params.session));

  return search;
};

export const fetchEvents = async (
  params: EventQueryParams
): Promise<EventQueryResult> => {
  const response = await fetch(`/api/events?${toSearchParams(params)}`);
  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status})`);
  }
  return response.json();
};

export interface BulkRequest {
  action: BulkAction;
  ids: string[];
  changes?: EventChanges;
  session?: EventsSession;
}

// `delay` slows the response server-side so per-record progress is
// observable when a longer operation works through the selection.
export const bulkEvents = async (
  body: BulkRequest,
  options: { delay?: number } = {}
): Promise<BulkResult> => {
  const query = options.delay ? `?delay=${options.delay}` : '';
  const response = await fetch(`/api/events/bulk${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Bulk ${body.action} failed (${response.status})`);
  }
  return response.json();
};
