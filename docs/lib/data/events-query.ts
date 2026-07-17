import { z } from 'zod';
import { type Event, type EventStatus, eventStatuses, events } from './events';

// Shared, server-importable query logic for the events dataset.
//
// Like venues-query.ts, this module is the single source of truth for how
// events are searched, filtered and paginated. It is imported by the stateless
// route handlers (app/api/events) AND used as the contract the client mirrors
// in its query keys. Pure (no React, no I/O), so the same code runs on the
// server and is unit-tested directly.
//
// One thing goes beyond the venues example: bulk actions *change* records
// (status, venue, price), not just remove them. The server has no database, so
// the client owns every change made this session and resends it as a `session`
// payload (see useSession). The overlay is applied before the query pipeline,
// which is what keeps filters honest — publish three drafts and the "On sale"
// filter finds them.

/** Fields a bulk edit may change. */
export const eventChangesSchema = z.object({
  venue: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
});

/** Per-event session overrides: bulk-edit changes plus status transitions. */
const eventOverrideSchema = eventChangesSchema.extend({
  status: z.enum(eventStatuses).optional(),
});

/**
 * Everything the client changed this session. Sent with every request so the
 * stateless server sees the same world the visitor does.
 */
export const eventsSessionSchema = z.object({
  overrides: z.record(z.string(), eventOverrideSchema),
  deleted: z.array(z.string()),
});

export type EventChanges = z.infer<typeof eventChangesSchema>;
export type EventOverride = z.infer<typeof eventOverrideSchema>;
export type EventsSession = z.infer<typeof eventsSessionSchema>;

// Session payloads are small (a demo visitor touches at most the 42 fixture
// rows); the size cap just keeps the parser from chewing on garbage. Anything
// invalid degrades to "no session" instead of failing the request.
const MAX_SESSION_LENGTH = 8192;

/**
 * Parse the URL-encoded session payload the client resends with every request,
 * tolerating anything malformed. Lives here beside the schema (rather than in
 * the route file, which should export only handlers) so it is unit-testable.
 */
export const parseSession = (
  value: string | null
): EventsSession | undefined => {
  if (!value || value.length > MAX_SESSION_LENGTH) return undefined;
  try {
    const parsed = eventsSessionSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : undefined;
  } catch {
    return undefined;
  }
};

export interface EventQueryParams {
  /** Free-text search, matched against the event name and venue. */
  q?: string;
  status?: EventStatus;
  /** 1-based page. */
  page?: number;
  /** Page size, or `'all'` to skip pagination. */
  pageSize?: number | 'all';
  session?: EventsSession;
}

export interface EventQueryResult {
  items: Event[];
  totalItems: number;
  totalPages: number;
  safePage: number;
  pageSize: number;
}

/** Page sizes offered by the quantity selector; the first is the default. */
export const PAGE_SIZES = [10, 20, 30] as const;
export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

/** The fixture with this visitor's session changes and deletions applied. */
export const applySession = (session?: EventsSession): Event[] => {
  if (!session) {
    return events;
  }

  const deleted = new Set(session.deleted);
  return events
    .filter(event => !deleted.has(event.id))
    .map(event => {
      const override = session.overrides[event.id];
      return override ? { ...event, ...override } : event;
    });
};

/**
 * Pure overlay → search → filter → paginate pipeline over the static events
 * fixture. Deterministic and side-effect free. Events keep their fixture
 * order (by date), so there is no sort step.
 */
export const queryEvents = (
  params: EventQueryParams = {}
): EventQueryResult => {
  const {
    q = '',
    status,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    session,
  } = params;

  const search = q.trim().toLowerCase();

  const filtered = applySession(session).filter(event => {
    if (status && event.status !== status) return false;
    if (
      search &&
      !event.name.toLowerCase().includes(search) &&
      !event.venue?.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });

  const totalItems = filtered.length;

  if (pageSize === 'all') {
    return {
      items: filtered,
      totalItems,
      totalPages: 1,
      safePage: 1,
      pageSize: totalItems,
    };
  }

  const size = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = filtered.slice((safePage - 1) * size, safePage * size);

  return { items, totalItems, totalPages, safePage, pageSize: size };
};

export const bulkActions = [
  'publish',
  'archive',
  'update',
  'delete',
  'remind',
] as const;
export type BulkAction = (typeof bulkActions)[number];

export interface BulkFailure {
  id: string;
  reason: string;
}

export interface BulkResult {
  succeeded: string[];
  failed: BulkFailure[];
}

/**
 * Authorizes a bulk action per record and reports the split, giving the demo
 * its deterministic partial-failure path: publishing an event without a venue
 * fails, everything else succeeds. The check runs against the session overlay,
 * so assigning a venue via bulk edit makes the retry pass — the full loop the
 * pattern describes.
 */
export const authorizeBulk = (
  action: BulkAction,
  ids: string[],
  session?: EventsSession
): BulkResult => {
  const current = new Map(
    applySession(session).map(event => [event.id, event])
  );
  const succeeded: string[] = [];
  const failed: BulkFailure[] = [];

  for (const id of ids) {
    const event = current.get(id);
    if (!event) {
      failed.push({ id, reason: 'Event not found' });
      continue;
    }
    if (action === 'publish' && !event.venue) {
      failed.push({ id, reason: 'No venue assigned' });
      continue;
    }
    succeeded.push(id);
  }

  return { succeeded, failed };
};
