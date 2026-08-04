import { venues } from '@/lib/data/venues';
import { PROTECTED_VENUE_ID } from '@/lib/data/venues-query';
import type { NextRequest } from 'next/server';

// DELETE /api/venues/:id — authorize a deletion.
//
// NOTE: In a real application, deletion is owned by the server — the row is
// removed from a database and gone for every user. This docs demo has no
// database, so the server stays stateless and we track removed ids per visitor
// on the client (see useDeletedVenues). That is okay here because:
//   1. the dataset is a fixed, read-only fixture — there is nothing to persist;
//   2. a stateless server stays correct across serverless cold starts and
//      multiple instances (no shared mutable global to desync);
//   3. each visitor gets an isolated sandbox and the demo resets on reload or
//      via the "Reset demo" control.
// The react-query lifecycle (confirm → optimistic update → round-trip →
// invalidate → toast) is identical to a database-backed app; only the
// persistence boundary differs. This handler therefore only *authorizes* the
// deletion (and rejects one protected venue to exercise the error path); the
// client commits the removal to its own exclude set.

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!venues.some(venue => venue.id === id)) {
    return Response.json({ error: 'Venue not found' }, { status: 404 });
  }

  if (id === PROTECTED_VENUE_ID) {
    return Response.json(
      { error: 'This venue is protected and cannot be deleted.' },
      { status: 409 }
    );
  }

  return Response.json({ ok: true });
};
