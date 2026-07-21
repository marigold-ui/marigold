import { venues } from '@/lib/data/venues';
import { PROTECTED_VENUE_ID } from '@/lib/data/venues-query';
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { DELETE } from './route';

const del = (id: string) =>
  DELETE(
    new NextRequest(`http://localhost/api/venues/${id}`, { method: 'DELETE' }),
    { params: Promise.resolve({ id }) }
  );

describe('DELETE /api/venues/:id', () => {
  it('authorizes deletion of an existing, non-protected venue', async () => {
    const id = venues.find(v => v.id !== PROTECTED_VENUE_ID)!.id;
    const response = await del(id);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it('rejects deleting the protected venue with 409', async () => {
    const response = await del(PROTECTED_VENUE_ID);
    expect(response.status).toBe(409);
  });

  it('returns 404 for an unknown venue', async () => {
    const response = await del('does-not-exist');
    expect(response.status).toBe(404);
  });
});
